## Mendix React Native Twilio Video WebRtc
Mendix implementation of [blackuy/react-native-twilio-video-webrtc](https://github.com/blackuy/react-native-twilio-video-webrtc)

## Features
TODO

## Usage
Download one of the [releases](https://github.com/Entidad/mendix-react-native-twilio-video-webrtc/releases) or build from source as follows

```
cd ./mendix-react-native-video-webrtc
npm install react-native-normalize
npm install react-native-version-number
npm install https://github.com/blackuy/react-native-twilio-video-webrtc
npm run build
```

Deploy `entidad.RNTVW.mpk` to `$PROJ/widgets`, execute `Synchronize App Directory` in Mendix IDE (`alt-f4` or invoke `Menu/App/Synchronize App Directory`. Place the widget in some context passing component like a `DataView` and configure the widget attributes.

## Demo project
None at this time

## Issues, suggestions and feature requests
[GitHub](https://github.com/Entidad/mendix-react-native-twilio-video-webrtc/issues)


## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

Contributions in terms of features, bug listings, and improvements would be appreciated
