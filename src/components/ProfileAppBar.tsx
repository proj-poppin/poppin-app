// ProfileAppBar.js
import React from 'react';
import {Pressable, Text} from 'react-native';
import GoBackSvg from '../assets/icons/goBack.svg';
import primaryColors from '../style/primaryColors.ts';

const ProfileAppBar = ({navigation}) => {
  return {
    headerShown: true,
    headerStyle: {
      shadowOpacity: 0, // iOS에서 앱바 아래의 그림자 제거
      elevation: 0, // Android에서 앱바 아래의 그림자 제거
      backgroundColor: 'white', // 앱바 배경색을 흰색으로 설정
    },
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.goBack()}
        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
        <GoBackSvg />
      </Pressable>
    ),
    headerTitle: '프로필 설정',
    headerTitleStyle: {
      color: 'black', // 제목 색상 설정 (선택사항)
    },
    headerRight: () => (
      <Text onPress={() => navigation.goBack()}>
        <Text style={{color: primaryColors.blue, marginLeft: 10}}>완료</Text>
      </Text>
    ),
  };
};

export default ProfileAppBar;
