#!/bin/bash
#JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew  assembleRelease
cd ./src
npm install --legacy-peer-deps
cd ./android
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew -x lint assembleDev
../../arc.sh
cd ../../arc
darkhttpd ./ --port 4321
