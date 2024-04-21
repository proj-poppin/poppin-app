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
import PopUpDetailScreen from '../pages/find/PopUpDetailScreen.tsx';
import PopUpDetailOptions from './options/PopUpDetailOptions.tsx';

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
        name={'PopUpDetail'}
        component={PopUpDetailScreen}
        options={PopUpDetailOptions}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={MyProfileEditScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '프로필 설정',
          headerRight: () => (
            <Text
              onPress={() => navigation.goBack()}
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
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={({navigation}) => ({
          headerShown: true,
          title: '문의하기/FAQ',
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
