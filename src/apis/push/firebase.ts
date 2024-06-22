import {NavigationProp} from '@react-navigation/native';
import PushNotificationIOS, {
  PushNotification,
} from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

export const initFirebaseNotification = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  // 푸시 메세지 Notification 처리
  messaging().onMessage(async remoteMessage => {
    console.log('Message handled in the foreground!', remoteMessage);
    if (remoteMessage.data) {
      PushNotificationIOS.addNotificationRequest({
        id: 'remoteMessage', // unique identifier for the notification
        title: remoteMessage.notification?.title || 'Default Title',
        body: remoteMessage.notification?.body || 'Default Body',
        userInfo: remoteMessage.data,
      });
    }
  });

  // 백그라운드에서 Notification 눌렀을 때 이벤트 처리
  messaging().onNotificationOpenedApp(remoteMessage => {
    try {
      console.log('Message handled in the background!', remoteMessage);
      const popupId = remoteMessage?.data?.popupId;
      // @ts-ignore
      navigation.navigate('PopUpDetail', {id: popupId});
    } catch (error) {
      console.log('Background Notification Error', error);
    }
  });

  // 포그라운드에서 Notification 눌렀을 때 이벤트 처리
  PushNotificationIOS.addEventListener(
    'localNotification',
    (notification: PushNotification) => {
      try {
        const pushData = notification.getData();
        // @ts-ignore
        navigation.navigate('PopUpDetail', {id: pushData.popupId});
      } catch (error) {
        console.log('Foreground Notification Error', error);
      }
    },
  );
};
