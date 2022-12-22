#!/bin/bash
cd ./dev
cd ./android
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew -x lint build
