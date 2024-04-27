// 초기 개발시 login 상태에 따라 navigator 분리를 위해 추가했으나
// navigator 단에서 분리할 필요가 없다고 판단되어 AppNavigator로 통합
// 이에 따라 현재는 사용처 없음
// 2024/04/26

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
import {AuthNavigatorParamList} from '../types/AuthNavigatorParamList.ts';
import HeaderRightPressableTextButton from '../components/molecules/pressable_text/AppbarRightPressableTextButton.tsx';
import AppBarLeftPressableIconButton from '../components/molecules/pressable_icon/AppbarLeftPressableIconButton.tsx';
import EntryScreen from '../pages/sign/EntryScreen.tsx';
import {EntryScreenOptions} from './options/EntryScreenOptions.tsx';
import BasicLoginScreen from '../pages/sign/BasicLoginScreen.tsx';
import SignUpEmailScreen from '../pages/sign/SignUpEmailScreen.tsx';
import SignUpEmailOptions from './options/SignUpEmailOptions.tsx';
import SignUpAuthScreen from '../pages/sign/SignUpAuthScreen.tsx';
import SignUpAuthOptions from './options/SignUpAuthOptions.tsx';
import SignUpNickNameScreen from '../pages/sign/SignUpNickNameScreen.tsx';
import SignUpNickNameOptions from './options/SignUpNickNameOptions.tsx';
import SignUpSucceedScreen from '../pages/sign/SignUpSucceedScreen.tsx';
import BasicLoginOptions from './options/BasicLoginOptions.tsx';
import PasswordResetScreen from '../pages/sign/PasswordResetScreen.tsx';
import {PasswordResetOptions} from './options/PasswordResetOptions.tsx';
import PreferenceSettingOptions from './options/PreferenceSettingOptions.tsx';
import PreferenceScreen from '../pages/preference/PreferenceScreen.tsx';
import SignUpSocialNickNameScreen from '../pages/sign/SignUpSocialNickNameScreen.tsx';
import SignUpNickNameSocialOptions from './options/SignUpNickNameSocialOptions.tsx';
import PrivacyPolicyScreen from '../pages/sign/PrivacyPolicyScreen.tsx';
import PrivacyPolicyOptions from './options/PrivacyPolicyOptions.tsx';
import ServicePolicyScreen from '../pages/sign/ServicePolicyScreen.tsx';
import ServicePolicyOptions from './options/ServicePolicyOptions.tsx';
import PopUpDetailScreen from '../pages/find/PopUpDetailScreen.tsx';
import PopUpDetailOptions from './options/PopUpDetailOptions.tsx';

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

const screenOptions = {
  headerShadowVisible: false,
};

const DefaultNoHeaderOptions = {
  headerShown: false,
};

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Entry"
        component={EntryScreen}
        options={EntryScreenOptions}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={PrivacyPolicyOptions}
      />
      <Stack.Screen
        name="ServicePolicy"
        component={ServicePolicyScreen}
        options={ServicePolicyOptions}
      />
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={DefaultNoHeaderOptions}
      />
      <Stack.Screen
        name={'PopUpDetail'}
        component={PopUpDetailScreen}
        options={PopUpDetailOptions}
      />
      <Stack.Screen
        name="SignUpNickNameSocial"
        component={SignUpSocialNickNameScreen}
        options={SignUpNickNameSocialOptions}
      />
      <Stack.Screen
        name="SignUpEmail"
        component={SignUpEmailScreen}
        options={SignUpEmailOptions}
      />
      <Stack.Screen
        name="SignUpAuthCode"
        component={SignUpAuthScreen}
        options={SignUpAuthOptions}
      />
      <Stack.Screen
        name="SignUpNickName"
        component={SignUpNickNameScreen}
        options={SignUpNickNameOptions}
      />

      <Stack.Screen
        name="SignUpSucceed"
        component={SignUpSucceedScreen}
        options={DefaultNoHeaderOptions}
      />
      <Stack.Screen
        name="PreferenceSetting"
        component={PreferenceScreen}
        options={PreferenceSettingOptions}
      />
      <Stack.Screen
        name="BasicLogin"
        component={BasicLoginScreen}
        options={BasicLoginOptions}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={PasswordResetOptions}
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
        options={() => ({
          headerShown: true,
          title: '문의하기/FAQ',
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="KeywordAlarm"
        component={KeywordAlarmScreen}
        options={() => ({
          headerShown: true,
          title: '키워드 알림', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegisterScreen}
        options={() => ({
          headerShown: true,
          title: '이용자 제보하기',
          headerLeft: () => <AppBarLeftPressableIconButton />,
          gestureEnabled: false, // 뒤로가기 제스처 비활성화
        })}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={() => ({
          headerShown: true,
          title: '이용 약관 및 정책', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="ReviewWrite"
        component={ReviewWriteScreen}
        options={() => ({
          headerShown: true,
          title: '일반 후기 작성', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="OperatorRegister"
        component={OperatorRegisterScreen}
        options={() => ({
          headerShown: true,
          title: '운영자 제보하기', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
      <Stack.Screen
        name="MemberDelete"
        component={MemberDeleteScreen}
        options={() => ({
          headerShown: true,
          title: '회원 탈퇴', // 헤더 타이틀 설정
          headerLeft: () => <AppBarLeftPressableIconButton />,
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
