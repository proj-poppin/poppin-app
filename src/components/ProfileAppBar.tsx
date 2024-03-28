// ProfileAppBar.js
import React from 'react';
import {Pressable, Text} from 'react-native';
import GoBackSvg from '../assets/icons/goBack.svg';
import globalColors from '../styles/color/globalColors.ts';

// Add appBarTitle and isHeaderRight as parameters
const ProfileAppBar = ({navigation, appBarTitle, isHeaderRight}) => {
  return {
    headerShown: true,
    headerStyle: {
      shadowColor: 'transparent',
      shadowOpacity: 0, // iOS에서 앱바 아래의 그림자 제거
      elevation: 0, // Android에서 앱바 아래의 그림자 제거
      backgroundColor: 'white', // 앱바 배경색을 흰색으로 설정
      borderBottomWidth: 0, // 경계선 너비를 0으로 설정하여 제거
      borderBottomColor: 'transparent', // 경계선 색상을 투명하게 설정 (선택사항)
    },
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.goBack()}
        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
        <GoBackSvg />
      </Pressable>
    ),
    headerTitle: appBarTitle, // Use the appBarTitle parameter
    headerTitleStyle: {
      color: 'black', // 제목 색상 설정 (선택사항)
    },
    headerRight: () =>
      isHeaderRight ? ( // Conditionally render based on isHeaderRight
        <Text onPress={() => navigation.goBack()}>
          <Text style={{color: globalColors.blue, marginRight: 10}}>완료</Text>
        </Text>
      ) : null, // Return null if isHeaderRight is false
  };
};

export default ProfileAppBar;
