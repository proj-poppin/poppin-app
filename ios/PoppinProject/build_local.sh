#!/bin/bash

# 프로젝트 디렉토리로 이동
cd /Users/idohyeong/Desktop/PoppinProject/ios

# NODE_BINARY 환경 변수 설정
export NODE_BINARY=$(which node)
echo "Node binary set to: $NODE_BINARY"

# 번들 버전 설정
PLIST_PATH="./PoppinProject/Info.plist"
NEW_BUNDLE_VERSION=$(date +%Y%m%d%H%M)
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion $NEW_BUNDLE_VERSION" "$PLIST_PATH"

# 아카이브 생성
xcodebuild -workspace PoppinProject.xcworkspace -scheme PoppinProject -sdk iphoneos -configuration Release archive -archivePath $PWD/build/PoppinProject.xcarchive

# 아카이브 내보내기
xcodebuild -exportArchive -archivePath $PWD/build/PoppinProject.xcarchive -exportOptionsPlist $PWD/PoppinProject/ExportOptions.plist -exportPath $PWD/build/PoppinProject

# IPA 파일 경로 출력
IPA_FILE=$(find $PWD/build/PoppinProject -name "*.ipa")
echo "IPA file created at: $IPA_FILE"
