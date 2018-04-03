const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
import asyncBusboy from 'async-busboy';
const Storage = require('@google-cloud/storage');

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

async function uploadFileToGoogle(saveTo, fileName) {
    const storage = new Storage();
    return new Promise((resolve, reject) => {
        storage
            .bucket('twitter-avatar')
            .upload(saveTo)
            .then(results => {
                const url = `http://storage.googleapis.com/twitter-avatar/${fileName}`;
                console.log(`${fileName} uploaded to twitter-avatar.`);
                console.log(url);
                resolve(url);
            })
            .catch(err => {
                console.error('Google storage error:', err);
                reject(err);
            })
    });
}


/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
async function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers});

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)
  let mkdirResult = mkdirsSync( filePath )
  console.log('file is uploading...');

  return new Promise((resolve, reject) => {
      asyncBusboy(ctx.req).then(function(formData) {
          let result = {
              avatar: '',
              info: {},
          };
          let file = formData.files[0];
          let field = formData.fields;
          result.info = JSON.parse(field.field);
          let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(file.filename);
          let _uploadFilePath = path.join( filePath, fileName );
          let saveTo = path.join(_uploadFilePath);

          file.pipe(fs.createWriteStream(saveTo));
          // 文件写入事件结束
          file.on('end', function() {
            uploadFileToGoogle(saveTo, fileName)
            .then(res => {
                result.avatar = res;
                console.log('file upload successfully!');
                resolve(result);
            })
            .catch(err => {
                console.error('Google storage error:', err);
            });
        });
      }, function(error) {
          reject(error);
          console.log(error);
      });
  });
}

module.exports =  {
  uploadFile,
}
