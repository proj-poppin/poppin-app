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

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );

  useEffect(() => {
    const initializeApp = async () => {
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
        console.log('🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛');
        console.log(userResponse);
        if (userResponse.success) {
          console.log(userResponse.data);
          dispatch(userSlice.actions.setUser(userResponse.data));
        } else {
          dispatch(userSlice.actions.resetUser());
          throw new Error('User info fetch failed.');
        }
      } catch (error) {
        dispatch(userSlice.actions.resetUser());
        console.log('Error fetching user info:', error);
      } finally {
        setInitialLoading(false);
        SplashScreen.hide();
      }
    };

    initializeApp();
  }, [dispatch, isFinishedPreferenceSetting]);

  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log('phone token', token);
        const response = await registerPushToken({
          token: token,
          device: Platform.OS,
        });
        if (response?.success) {
          await EncryptedStorage.setItem('pushToken', token);
          console.log('푸시 토큰 등록에 성공했습니다.');
        } else {
          console.error(`푸시 토큰 등록에 실패했습니다. ${response?.error}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getToken();
  }, [dispatch]);

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
