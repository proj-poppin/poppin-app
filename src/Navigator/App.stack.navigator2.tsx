// import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// // import MainTabNavigator from './MainTabNavigator.tsx';
// // import MyProfileEditScreen from '../pages/myPage/ProfileEditScreen.tsx';
// // import {Pressable} from 'react-native';
// // import GoBackSvg from 'src/Resource/svg/left-arrow-black-icon.svg';
// // import PasswordChangeScreen from '../pages/myPage/PasswordChangeScreen.tsx';
// // import FAQScreen from '../pages/myPage/FAQScreen.tsx';
// // import KeywordAlarmScreen from '../pages/myPage/KeywordAlarmScreen.tsx';
// // import UserRegisterScreen from '../pages/myPage/UserRegisterScreen.tsx';
// // import PolicyScreen from '../pages/myPage/PolicyScreen.tsx';
// // import ReviewWriteScreen from '../pages/myPage/ReviewWriteScreen.tsx';
// // import OperatorRegisterScreen from '../pages/myPage/OperatorRegisterScreen.tsx';
// // import MemberDeleteScreen from '../pages/myPage/MemberDeleteScreen.tsx';
// // import {AppNavigatorParamList} from '../types/AppNavigatorParamList.ts';
// // import AppBarLeftPressableIconButton from '../components/molecules/pressable_icon/AppbarLeftPressableIconButton.tsx';
// // import PopUpDetailScreen from '../pages/detail/PopUpDetailScreen.tsx';
// // import PopUpDetailOptions from './options/PopUpDetailOptions.tsx';
// // import EntryScreen from '../pages/sign/EntryScreen.tsx';
// // import {EntryScreenOptions} from './options/EntryScreenOptions.tsx';
// // import PrivacyPolicyScreen from '../pages/sign/PrivacyPolicyScreen.tsx';
// // import ServicePolicyScreen from '../pages/sign/ServicePolicyScreen.tsx';
// // import ServicePolicyOptions from './options/ServicePolicyOptions.tsx';
// // import SignUpSocialNickNameScreen from '../pages/sign/SignUpSocialNickNameScreen.tsx';
// // import SignUpNickNameSocialOptions from './options/SignUpNickNameSocialOptions.tsx';
// // import SignUpEmailScreen from '../pages/sign/SignUpEmailScreen.tsx';
// // import SignUpEmailOptions from './options/SignUpEmailOptions.tsx';
// // import SignUpAuthScreen from '../pages/sign/SignUpAuthScreen.tsx';
// // import SignUpAuthOptions from './options/SignUpAuthOptions.tsx';
// // import SignUpNickNameScreen from '../pages/sign/SignUpNickNameScreen.tsx';
// // import SignUpNickNameOptions from './options/SignUpNickNameOptions.tsx';
// // import SignUpSucceedScreen from '../pages/sign/SignUpSucceedScreen.tsx';
// // import BasicLoginScreen from '../pages/sign/BasicLoginScreen.tsx';
// // import BasicLoginOptions from './options/BasicLoginOptions.tsx';
// // import PasswordResetScreen from '../pages/sign/PasswordResetScreen.tsx';
// // import {PasswordResetOptions} from './options/PasswordResetOptions.tsx';
// // import SignUpPreferenceSettingScreen from '../pages/preference/SignUpPreferenceSettingScreen.tsx';
// // import SignUpPreferenceSettingOptions from './options/SignUpPreferenceSettingOptions.tsx';
// // import AlarmSettingScreen from '../pages/alarm/AlaramSettingScreen.tsx';
// // import AlarmScreen from '../pages/alarm/AlarmScreen.tsx';
// // import AlarmOptions from './options/AlarmOptions.tsx';
// // import AlarmSettingOptions from './options/AlarmSettingOptions.tsx';
// // import NoticeDetailScreen from '../pages/Notice/NoticeDetailScreen.tsx';
// // import {NoticeDetailOptions} from './options/NoticeDetailOptions.tsx';
// // import FindInputScreen from '../pages/find/FindInputScreen.tsx';
// // import ReportScreen from '../pages/report/ReportScreen.tsx';
// // import ReportOptions from './options/ReportOptions.tsx';
// // import PopUpEditRequestScreen from '../pages/detail/PopUpEditRequestScreen.tsx';
// // import PopUpEditRequestOptions from './options/PopUpEditRequestOptions.tsx';
// // import PrivacyPolicyOptions from './options/PrivacyPolicyOptions.tsx';
// import {useNavigation} from '@react-navigation/native';
// import {AppNavigatorParamList} from '../types/AppNavigatorParamList';
// // import {initFirebaseNotification} from '../Axios/push/firebase.ts';
// // import PreferenceSettingScreen from '../pages/myPage/preferenceSetting/PreferenceSettingScreen.tsx';
// // import FAQFormScreen from '../pages/myPage/FAQFormScreen.tsx';
// // import MyReviewsList from '../pages/myPage/MyReviewsList.tsx';
// // import {MyPagePreferenceSettingScreenOptions} from './options/MyPagePreferenceSettingOptions.tsx';
// // import {PasswordChangeOptions} from './options/PasswordChangeOptions.tsx';
// // import ProfileEditOptions from './options/ProfileEditOptions.tsx';
// // import DeleteCompleteScreen from '../pages/DeleteCompleteScreen.tsx';
// // import BlockScreen from '../pages/report/BlockScreen.tsx';
// // import BlockOptions from './options/BlockOptions.tsx';
// // import FindResultScreen from '../pages/find/FindResultScreen.tsx';
// // import BeginnerTipsScreen from '../pages/tip/BeginnerTipsScreen.tsx';
// // import {MyPageReviewWriteScreen} from '../pages/myPage/MyPageReviewWriteScreen.tsx';
// // import {MyPageReviewWriteCompleteScreen} from '../pages/myPage/MyPageReviewWriteCompleteScreen.tsx';
//
// const Stack = createNativeStackNavigator<AppNavigatorParamList>();
//
// // 모든 스크린에 적용될 기본 옵션
// const screenOptions = {
//   headerShadowVisible: false,
// };
//
// // 헤더가 필요 없는 스크린에 적용될 옵션
// const DefaultNoHeaderOptions = {
//   headerShown: false,
// };
//
// /**
//  * 앱에서 사용되는 모든 스크린의 속성들을 정의합니다.
//  * 이 type의 key에 해당하는 값은 AppStack.Screen의 name과 일치해야 합니다.
//  * @author 도형
//  */
// export type AppStackProps = {};
//
// function AppStackNavigator() {
//   const navigation = useNavigation();
//   initFirebaseNotification(navigation);
//
//   return (
//     <Stack.Navigator screenOptions={screenOptions}>
//       <Stack.Screen
//         name="MainTabNavigator"
//         component={MainTabNavigator}
//         options={DefaultNoHeaderOptions}
//       />
//       {/*<Stack.Screen*/}
//       {/*  name="BeginnerTips"*/}
//       {/*  component={BeginnerTipsScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '팝핀 활용 팁',*/}
//       {/*    headerLeft: () => (*/}
//       {/*      <Pressable*/}
//       {/*        onPress={() => navigation.goBack()}*/}
//       {/*        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>*/}
//       {/*        <GoBackSvg />*/}
//       {/*      </Pressable>*/}
//       {/*    ),*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="Entry"*/}
//       {/*  component={EntryScreen}*/}
//       {/*  options={EntryScreenOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="PreferenceSetting"*/}
//       {/*  component={PreferenceSettingScreen}*/}
//       {/*  options={MyPagePreferenceSettingScreenOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="Alarm"*/}
//       {/*  component={AlarmScreen}*/}
//       {/*  options={AlarmOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="AlarmSetting"*/}
//       {/*  component={AlarmSettingScreen}*/}
//       {/*  options={AlarmSettingOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="PrivacyPolicy"*/}
//       {/*  component={PrivacyPolicyScreen}*/}
//       {/*  options={PrivacyPolicyOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="ServicePolicy"*/}
//       {/*  component={ServicePolicyScreen}*/}
//       {/*  options={ServicePolicyOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="BasicLogin"*/}
//       {/*  component={BasicLoginScreen}*/}
//       {/*  options={BasicLoginOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="PasswordReset"*/}
//       {/*  component={PasswordResetScreen}*/}
//       {/*  options={PasswordResetOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpPreferenceSetting"*/}
//       {/*  component={SignUpPreferenceSettingScreen}*/}
//       {/*  options={SignUpPreferenceSettingOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpNickNameSocial"*/}
//       {/*  component={SignUpSocialNickNameScreen}*/}
//       {/*  options={SignUpNickNameSocialOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpEmail"*/}
//       {/*  component={SignUpEmailScreen}*/}
//       {/*  options={SignUpEmailOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpAuthCode"*/}
//       {/*  component={SignUpAuthScreen}*/}
//       {/*  options={SignUpAuthOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpNickName"*/}
//       {/*  component={SignUpNickNameScreen}*/}
//       {/*  options={SignUpNickNameOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="SignUpSucceed"*/}
//       {/*  component={SignUpSucceedScreen}*/}
//       {/*  options={DefaultNoHeaderOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'PopUpDetail'}*/}
//       {/*  component={PopUpDetailScreen}*/}
//       {/*  options={PopUpDetailOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'Report'}*/}
//       {/*  component={ReportScreen}*/}
//       {/*  options={ReportOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'Block'}*/}
//       {/*  component={BlockScreen}*/}
//       {/*  options={BlockOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'PopUpEditRequest'}*/}
//       {/*  component={PopUpEditRequestScreen}*/}
//       {/*  options={PopUpEditRequestOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'NoticeDetail'}*/}
//       {/*  component={NoticeDetailScreen}*/}
//       {/*  options={NoticeDetailOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="ProfileEdit"*/}
//       {/*  component={MyProfileEditScreen}*/}
//       {/*  options={ProfileEditOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="PasswordChange"*/}
//       {/*  component={PasswordChangeScreen}*/}
//       {/*  options={PasswordChangeOptions}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="FindInput"*/}
//       {/*  component={FindInputScreen}*/}
//       {/*  options={{headerShown: false}}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="FindResult"*/}
//       {/*  component={FindResultScreen}*/}
//       {/*  options={{headerShown: false}}*/}
//       {/*/>*/}
//       {/*<Stack.Screen name="MyReviewsList" component={MyReviewsList} />*/}
//       {/*<Stack.Screen*/}
//       {/*  name="FAQ"*/}
//       {/*  component={FAQScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '문의하기/FAQ',*/}
//       {/*    headerLeft: () => (*/}
//       {/*      <Pressable*/}
//       {/*        onPress={() => navigation.goBack()}*/}
//       {/*        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>*/}
//       {/*        <GoBackSvg />*/}
//       {/*      </Pressable>*/}
//       {/*    ),*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="FAQFormScreen"*/}
//       {/*  component={FAQFormScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '1:1문의하기',*/}
//       {/*    headerLeft: () => (*/}
//       {/*      <Pressable*/}
//       {/*        onPress={() => navigation.goBack()}*/}
//       {/*        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>*/}
//       {/*        <GoBackSvg />*/}
//       {/*      </Pressable>*/}
//       {/*    ),*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="KeywordAlarm"*/}
//       {/*  component={KeywordAlarmScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '키워드 알림', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*    // 기타 헤더 스타일링 옵션*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="UserRegister"*/}
//       {/*  component={UserRegisterScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '이용자 제보하기',*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*    gestureEnabled: false, // 뒤로가기 제스처 비활성화*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="Policy"*/}
//       {/*  component={PolicyScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '이용 약관 및 정책', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*    // 기타 헤더 스타일링 옵션*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="ReviewWrite"*/}
//       {/*  component={ReviewWriteScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '일반 후기 작성', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: () => <AppBarLeftPressableIconButton />,*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="OperatorRegister"*/}
//       {/*  component={OperatorRegisterScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '운영자 제보하기', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="MemberDelete"*/}
//       {/*  component={MemberDeleteScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '회원 탈퇴', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name={'DeleteComplete'}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: false,*/}
//       {/*  })}*/}
//       {/*  component={DeleteCompleteScreen}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="MyPageReviewWrite"*/}
//       {/*  component={MyPageReviewWriteScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '후기 작성하기', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*    // 기타 헤더 스타일링 옵션*/}
//       {/*  })}*/}
//       {/*/>*/}
//       {/*<Stack.Screen*/}
//       {/*  name="MyPageReviewWriteComplete"*/}
//       {/*  component={MyPageReviewWriteCompleteScreen}*/}
//       {/*  options={({navigation}) => ({*/}
//       {/*    headerShown: true,*/}
//       {/*    title: '작성 완료 후기', // 헤더 타이틀 설정*/}
//       {/*    headerLeft: AppBarLeftPressableIconButton,*/}
//       {/*    // 기타 헤더 스타일링 옵션*/}
//       {/*  })}*/}
//       {/*/>*/}
//     </Stack.Navigator>
//   );
// }
//
// export default AppStackNavigator;
