const fs = require('fs');
const path = require('path');
const storageUtils = require('../utils/storage-utils');
const speechUtils = require('../utils/speech-utils');
function fun (event, languageCode, speechContexts)  {
    let audioFileNameWithoutExtension;
    return Promise.resolve()
        .then(() => {
            const audioFile = storageUtils.flacBucket.file(event);
            const audioFilePath = storageUtils.getFilePathFromFile(audioFile);
            console.log(`audioFilePath: ${JSON.stringify(audioFilePath)}`);
            audioFileNameWithoutExtension = path.parse(audioFilePath).name;
            const request = {
                "config": {
                    "enableWordTimeOffsets": true,
                    "languageCode": languageCode,
                    "encoding": "FLAC",
                    "audioChannelCount": 1,
                    "speechContexts": speechContexts
                },
                "audio": {
                    "uri": audioFilePath
                }
            };
            return speechUtils.makeSpeechRequest(request);
        }).then((transcription) => {
            const transcriptionData = JSON.stringify(transcription);
            const transcriptionFilePath = `/tmp/${audioFileNameWithoutExtension}.json`;
            console.log('result: ', transcriptionData);
            //write transcriptions to local file
            return new Promise((resolve, reject) => {
                fs.writeFile(transcriptionFilePath, transcriptionData, function (err) {
                    if (err) {
                        console.log(`Error in writing json`);
                        reject(null);
                    } else {
                        console.log(`Write successful to ${transcriptionFilePath}`);
                        resolve(transcriptionFilePath);
                    }
                });
            });
        }).catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = {
    fun: fun,
};