/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/App';
import messaging from '@react-native-firebase/messaging';
import {initializeKakaoSDK} from '@react-native-kakao/core';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// #SETTING #@react-native-kakao
initializeKakaoSDK(`${Config.KAKAO_API_KEY}`);

const consumerKey = Config.NAVER_CONSUMER_KEY;
const consumerSecret = Config.NAVER_SECRECT_KEY;
const serviceUrlShemeIOS = Config.NAVER_URL;

NaverLogin.initialize({
  appName,
  consumerKey,
  consumerSecret,
  serviceUrlSchemeIOS: serviceUrlShemeIOS,
  disableNaverAppAuthIOS: true,
});

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
  forceConsentPrompt: true,
});

// messaging().setBackgroundMessageHandler(async remoteMessage => {});
// 앱이 background/quit(종료) 상태인 경우 메시지를 받기 위함.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
