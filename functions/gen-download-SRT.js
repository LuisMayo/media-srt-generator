const ffmpeg = require('../utils/ffmpeg-utils');
const storageUtils = require('../utils/storage-utils');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.genAndDownloadSRT = (req, res) => {
    const url = req.body.url;
    const fileName = req.body.fileName;
    const speechContexts = req.body.speechContexts;
    const language = req.body.language;
    const child_process = require('child_process');

    var wget = 'wget' + ' -O /tmp/' + fileName + ' ' + url;
    // excute wget using child_process' exec function

    child_process.execSync(wget);


    // Uploads a local file to the bucket
    const flacPath = await ffmpeg.extractAudio(fileName, '/tmp/' + fileName)
    if(!flacPath) {
        res.status(500).send('Error extracting Audio');
    }
    await storageUtils.uploadToBucket(flacPath);
    const speechPath = await transcribeAudio(flacPath);
    if(!speechPath) {
        res.status(500).send('Error transcibing Audio');
    }
    const srtData = generateSRT(speechPath, language, speechContexts);
    res.status(200).send(srtData);
}
