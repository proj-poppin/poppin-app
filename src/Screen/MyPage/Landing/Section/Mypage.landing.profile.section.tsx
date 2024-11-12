import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import {useUserStore} from '../../../../Zustand/User/user.zustand';
import RightArrowGrayIcon from 'src/Resource/svg/right-arrow-gray-icon.svg';
import shallow from 'zustand/shallow';

export const MyPageLandingProfileSection = () => {
  const {user, isLoggedIn} = useUserStore(
    state => ({user: state.user, isLoggedIn: state.isLoggedIn}),
    shallow,
  );
  const loggedIn = isLoggedIn();
  return (
    <ProfileContainer>
      <ProfileIcon source={require('src/Resource/png/app-logo.png')} />
      <ProfileInfoContainer>
        <ProfileTitle>
          {loggedIn ? user.nickname : '로그인 후 이용해주세요'}
        </ProfileTitle>
        <ManageButton onPress={() => {}}>
          <Row>
            <ManageText>내 정보 및 취향 관리</ManageText>
            <RightArrowGrayIcon style={{marginLeft: moderateScale(4)}} />
          </Row>
        </ManageButton>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(16)}px;
`;

const ProfileIcon = styled.Image`
  width: ${moderateScale(74)}px;
  height: ${moderateScale(74)}px;
  border-radius: ${moderateScale(24)}px;
`;

const ProfileInfoContainer = styled.View`
  margin-left: ${moderateScale(20)}px;
`;

const ProfileTitle = styled.Text`
  font-size: ${moderateScale(20)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(4)}px;
`;

const ManageButton = styled.TouchableOpacity`
  margin-top: ${moderateScale(8)}px;
`;

const ManageText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #666;
`;
