const ffmpeg = require('../utils/ffmpeg-utils');
const storageUtils = require('../utils/storage-utils');
const transcribeAudio = require('./transcribeAudio');
const generateSRT = require('./generateSRT');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
module.exports = (req, res) => {
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    console.log(req.body) 
    req.body = JSON.parse(req.body)
    const url = req.body.url;
    let fileName = req.body.fileName;
    const speechContexts = req.body.speechContexts;
    const onlyDownload = req.body.onlyDownload;
    const language = req.body.language || 'en-US';
    const child_process = require('child_process');

    var wget = 'wget' + ' -O /tmp/' + fileName + ' ' + url;
    // excute wget using child_process' exec function

    child_process.execSync(wget);


    // Uploads a local file to the bucket
    ffmpeg.extractAudio(fileName, '/tmp/' + fileName).then(flacPath => {
        storageUtils.uploadToBucket(flacPath).then(
            () => {
                if(onlyDownload) {
                    res.status(200).send(fileName + '.flac');
                } else {
                    transcribeAudio.fun(fileName + '.flac', language, speechContexts).then(
                        speechPath => {
                            const srtData = generateSRT.fun(speechPath);
                            res.status(200).send(srtData);
                        },
                        err => {
                            res.status(500).send('Error transcibing Audio: ' + err);
                        }
                    )
                }
            },
            err => {
                res.status(500).send('Error uploading flac: ' + err);
            }
        )
    },
        err => {
            res.status(500).send('Error extracting Audio: ' + err);
        }
    ).catch(err => {
        res.status(500).send('Error extracting Audio: ' + err);
    })
}
