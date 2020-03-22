const fs = require('fs');
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
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT');

    if (req.method === 'GET') { // If get Go to frontend
        res.location(process.env.FRONT + '#back=' + req.protocol + '://' + req.hostname);
        res.status(307).end();
    }

    console.log(req.body) 
    req.body = JSON.parse(req.body)
    const url = req.body.url;
    const encodedFile = req.body.encodedFile;
    let fileName = req.body.fileName;
    const speechContexts = req.body.speechContexts;
    const onlyDownload = req.body.onlyDownload;
    const language = req.body.language || 'en-US';
    const child_process = require('child_process');

    if (url) {
        var wget = 'wget' + ' -O /tmp/' + fileName + ' ' + url;
        // excute wget using child_process' exec function
        child_process.execSync(wget);
    } else if (encodedFile) {
        const encodedFilePayload = encodedFile.split(';base64,').pop();
        fs.writeFileSync('/tmp/' + fileName, encodedFilePayload, {encoding: 'base64'});
    } else {
        res.status(422).send('You need to specify at least one media source');
    }

    // Uploads a local file to the bucket
    ffmpeg.extractAudio(fileName, '/tmp/' + fileName).then(flacPath => {
        storageUtils.uploadToBucket(flacPath).then(
            (file) => {
                if(onlyDownload) {
                    const audioFile = storageUtils.getFile(fileName + '.flac')
                    const audioFilePath = storageUtils.getFilePathFromFile(audioFile);
                    res.status(200).send(audioFilePath);
                } else {
                    transcribeAudio.fun(fileName + '.flac', language, speechContexts).then(
                        speechPath => {
                            const srtData = generateSRT.fun(speechPath);
                            file.delete().then(
                                data =>  {
                                    res.status(200).send(srtData);
                                },
                                err => {
                                    res.status(200).send(srtData);
                                }
                            )
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
