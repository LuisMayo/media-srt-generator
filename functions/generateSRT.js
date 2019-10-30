const fs = require('fs');
const srtUtils = require('../utils/srt-utils');
function fun (speechData) {
    let speechFileNameWithoutExtension;
    const readFile = fs.readFileSync(speechData, 'utf8');
    console.log('ReadFile: ' + JSON.stringify(readFile))
    const srtData = srtUtils.convertGSTTToSRT(readFile);
    const transcriptionFilePath = `/tmp/${speechFileNameWithoutExtension}.json`;
    console.log('result: ', srtData);
    return srtData;
};

module.exports = {
    fun: fun,
};