import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/stores/reducer';
import AuthNavigator from './AuthNavigator.tsx';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalColors from '../styles/color/globalColors.ts';

const RootNavigator = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
