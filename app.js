//gcloud beta functions deploy extractAudio --trigger-resource cf-test-videos --trigger-event google.storage.object.finalize
//gcloud beta functions deploy transcribeAudio --trigger-resource cf-test-flac-audio --trigger-event google.storage.object.finalize
const transcribeAudio = require('./functions/transcribeAudio');
const generateSRT = require('./functions/generateSRT');

exports.transcribeAudio = transcribeAudio;
exports.generateSRT = generateSRT;
