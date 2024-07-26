import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import Linking from 'react-native/Libraries/Linking/Linking';

export const setupFirebase = () => {
  // 포어그라운드 상태에서 메시지를 받았을 때 처리
  messaging().onMessage(async remoteMessage => {
    if (remoteMessage.notification) {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    }
    if (remoteMessage.data?.link) {
      Linking.openURL(remoteMessage.data.link);
    }
  });

  // 백그라운드에서 앱이 열렸을 때 메시지를 받았을 때 처리
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage.data?.link) {
      Linking.openURL(remoteMessage.data.link);
    }
  });

  // 앱이 종료된 상태에서 메시지를 받았을 때 처리
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        if (remoteMessage.data?.link) {
          Linking.openURL(remoteMessage.data.link);
        }
      }
    });
};
