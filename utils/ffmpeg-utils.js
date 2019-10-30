const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

function extractAudio(name, fileInput) {
    let tempAudioPath = '/tmp/' + name + '.flac';
    return new Promise((resolve, reject) => {
        ffmpeg(fileInput)
            .videoBitrate(19200)
            .inputOptions('-vn')
            .format('flac')
            .audioChannels(1)
            .output(tempAudioPath)
            .on('end', function () {
                console.log('extracted audio');
                resolve(tempAudioPath);
            })
            .on('error', function (err, stdout, stderr) {
                reject(null);
            })
            .run();
    });
}

module.exports = {
    extractAudio: extractAudio
};