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

messaging().setBackgroundMessageHandler(async remoteMessage => {});

AppRegistry.registerComponent(appName, () => App);
