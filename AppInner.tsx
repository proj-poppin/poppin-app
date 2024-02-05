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
import NickNameSettingScreen from './src/screens/sign/NicknameSettingScreen.tsx';
import PasswordFindScreen from './src/screens/sign/PasswordFindScreen.tsx';
import PreferenceCategoryScreen from './src/screens/preference/PreferenceCategoryScreen.tsx';
import PreferenceInterestScreen from './src/screens/preference/PreferenceInterestScreen.tsx';
import PreferenceWhoScreen from './src/screens/preference/PreferenceWhoScreen.tsx';
import SignInEmailScreen from './src/screens/sign/SignInEmailScreen.tsx';
import SignInPasswordScreen from './src/screens/sign/SignInPasswordScreen.tsx';
import SignUpScreen from './src/screens/sign/SignUpScreen.tsx';
import SignUpSucceedScreen from './src/screens/sign/SignUpSucceedScreen.tsx';

import CloseSvgIcon from './src/assets/icons/close.svg';
import LeftSvgIcon from './src/assets/icons/left.svg';
import ProtectInfoScreen from './src/screens/sign/ProtectInfoScreen.tsx';
import ServiceInfoScreen from './src/screens/sign/ServiceInfoScreen.tsx';

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
      <Stack.Screen
        name="SignInEmail"
        component={SignInEmailScreen}
        options={({navigation}) => ({
          headerTitle: '',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('Home')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SignInPassword"
        component={SignInPasswordScreen}
        options={({navigation}) => ({
          headerTitle: '로그인',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignInEmail')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({navigation}) => ({
          headerTitle: '회원가입',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignInEmail')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="NicknameSetting"
        component={NickNameSettingScreen}
        options={({navigation}) => ({
          headerTitle: '닉네임 설정',
          headerLeft: () => (
            <LeftSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SignUpSucceed"
        component={SignUpSucceedScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ServiceInfo"
        component={ServiceInfoScreen}
        options={({navigation}) => ({
          headerTitle: '서비스 이용 약관',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="ProtectInfo"
        component={ProtectInfoScreen}
        options={({navigation}) => ({
          headerTitle: '개인 정보 보호 정책',
          headerLeft: () => (
            <CloseSvgIcon onPress={() => navigation.navigate('SignUp')} />
          ),
          headerStyle: {
            borderBottomWidth: 0, // Android와 iOS에서 헤더 경계선 제거
          },
          headerShadowVisible: false, // iOS에서 헤더 그림자 제거
          headerShown: true,
        })}
      />
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
