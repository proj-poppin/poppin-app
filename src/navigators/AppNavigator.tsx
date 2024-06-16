import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator.tsx';
import MyProfileEditScreen from '../pages/myPage/ProfileEditScreen.tsx';
import {Pressable, Text} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import GoBackSvg from '../assets/icons/goBack.svg';
import PasswordChangeScreen from '../pages/myPage/PasswordChangeScreen.tsx';
import FAQScreen from '../pages/myPage/FAQScreen.tsx';
import KeywordAlarmScreen from '../pages/myPage/KeywordAlarmScreen.tsx';
import UserRegisterScreen from '../pages/myPage/UserRegisterScreen.tsx';
import PolicyScreen from '../pages/myPage/PolicyScreen.tsx';
import ReviewWriteScreen from '../pages/myPage/ReviewWriteScreen.tsx';
import OperatorRegisterScreen from '../pages/myPage/OperatorRegisterScreen.tsx';
import MemberDeleteScreen from '../pages/myPage/MemberDeleteScreen.tsx';
import {AppNavigatorParamList} from '../types/AppNavigatorParamList.ts';
import AppBarLeftPressableIconButton from '../components/molecules/pressable_icon/AppbarLeftPressableIconButton.tsx';
import PopUpDetailScreen from '../pages/detail/PopUpDetailScreen.tsx';
import PopUpDetailOptions from './options/PopUpDetailOptions.tsx';
import EntryScreen from '../pages/sign/EntryScreen.tsx';
import {EntryScreenOptions} from './options/EntryScreenOptions.tsx';
import PrivacyPolicyScreen from '../pages/sign/PrivacyPolicyScreen.tsx';
import ServicePolicyScreen from '../pages/sign/ServicePolicyScreen.tsx';
import ServicePolicyOptions from './options/ServicePolicyOptions.tsx';
import SignUpSocialNickNameScreen from '../pages/sign/SignUpSocialNickNameScreen.tsx';
import SignUpNickNameSocialOptions from './options/SignUpNickNameSocialOptions.tsx';
import SignUpEmailScreen from '../pages/sign/SignUpEmailScreen.tsx';
import SignUpEmailOptions from './options/SignUpEmailOptions.tsx';
import SignUpAuthScreen from '../pages/sign/SignUpAuthScreen.tsx';
import SignUpAuthOptions from './options/SignUpAuthOptions.tsx';
import SignUpNickNameScreen from '../pages/sign/SignUpNickNameScreen.tsx';
import SignUpNickNameOptions from './options/SignUpNickNameOptions.tsx';
import SignUpSucceedScreen from '../pages/sign/SignUpSucceedScreen.tsx';
import BasicLoginScreen from '../pages/sign/BasicLoginScreen.tsx';
import BasicLoginOptions from './options/BasicLoginOptions.tsx';
import PasswordResetScreen from '../pages/sign/PasswordResetScreen.tsx';
import {PasswordResetOptions} from './options/PasswordResetOptions.tsx';
import SignUpPreferenceSettingScreen from '../pages/preference/SignUpPreferenceSettingScreen.tsx';
import PreferenceSettingOptions from './options/PreferenceSettingOptions.tsx';
import AlarmSettingScreen from '../pages/alarm/AlaramSettingScreen.tsx';
import AlarmScreen from '../pages/alarm/AlarmScreen.tsx';
import AlarmOptions from './options/AlarmOptions.tsx';
import AlarmSettingOptions from './options/AlarmSettingOptions.tsx';
import NoticeDetailScreen from '../pages/Notice/NoticeDetailScreen.tsx';
import {NoticeDetailOptions} from './options/NoticeDetailOptions.tsx';
import FindInputScreen from '../pages/find/FindInputScreen.tsx';
import ReportScreen from '../pages/report/ReportScreen.tsx';
import ReportOptions from './options/ReportOptions.tsx';
import PopUpEditRequestScreen from '../pages/detail/PopUpEditRequestScreen.tsx';
import PopUpEditRequestOptions from './options/PopUpEditRequestOptions.tsx';
import PrivacyPolicyOptions from './options/PrivacyPolicyOptions.tsx';
import PreferenceSettingScreen from '../pages/myPage/preferenceSetting/PreferenceSettingScreen.tsx';
import FAQFormScreen from '../pages/myPage/FAQFormScreen.tsx';
import PasswordCheckScreen from '../pages/myPage/PasswordCheckScreen.tsx';

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

// 모든 스크린에 적용될 기본 옵션
const screenOptions = {
  headerShadowVisible: false,
};

// 헤더가 필요 없는 스크린에 적용될 옵션
const DefaultNoHeaderOptions = {
  headerShown: false,
};

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={DefaultNoHeaderOptions}
      />
      <Stack.Screen
        name="findInputScreen"
        component={FindInputScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Entry"
        component={EntryScreen}
        options={EntryScreenOptions}
      />
       <Stack.Screen
        name="PreferenceSetting"
        component={PreferenceSettingScreen}
        options={EntryScreenOptions}
      />

      <Stack.Screen
        name="Alarm"
        component={AlarmScreen}
        options={AlarmOptions}
      />
      <Stack.Screen
        name="AlarmSetting"
        component={AlarmSettingScreen}
        options={AlarmSettingOptions}
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
        name="SignUpPreferenceSetting"
        component={SignUpPreferenceSettingScreen}
        options={PreferenceSettingOptions}
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
        name={'PopUpDetail'}
        component={PopUpDetailScreen}
        options={PopUpDetailOptions}
      />
      <Stack.Screen
        name={'Report'}
        component={ReportScreen}
        options={ReportOptions}
      />
      <Stack.Screen
        name={'PopUpEditRequest'}
        component={PopUpEditRequestScreen}
        options={PopUpEditRequestOptions}
      />
      <Stack.Screen
        name={'NoticeDetail'}
        component={NoticeDetailScreen}
        options={NoticeDetailOptions}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={MyProfileEditScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '프로필 설정',
          headerRight: () => (
            <Text
              onPress={
                navigation.navigate('ProfileEdit')}
              style={{color: globalColors.blue, marginRight: 10}}>
              완료
            </Text>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
              <GoBackSvg />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
        <Stack.Screen name="PasswordCheck" component={PasswordCheckScreen} />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '문의하기/FAQ',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
              <GoBackSvg />
            </Pressable>
          ),
        })}
      />
       <Stack.Screen
        name="FAQFormScreen"
        component={FAQFormScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '1:1문의하기',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
              <GoBackSvg />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="KeywordAlarm"
        component={KeywordAlarmScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '키워드 알림', // 헤더 타이틀 설정
          headerLeft: AppBarLeftPressableIconButton,
          // 기타 헤더 스타일링 옵션
        })}
      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegisterScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '이용자 제보하기',
          headerLeft: AppBarLeftPressableIconButton,
          gestureEnabled: false, // 뒤로가기 제스처 비활성화
        })}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '이용 약관 및 정책', // 헤더 타이틀 설정
          headerLeft: AppBarLeftPressableIconButton,
          // 기타 헤더 스타일링 옵션
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
          headerLeft: AppBarLeftPressableIconButton,
        })}
      />
      <Stack.Screen
        name="MemberDelete"
        component={MemberDeleteScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '회원 탈퇴', // 헤더 타이틀 설정
          headerLeft: AppBarLeftPressableIconButton,
          // 기타 헤더 스타일링 옵션
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
