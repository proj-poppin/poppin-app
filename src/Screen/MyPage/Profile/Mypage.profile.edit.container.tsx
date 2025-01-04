// src/screens/MyProfileEdit/MyProfileEditContainer.tsx
import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import GallerySvg from 'src/Resource/svg/gallery-icon.svg';
import CloseIcon from 'src/Resource/svg/closeGray.svg';
import RightSvg from 'src/Resource/svg/Icons/right-arrow-icon.svg';
import {moderateScale} from 'src/Util';
import PoppinCirclePng from 'src/Resource/png/app-logo.png';
import styled from 'styled-components/native';
import RequiredTextLabel from 'src/Component/RequiredTextLabel';
import {useProfileEdit} from './Mypage.profile.edit.context';

export function MyProfileEditContainer() {
  const {
    profileImage,
    nickname,
    emailIcon,
    isNicknameFocused,
    isModalVisible,
    completeModalVisible,
    modalMessage,
    setProfileImage,
    setNickname,
    handleNicknameChange,
    handleNicknameFocus,
    handleNicknameBlur,
    openGallery,
    showActionSheet,
    handleClearNickname,
  } = useProfileEdit();

  return (
    <ProfileContainer>
      <ImageContainer>
        <ProfileImage source={profileImage ? profileImage : PoppinCirclePng} />
        <GalleryButton onPress={showActionSheet}>
          <GallerySvg />
        </GalleryButton>
      </ImageContainer>

      <PreferenceButton onPress={() => console.log('g')}>
        <PreferenceText>취향 설정</PreferenceText>
      </PreferenceButton>

      <EmailContainer>
        {/* <LabelText>
            {['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(user.provider)
              ? '이메일'
              : '아이디'}
          </LabelText> */}
        <EmailTextInputWrapper>
          {emailIcon && <SocialIcon source={emailIcon} />}
          <EmailTextInput value={'test@poppin.com'} editable={false} />
        </EmailTextInputWrapper>

        <Spacer height={30} />
        <RequiredTextLabel label={'닉네임'} />
        <NicknameRow>
          <TextInputContainer focused={isNicknameFocused}>
            <StyledTextTextInput
              value={nickname}
              onChangeText={setNickname}
              onFocus={handleNicknameFocus}
              onBlur={handleNicknameBlur}
            />
            <ClearButton onPress={handleClearNickname}>
              <CloseIcon />
            </ClearButton>
          </TextInputContainer>
        </NicknameRow>
        <Spacer height={30} />

        <RequiredTextLabel label={'생년 월일'} />
        <BirthDayRow>
          <TextInputContainer focused={isNicknameFocused}>
            <StyledTextTextInput
              value={nickname}
              onChangeText={setNickname}
              onFocus={handleNicknameFocus}
              onBlur={handleNicknameBlur}
            />
          </TextInputContainer>
        </BirthDayRow>
        <WithdrawalText>회원 탈퇴</WithdrawalText>
      </EmailContainer>
      {/* 
      {!['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(user.provider) && (
        <PasswordChangeButton>
          <PasswordText>비밀번호 변경</PasswordText>
          <RightSvg />
        </PasswordChangeButton>
      )} */}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.color.grey.white}
  padding: ${moderateScale(20)}px;
`;

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(FastImage)`
  width: ${moderateScale(103)}px;
  height: ${moderateScale(103)}px;
  border-radius: ${moderateScale(55)}px;
`;

const GalleryButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const PreferenceButton = styled.TouchableOpacity`
  margin-top: ${moderateScale(20)}px;
  background-color: ${props => props.theme.color.blue.main};
  padding: ${moderateScale(10)}px ${moderateScale(20)}px;
  border-radius: ${moderateScale(25)}px;
  justify-content: center;
  align-items: center;
`;

const PreferenceText = styled.Text`
  color: ${props => props.theme.color.grey.white};
  font-size: ${moderateScale(13)}px;
  font-weight: 600;
`;
const EmailContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-top: ${moderateScale(15)}px;
  border-radius: ${moderateScale(50)}px;
`;

const EmailTextInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.color.grey.component};
  border-radius: ${moderateScale(30)}px;
  padding: ${moderateScale(10)}px;
`;

const EmailTextInput = styled.TextInput`
  flex: 1;
  margin-left: ${moderateScale(10)}px;
  color: ${props => props.theme.color.grey.main};
`;

const SocialIcon = styled.Image`
  margin-right: ${moderateScale(5)}px;
  width: ${moderateScale(30)}px;
  height: ${moderateScale(30)}px;
`;

const LabelText = styled.Text`
  color: ${props => props.theme.color.grey.black};
  font-size: ${moderateScale(15)}px;
  margin-bottom: ${moderateScale(5)}px;
`;

const NicknameRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BirthDayRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextInputContainer = styled.View<{focused?: boolean}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.color.grey.white};
  border-color: ${props =>
    props.focused ? props.theme.color.blue.main : props.theme.color.grey.main};
  border-width: 1px;
  border-radius: ${moderateScale(30)}px;
  padding: ${moderateScale(10)}px;
`;

const StyledTextTextInput = styled.TextInput`
  flex: 1;
  margin-left: ${moderateScale(10)}px;
  color: ${props => props.theme.color.grey.black};
`;

const ClearButton = styled.TouchableOpacity`
  padding-horizontal: ${moderateScale(15)}px;
`;

const WithdrawalText = styled.Text`
  color: ${props => props.theme.color.red.warning};
  margin-top: ${moderateScale(40)}px;
`;

const Spacer = styled.View<{height: number}>`
  height: ${props => moderateScale(props.height)}px;
`;
