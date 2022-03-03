## Mendix React Native Twilio Video WebRtc
Mendix implementation of [blackuy/react-native-twilio-video-webrtc](https://github.com/blackuy/react-native-twilio-video-webrtc)

## Features
TODO

## Usage
For the widget, download one of the [releases](https://github.com/Entidad/mendix-react-native-twilio-video-webrtc/releases) or build from source as follows

```
cd ./mendix-react-native-video-webrtc@2.1.0
npm install react-native-normalize
npm install react-native-version-number
npm install react-native-responsive-screen
npm install react-native-permissions
npm install https://github.com/blackuy/react-native-twilio-video-webrtc
npm run build
```

Deploy `entidad.ReactNativeVideo.mpk` to `$PROJ/widgets`, execute `Synchronize App Directory` in Mendix IDE (`alt-f4` or invoke `Menu/App/Synchronize App Directory`. Place the widget in some context passing component like a `DataView` and configure the widget attributes.

Additionally, you will have to build an React Native target (e.g. Android APK). For this you will have to scaffold a source tree using the Mendix Modeler (Studio Pro) by selecting `App / Build Native Mobile App` from the main menu, and configure it for local building. With the source deployed on disk, you can then build the native target

## Building Android Custom Application

In the Mendix IDE, invoke `App/Build Native Mobile App`, configure the settings (nothing special required), and deploy for local building.

In the source tree root, execute the following

```
nvm use --lts
npm install
```

For building from command line, disable linting by ammending `./android/build.gradle` as follows

```
subprojects{
	afterEvaluate{
		if (getPlugins().hasPlugin('android')||
			getPlugins().hasPlugin('android-library')){
			configure(android.lintOptions){
				abortOnError false
			}
		}
	}
	tasks.withType(Javadoc).all{enabled=false}
}
```

Then in `./android` run the following

```
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew build
```

You should end up with the following

* `app-dev-debug.apk`
* `app-dev-release-unsigned.apk`

You can transfer `app-dev-debug.apk` to your Android device, install, and test.

## Building IOS Custom Application

In the Mendix IDE, invoke `App/Build Native Mobile App`, configure the settings (nothing special required), and deploy for local building.

In the source tree, run the following:

```
nvm use --lts
npm install
```

Edit the `./ios/Podfile` and change the platform as follows:

```
platform :ios, '12.0'
```

Also in `./ios/Podfile`, ensure the following pod is present

```
def common_pods
	...
	pod 'react-native-twilio-video-webrtc', path: '../node_modules/react-native-twilio-video-webrtc'
	...
end
```

Edit `./ios/nativeTemplate/Info.plist` ensuring the following key value pairs are present:

```
<key>NSCameraUsageDescription</key>
<string>The camera can be used to open apps by scanning a QR code.</string>
<key>NSMicrophoneUsageDescription</key>
<string>The microphone permission is needed to to receive voice commands.</string>
```

In `./ios`, run the following

```
pod install
```

Open `./ios/nativeTemplate.xcodeproj` in XCode, you can then build the project.

## Demo project
A test project is provided under `./test`. This project contains Mendix React Native as well as Web artifacts for testing Twilio Video both Native and Web.

## Issues, suggestions and feature requests
[GitHub](https://github.com/Entidad/mendix-react-native-twilio-video-webrtc/issues)


## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

Contributions in terms of features, bug listings, and improvements would be appreciated
