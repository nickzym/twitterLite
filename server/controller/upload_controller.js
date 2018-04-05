const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
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

async function uploadFileToGoogle(saveTo, fileName, bucketName) {
    const storage = new Storage();
    return new Promise((resolve, reject) => {
        storage
            .bucket(`twitter-${bucketName}`)
            .upload(saveTo)
            .then(results => {
                const url = `http://storage.googleapis.com/twitter-${bucketName}/${fileName}`;
                console.log(`${fileName} uploaded to twitter-${bucketName}.`);
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
    let req = ctx.request;

    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join( options.path,  fileType)
    let mkdirResult = mkdirsSync( filePath )
    return new Promise((resolve, reject) => {
        let result = {
            avatar: '',
            info: {},
        };
        let file = req.body.files.file;
        let field = JSON.parse(req.body.fields.field);
        if (file) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(file.name);
            let _uploadFilePath = path.join( filePath, fileName );
            let saveTo = path.join(_uploadFilePath);
            console.log('file is uploading...');
            const reader = fs.createReadStream(file.path);
            const stream = fs.createWriteStream(saveTo);
            reader.pipe(stream);
            // 文件写入事件结束

            uploadFileToGoogle(saveTo, fileName, fileType)
            .then(res => {
                console.log('file upload successfully!');
                resolve(res);
            })
            .catch(err => {
                console.error('Google storage error:', err);
            });
        }
    });
}

module.exports =  {
  uploadFile,
}
