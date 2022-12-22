#!/bin/bash
#JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=~/Android/Sdk/ ./gradlew  assembleRelease
cd ./dev
cd ./android
#ANDROID_SDK_ROOT=/home/skullquake/Android/cmdline-tools/tools/bin/sdkmanager
#ANDROID_SDK_ROOT=~/Android/Sdk/ 
#JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=/home/skullquake/Android/ gradle -x lint assembleDev
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=/home/skullquake/Android/ ./gradlew clean
JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64 ANDROID_SDK_ROOT=/home/skullquake/Android/ ./gradlew -x lint assembleDev
../../arc.sh
