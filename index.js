/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {});

AppRegistry.registerComponent(appName, () => App);
