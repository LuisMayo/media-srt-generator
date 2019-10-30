const path = require('path');
const storageClient = require('@google-cloud/storage')();
const appConfig = require('../app-config');

const flacBucket = storageClient.bucket(appConfig.buckets.audio);


function uploadToBucket(filepath) {
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
};
