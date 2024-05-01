import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';
import getUser from '../apis/user/getUser.ts';
import LoadingScreen from '../pages/splash/LoadingScreen.tsx';
import userSlice from '../redux/slices/user.ts';
import useIsLoggedIn from '../hooks/useIsLoggedIn.tsx';

const RootNavigator = () => {
  const dispatch = useDispatch();
  useIsLoggedIn();
  const [initialLoading, setInitialLoading] = useState(true);
  const isFinishedPreferenceSetting = useSelector(
    (state: RootState) => state.user.isFinishedPreferenceSetting,
  );

  useEffect(() => {
    const initializeApp = async () => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');

      // 토큰이 없을 경우, 로그인 화면으로
      if (accessToken && refreshToken) {
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken,
            refreshToken,
          }),
        );
      } else {
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
        } else {
          throw new Error('User info fetch failed.');
        }
      } catch (error) {
        console.log('Error fetching user info:', error);
      } finally {
        setInitialLoading(false);
        SplashScreen.hide();
      }
    };

    initializeApp();
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

  console.log('isFinishedPreferenceSetting:', isFinishedPreferenceSetting);

  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
