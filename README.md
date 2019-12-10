# Media SRT Generator

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

How to use: https://gist.github.com/LuisMayo/8e7b95dee866841b218e046ddebb4028

This project when run will generate a srt file from the provided videos/audios using Google Cloud Run. 
Accepts request on this format:
```typescript
{
  fileName: string,
  url: string,
  language_code: string,
  onlyDownload: boolean, // When set, specifies the function not to attemp transcribing the audio and just download it to the bucket
  speechContexts: [
      {
          "phrases": string[]
      }
  ]
}
```

A client example can be seen at https://github.com/LuisMayo/media-srt-generator-front/
onlyDownload is designed so userr may trigger FLAC generation without generating speech, this may be useful for long audios that can't be processed in under 15 minutes, then time limit for a GC function.
After generating the FLAC the flac shall be processed using other tools or directly on Google cloud Shell

  ## Source
Big part of the code was from [a previous project by Abhi347](https://github.com/Abhi347/vid-to-speech-api-json/tree/1a66bb592acc9347ebc38471bfaff6eaf1d27aed) and it has been Licensed under MIT License, see originalLicense for more info.
