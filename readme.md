## Run app on your local machine
`monaca preview`

## Generate build before cordova build
`monaca transpile`

## Build for mobile platforms
`cordova build android` & `cordova build ios`

## Things to do before cordova build

While developing, `monaca preview` will cache your files in memory but it will not generate files in the disk. Therefore, whenever you want to build locally using Cordova, you need to generate the files by running `monaca transpile`.

If you used Vue CLI to create the project instead of Monaca CLI, then you’ll need to run npm run dev instead of `monaca preview` and `npm run build` instead of `monaca transpile`.