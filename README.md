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
onlyDownload is designed so user may trigger FLAC generation without generating speech, this may be useful for long audios that can't be processed in under 15 minutes, then time limit for a GC function.
After generating the FLAC the flac shall be processed using other tools or directly on Google cloud Shell

  ## Source
Big part of the code was from [a previous project by Abhi347](https://github.com/Abhi347/vid-to-speech-api-json/tree/1a66bb592acc9347ebc38471bfaff6eaf1d27aed) and it has been Licensed under MIT License, see originalLicense for more info.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment/use for notes on how to deploy/use the project.


## Contributing
Since this is a tiny project we don't have strict rules about contributions. Just open a Pull Request to fix any of the project issues or any improvement you have percieved on your own. Any contributions which improve or fix the project will be accepted as long as they don't deviate too much from the project objectives. If you have doubts about whether the PR would be accepted or not you can open an issue before coding to ask for my opinion.
