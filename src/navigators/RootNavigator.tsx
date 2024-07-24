import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import LoadingScreen from '../pages/splash/LoadingScreen';
import userSlice from '../redux/slices/user';
import messaging from '@react-native-firebase/messaging';
import {registerPushToken} from '../apis/push/registerPushToken';
import {Platform} from 'react-native';
import getUserSetting from '../apis/myPage/getUserSetting';
import {resetInterests} from '../redux/slices/interestSlice';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {AppNavigatorParamList} from '../types/AppNavigatorParamList';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );

  useEffect(() => {
    async function getToken() {
      try {
        console.log('푸시 토큰을 등록합니다!');
        await PushNotificationIOS.requestPermissions();
        const token = await messaging().getToken();
        const deviceId = await DeviceInfo.getUniqueId();
        console.log('🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻device id:', deviceId);
        console.log('🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻🙏🏻푸시 토큰:', token);
        const response = await registerPushToken({
          fcmToken: token,
          device: Platform.OS,
          deviceId: deviceId,
        });
        console.log('consol response', response);
        if (response?.success) {
          await EncryptedStorage.setItem('pushToken', token);
          console.log('푸시 토큰 등록에 성공했습니다.');
        } else {
          console.log(`푸시 토큰 등록에 실패했습니다. ${response?.error}`);
          // console.error(`푸시 토큰 등록에 실패했습니다. ${response?.error}`);
        }
      } catch (error) {
        console.log('푸시 토큰 등록에 실패했습니다 ㅠㅠ');
        console.log(error);
        await getToken();
      }
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
    prefixes: [`${Config.KAKAO_API_KEY_WITH_KAKAO}://`],
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
    <NavigationContainer theme={MyTheme} linking={linking}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
