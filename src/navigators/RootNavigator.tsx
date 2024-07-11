import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import LoadingScreen from '../pages/splash/LoadingScreen.tsx';
import userSlice from '../redux/slices/user.ts';
import messaging from '@react-native-firebase/messaging';
import {registerPushToken} from '../apis/push/registerPushToken.ts';
import {Platform} from 'react-native';
import getUserSetting from '../apis/myPage/getUserSetting.ts';
import {resetInterests} from '../redux/slices/interestSlice.ts';
import usePermissions from '../hooks/usePermissions.ts';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );
  // // 앱 최초 시작시 권한 요청 원할때 사용
  // usePermissions();

  useEffect(() => {
    async function getToken() {
      try {
        console.log('푸시 토큰을 등록합니다!');
        await PushNotificationIOS.requestPermissions();
        const token = await messaging().getToken();
        const response = await registerPushToken({
          token: token,
          device: Platform.OS,
        });
        console.log('consol response', response);
        if (response?.success) {
          await EncryptedStorage.setItem('pushToken', token);
          console.log('푸시 토큰 등록에 성공했습니다.');
        } else {
          console.error(`푸시 토큰 등록에 실패했습니다. ${response?.error}`);
          console.error(`푸시 토큰 등록에 실패했습니다. ${response?.error}`);
        }
      } catch (error) {
        console.log('푸시 토큰 등록에 실패했습니다 ㅠㅠ');
        console.log(error);
      }
    }
    getToken();
  }, [dispatch]);
  useEffect(() => {
    const initializeApp = async () => {
      // Reset interests and user state on app start
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

  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
