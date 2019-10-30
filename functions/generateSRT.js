const fs = require('fs');
const path = require('path');
const storageUtils = require('../utils/storage-utils');
const srtUtils = require('../utils/srt-utils');
module.exports = (speechData) => {
    console.log(`event ${JSON.stringify(event)}`);
    let speechFileNameWithoutExtension;
    const readFile = fs.readFileSync(speechData, 'utf8');
    console.log('ReadFile: ' + JSON.stringify(readFile))
    const srtData = srtUtils.convertGSTTToSRT(readFile);
    const transcriptionFilePath = `/tmp/${speechFileNameWithoutExtension}.json`;
    console.log('result: ', srtData);
    return srtData;
};
