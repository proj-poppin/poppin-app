import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import LoadingScreen from '../pages/splash/LoadingScreen';
import userSlice from '../redux/slices/user';
import messaging from '@react-native-firebase/messaging';
import {registerPushToken} from '../apis/push/registerPushToken';
import {Platform, Alert} from 'react-native';
import getUserSetting from '../apis/myPage/getUserSetting';
import {resetInterests} from '../redux/slices/interestSlice';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AppNavigatorParamList} from '../types/AppNavigatorParamList';
import DeviceInfo from 'react-native-device-info';
import {Linking} from 'react-native';
import {RootState} from '../redux/stores/reducer.ts';
import useIsLoggedIn from '../hooks/auth/useIsLoggedIn.tsx';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const isLoggedIn = useIsLoggedIn();
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );

  const [routeUrl, setRouteUrl] = useState<string>('');

  const navigationRef = useNavigationContainerRef();
  const [isInitialUrlHandled, setIsInitialUrlHandled] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        console.log('푸시 토큰을 등록합니다!');
        await PushNotificationIOS.requestPermissions();
        const token = await messaging().getToken();
        const deviceId = await DeviceInfo.getUniqueId();
        console.log('🙏🏻device id:', deviceId);
        console.log('🙏🏻푸시 토큰:', token);
        const response = await registerPushToken({
          fcmToken: token,
          device: Platform.OS,
          deviceId: deviceId,
        });
        console.log('consol response', response);
        if (response?.success) {
          await EncryptedStorage.setItem('pushToken', token);
        } else {
        }
      } catch (error) {}
    }

    getToken();
  }, [dispatch]);

  useEffect(() => {
    const initializeApp = async () => {
      dispatch(resetInterests());
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      if (accessToken && refreshToken && isFinishedPreferenceSetting) {
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken,
            refreshToken,
          }),
        );
      }

      try {
        const userResponse = await getUserSetting();
        if (userResponse.success) {
          dispatch(userSlice.actions.setUser(userResponse.data));
        } else {
          dispatch(userSlice.actions.resetUser());
          throw new Error('User info fetch failed.');
        }
      } catch (error) {
        dispatch(userSlice.actions.resetUser());
      } finally {
        setInitialLoading(false);
        SplashScreen.hide();
      }
    };

    initializeApp();
  }, [dispatch, isFinishedPreferenceSetting]);

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      const route = url.replace(/.*?:\/\//g, '');
      setRouteUrl(route);
      const id = route.split('=')[1]; // id 추출 방식 수정
      if (route.includes('kakaolink')) {
        console.log('🔗 Kakao link detected:', route);
        navigationRef.current?.navigate('PopUpDetail', {
          id,
          isLoggedIn,
          isDeepLink: true,
        });
      }
    };

    const onReceiveURL = ({url}) => handleDeepLink({url});

    const linkingListener = Linking.addEventListener('url', onReceiveURL);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
        );
      }
      if (remoteMessage.data?.link) {
        handleDeepLink({url: remoteMessage.data.link});
      }
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data?.link) {
        handleDeepLink({url: remoteMessage.data.link});
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage && remoteMessage.data?.link) {
          handleDeepLink({url: remoteMessage.data.link});
        }
      });

    Linking.getInitialURL().then(url => {
      if (url && !isInitialUrlHandled) {
        handleDeepLink({url});
        setIsInitialUrlHandled(true);
      }
    });

    return () => {
      linkingListener.remove();
      unsubscribe();
    };
  }, [navigationRef, isLoggedIn, isInitialUrlHandled]);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const linking: LinkingOptions<AppNavigatorParamList> = {
    prefixes: [
      'poppin://',
      'com.googleusercontent.apps.807321583109-ga5ufm8ce8kfnf7nn12ucse59ihm0jj7://',
    ],
    config: {
      screens: {
        PopUpDetail: {
          path: 'popup/:id',
          parse: {
            id: id => `${id}`,
          },
        },
      },
    },
  };

  console.log('App loaded with linking config:', linking);
  console.log('LinkingOptions:', JSON.stringify(linking, null, 2));
  console.log(
    'PopUpDetail:',
    JSON.stringify(linking.config?.screens?.PopUpDetail, null, 2),
  );
  console.log('Prefixes:', linking.prefixes);

  return (
    <NavigationContainer theme={MyTheme} linking={linking} ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default RootNavigator;
