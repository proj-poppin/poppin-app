import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator.tsx';
import MyProfileEditScreen from '../pages/myPage/ProfileEditScreen.tsx';
import globalColors from '../styles/color/globalColors.ts';
import PasswordChangeScreen from '../pages/myPage/PasswordChangeScreen.tsx';
import FAQScreen from '../pages/myPage/FAQScreen.tsx';
import KeywordAlarmScreen from '../pages/myPage/KeywordAlarmScreen.tsx';
import UserRegisterScreen from '../pages/myPage/UserRegisterScreen.tsx';
import PolicyScreen from '../pages/myPage/PolicyScreen.tsx';
import ReviewWriteScreen from '../pages/myPage/ReviewWriteScreen.tsx';
import OperatorRegisterScreen from '../pages/myPage/OperatorRegisterScreen.tsx';
import MemberDeleteScreen from '../pages/myPage/MemberDeleteScreen.tsx';
import PreferenceSettingScreen from '../pages/myPage/PreferenceSettingScreen.tsx';
import {AuthNavigatorParamList} from '../types/AuthNavigatorParamList.ts';
import HeaderRightPressableTextButton from '../components/molecules/pressable_text/AppbarRightPressableTextButton.tsx';
import AppBarLeftPressableIconButton from '../components/molecules/pressable_icon/AppbarLeftPressableIconButton.tsx';
import SignInEmailScreen from '../pages/sign/SignInEmailScreen.tsx';

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

const screenOptions = {
  headerShadowVisible: false,
};

const headerOptions = {
  headerShown: false,
};

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={headerOptions}
      />
      <Stack.Screen
        name="SignInEmail"
        component={SignInEmailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={MyProfileEditScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '프로필 설정',
          headerRight: () => (
            <HeaderRightPressableTextButton
              onPress={() => navigation.goBack()}
              text="완료"
              color={globalColors.blue}
            />
          ),
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '문의하기/FAQ',
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="KeywordAlarm"
        component={KeywordAlarmScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '키워드 알림', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegisterScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '이용자 제보하기',
          headerLeft: () => <AppBarLeftPressableIconButton />,
          gestureEnabled: false, // 뒤로가기 제스처 비활성화
        })}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '이용 약관 및 정책', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="ReviewWrite"
        component={ReviewWriteScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '일반 후기 작성', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="OperatorRegister"
        component={OperatorRegisterScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '운영자 제보하기', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="MemberDelete"
        component={MemberDeleteScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '회원 탈퇴', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="PreferenceSetting"
        component={PreferenceSettingScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '취향 설정하기',
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
