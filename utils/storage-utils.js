const path = require('path');
const storageClient = require('@google-cloud/storage')();

let flacBucket = storageClient.bucket(process.env.BUCKET);


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
        .then((response) => {
            console.log(`${filepath} uploaded to bucket.`);
            return Promise.resolve(response[0]);
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
