import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';

export const MyPageLandingProfileSection = () => {
  return (
    <ProfileContainer>
      <ProfileIcon source={require('../../../../Resource/png/app-logo.png')} />
      <ProfileInfoContainer>
        {/*//TODO - [규진]가변값으로바꿔야함.*/}
        <ProfileTitle>팝핀퀸</ProfileTitle>
        <ManageButton onPress={() => {}}>
          <ManageText>내 정보 및 취향 관리 ﹥</ManageText>
        </ManageButton>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
};

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
