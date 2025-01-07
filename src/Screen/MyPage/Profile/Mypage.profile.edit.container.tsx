// src/screens/MyProfileEdit/MyProfileEditContainer.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import GallerySvg from 'src/Resource/svg/gallery-icon.svg';
import CloseIcon from 'src/Resource/svg/closeGray.svg';
import RightSvg from 'src/Resource/svg/right-arrow-black-icon.svg';
import {getGalleryImages, moderateScale} from 'src/Util';
import PoppinCirclePng from 'src/Resource/png/app-logo.png';
import styled from 'styled-components/native';
import RequiredTextLabel from 'src/Component/RequiredTextLabel';
import {useProfileEdit} from './Mypage.profile.edit.context';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {Asset} from 'react-native-image-picker';

// 통합 이미지 소스 타입 정의
export type UnifiedImageSource = ImageSourcePropType | string | {uri: string};
// 스타일드 컴포넌트로 FastImage 확장

export function MyProfileEditContainer() {
  const context = useProfileEdit();
  const [nickName, setNickname] = useState<string>(context.nickname);
  const [profileImage, setProfileImage] = useState<string | null | undefined>(
    context.profileImage,
  );
  //TODO-[규진] 프로필 수정 로직 구현
  const handleGalleryImage = async () => {
    try {
      const images = await getGalleryImages({sectionLimit: 1});
      if (images && images.length > 0) {
        console.log(images[0].uri);
        setProfileImage(images[0].uri);
      }
    } catch (error) {
      console.error('Gallery image selection failed:', error);
    }
  };
  return (
    <ProfileContainer>
      <ImageContainer>
        {profileImage ? (
          <ProfileImage source={{uri: profileImage}} />
        ) : (
          <ProfileImage source={PoppinCirclePng} />
        )}
        <GalleryButton onPress={handleGalleryImage}>
          <GallerySvg />
        </GalleryButton>
      </ImageContainer>

      <PreferenceButton onPress={() => console.log('g')}>
        <PreferenceText>취향 설정</PreferenceText>
      </PreferenceButton>

      <EmailContainer>
        <LabelText>
          {['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(
            context.socialMediaType,
          )
            ? '이메일'
            : '아이디'}
        </LabelText>
        <EmailTextInputWrapper>
          {/* {emailIcon && <SocialIcon source={emailIcon} />} */}
          <EmailTextInput value={'test@poppin.com'} editable={false} />
        </EmailTextInputWrapper>

        <Spacer height={30} />
        <RequiredTextLabel label={'닉네임'} />
        <NicknameRow>
          {/* onFocused 추가하면 좋을 듯 */}
          <TextInputContainer>
            <StyledTextTextInput value={nickName} onChangeText={setNickname} />
            <ClearButton
              onPress={() => {
                console.log('클릭 시 nickName 삭제');
              }}>
              <CloseIcon />
            </ClearButton>
          </TextInputContainer>
        </NicknameRow>
        <Spacer height={30} />

        {/* TODO-[규진] 생년 월일 백엔드 되면 추가 개발 */}
        {/* <RequiredTextLabel label={'생년 월일'} /> */}
        {/* <BirthDayRow>
          <TextInputContainer >
            <StyledTextTextInput
              value={user}
            />ㄱr
          </TextInputContainer>
        </BirthDayRow> */}
        {!['KAKAO', 'NAVER', 'GOOGLE', 'APPLE'].includes(
          context.socialMediaType,
        ) && (
          <PasswordChangeView>
            <PasswordText>비밀번호 변경</PasswordText>
            <RightSvg width={20} height={20} />
          </PasswordChangeView>
        )}
        <WithdrawalText>회원 탈퇴</WithdrawalText>
      </EmailContainer>
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

const ProfileImage = styled.Image`
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
const PasswordChangeView = styled.View`
  margin-top: ${moderateScale(15)};
  flex-direction: row;
  justify-content: space-between;
`;

const PasswordText = styled.Text`
  ${props => props.theme.color.grey.black};
  flex: 1;
`;

const WithdrawalText = styled.Text`
  color: ${props => props.theme.color.red.warning};
  margin-top: ${moderateScale(20)}px;
`;

const Spacer = styled.View<{height: number}>`
  height: ${props => moderateScale(props.height)}px;
`;
