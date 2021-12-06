#!/bin/bash
cd ./bld/android
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew build
