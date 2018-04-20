'use strict';

const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Storage = require('@google-cloud/storage');

/**
 * make directory sync
 * @param  {string} dirname directory absolute path
 * @return {boolean}        result of func
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
 * get uploaded file's suffix name
 * @param  {string} fileName uploaded file
 * @return {string}          file's suffix
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
 * uploaded file
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
            console.log('file writes into local storage');

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
