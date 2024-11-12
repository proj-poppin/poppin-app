import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import ArrowIcon from '../../../../Resource/svg/right-arrow-gray-icon.svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackProps} from '../../../../Navigator/App.stack.navigator';
import {useMypageLandingScreenStore} from '../Mypage.landing.zustand';
import {useUserStore} from '../../../../Zustand/User/user.zustand';
import shallow from 'zustand/shallow';

interface MenuItem {
  title: string;
  rightText?: string;
  onPress: () => void;
}

export const MyPageLandingMenuSection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackProps>>();
  const {setLogoutModalVisible} = useMypageLandingScreenStore(
    state => ({setLogoutModalVisible: state.setLogoutModalVisible}),
    shallow,
  );
  const isLoggedIn = useUserStore(state => state.isLoggedIn);

  const menuItems: MenuItem[] = [
    {title: '키워드 알림 설정', onPress: () => {}},
    {title: '문의하기 / FAQ', onPress: () => {}},
    {title: '앱 버전', rightText: '1.16.0', onPress: () => {}},
    {title: '이용 약관 및 정책', onPress: () => {}},
    {
      title: isLoggedIn() ? '로그아웃' : '로그인 하러 가기',
      onPress: () => {
        if (isLoggedIn()) {
          setLogoutModalVisible();
        } else {
          navigation.navigate('AuthLandingScreen', {});
        }
      },
    },
  ];

  return (
    <Container>
      {menuItems.map((item, index) => (
        <MenuItem key={index} onPress={item.onPress}>
          <MenuTitle>{item.title}</MenuTitle>
          {item.rightText ? (
            <RightText>{item.rightText}</RightText>
          ) : (
            <ArrowIcon />
          )}
        </MenuItem>
      ))}
    </Container>
  );
};

const Container = styled.View`
  margin-top: ${moderateScale(20)}px;
  padding-bottom: ${moderateScale(48)}px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(12)}px ${moderateScale(16)}px;
  background-color: white;
`;

const MenuTitle = styled.Text`
  font-size: ${moderateScale(14)}px;
`;

const RightText = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: #666;
`;
