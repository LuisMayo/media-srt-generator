# Media SRT Generator

This project when run will generate a srt file from the provided videos/audios. 
Accepts request on this format:
```typescript
{
  fileName: name,
  url: urlMedia,
  language_code: language,
  speechContexts: [
      {
          "phrases": string[]
      }
  ]
}
```

A client example can be seen at https://github.com/LuisMayo/media-srt-generator-front/

  ## Source
Big part of the code was from [a previous project by Abhi347](https://github.com/Abhi347/vid-to-speech-api-json/tree/1a66bb592acc9347ebc38471bfaff6eaf1d27aed) and it has been Licensed under MIT License, see originalLicense for more info.
