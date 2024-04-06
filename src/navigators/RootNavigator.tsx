import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';
import AuthNavigator from './AuthNavigator';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import getUser from '../apis/user/getUser.ts';
import LoadingScreen from '../pages/splash/LoadingScreen.tsx';
import userSlice from '../redux/slices/user.ts';

const RootNavigator = () => {
  const dispatch = useDispatch(); // Redux의 dispatch를 사용하기 위해
  const [initialLoading, setInitialLoading] = useState(true);
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );

  useEffect(() => {
    const initializeApp = async () => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      // 토큰이 없을 경우, 로그인 화면으로
      if (!accessToken || !refreshToken) {
        setInitialLoading(false);
        SplashScreen.hide();
        return;
      }

      // 토큰을 사용하여 사용자 정보 조회
      try {
        const userResponse = await getUser();
        if (userResponse.success) {
          // 사용자 정보 조회 성공, 메인 화면으로
          console.log('User info fetched successfully.');
          dispatch(userSlice.actions.getUser(userResponse.data));
          // 여기에 필요한 사용자 정보 저장 로직 추가 (예: dispatch(setUser(userResponse.data)))
        } else {
          throw new Error('User info fetch failed.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setInitialLoading(false);
        SplashScreen.hide();
      }
    };

    initializeApp().then();
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
      {isFinishedPreferenceSetting && isLoggedIn ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
