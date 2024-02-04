import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer.ts';

// 스크린 import
import DetailScreen from './src/screens/detail/DetailScreen.tsx';
import FindScreen from './src/screens/find/FindScreen.tsx';
import HomeScreen from './src/screens/home/HomeScreen.tsx';
import LikesScreen from './src/screens/likes/LikesScreen.tsx';
import MyPageScreen from './src/screens/myPage/MyPageScreen.tsx';
import NickNameScreen from './src/screens/sign/NicknameSettingScreen.tsx';
import PasswordFindScreen from './src/screens/sign/PasswordFindScreen.tsx';
import PreferenceCategoryScreen from './src/screens/preference/PreferenceCategoryScreen.tsx';
import PreferenceInterestScreen from './src/screens/preference/PreferenceInterestScreen.tsx';
import PreferenceWhoScreen from './src/screens/preference/PreferenceWhoScreen.tsx';
import SignInEmailScreen from './src/screens/sign/SignInEmailScreen.tsx';
import SignInPasswordScreen from './src/screens/sign/SignInPasswordScreen.tsx';
import SignUpScreen from './src/screens/sign/SignUpScreen.tsx';
import SignUpSucceedScreen from './src/screens/sign/SignUpSucceedScreen.tsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export type LoggedInParamList = {
  DetailScreen: {storeId: string}; // 특정 팝업 스토어 상세 페이지
  FindScreen: undefined;
  HomeScreen: undefined;
  LikesScreen: undefined;
  MyPageScreen: undefined;
};

export type RootStackParamList = {
  SignInEmailScreen: undefined;
  SignInPasswordScreen: undefined;
  SignUpScreen: undefined;
  SignUpSucceedScreen: undefined;
  NickNameScreen: undefined;
  PasswordFindScreen: undefined;
  PreferenceCategoryScreen: undefined;
  PreferenceInterestScreen: undefined;
  PreferenceWhoScreen: undefined;
};

function AppInner() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.accessToken,
  );

  return isLoggedIn ? (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Find" component={FindScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="SignInEmail" component={SignInEmailScreen} />
      <Stack.Screen name="SignInPassword" component={SignInPasswordScreen} />
      <Stack.Screen name="SignUpSucceed" component={SignUpSucceedScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="NickName" component={NickNameScreen} />
      <Stack.Screen name="PasswordFind" component={PasswordFindScreen} />
      <Stack.Screen
        name="PreferenceCategory"
        component={PreferenceCategoryScreen}
      />
      <Stack.Screen
        name="PreferenceInterestScreen"
        component={PreferenceInterestScreen}
      />
      <Stack.Screen
        name="PreferenceWhoScreen"
        component={PreferenceWhoScreen}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
