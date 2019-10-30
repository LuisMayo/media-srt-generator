const path = require('path');
const storageClient = require('@google-cloud/storage')();
const appConfig = require('../app-config');

let flacBucket = storageClient.bucket(appConfig.buckets.audio);


function getFilePathFromFile(storageFile) {
    return `gs://${storageFile.bucket.name}/${storageFile.name}`;
}

function getFile(event) {
    return flacBucket.file(event);
}

function uploadToBucket(filepath) {
    console.log ('FLACBucket: '+ JSON.stringify(flacBucket));
    return flacBucket
        .upload(filepath, {resumable: false})
        .then(() => {
            console.log(`${filepath} uploaded to bucket.`);
            return Promise.resolve('resolve');
        })
        .catch(err => {
            console.error('ERROR:', err);
            return Promise.reject(err);
        });
}



module.exports = {
    uploadToBucket: uploadToBucket,
    getFilePathFromFile: getFilePathFromFile,
    getFile: getFile
};
