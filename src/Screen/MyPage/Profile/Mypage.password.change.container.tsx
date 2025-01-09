import React, {useState} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import GrayEyeIcon from 'src/Resource/svg/password-watch-gray-icon.svg';
import BlueEyeIcon from 'src/Resource/svg/password-watch-blue-icon.svg';

import {useUserStore} from 'src/Zustand/User/user.zustand';
import CommonCompleteButton from 'src/Screen/Popup/Landing/common.complete.button';
import {usePasswordChange} from './Mypage.password.change.context';
import CheckIcon from 'src/Resource/svg/check-icon.svg';
import CheckBlueIcon from 'src/Resource/svg/check-blue-icon.svg';
import WarningIcon from 'src/Resource/svg/x-icon.svg';
import {MypagePasswordChange} from './Mypage.password.change.modal';

interface StyledProps {
  $checked?: boolean; // transient prop을 위한 옵션
}

export function MypagePasswordChangeContainer() {
  const user = useUserStore(state => state.user);
  const {
    isModalVisible,
    modalMessage,
    handleModalClose,
    isFailed,
    currentPassword,
    newPassword,
    confirmPassword,
    currentPasswordVisible,
    newPasswordVisible,
    confirmPasswordVisible,
    step,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    toggleCurrentPasswordVisible,
    toggleNewPasswordVisible,
    toggleConfirmPasswordVisible,
    handleCurrentPasswordSubmit,
    handleNewPasswordSubmit,
    isValidNewPassword,
    passwordConditions,
    isPasswordMatch,
  } = usePasswordChange();

  if (step === 'current') {
    return (
      <Container>
        <ContentContainer>
          <MainContent>
            <TitleText>{'POPPIN 계정의\n비밀번호를 변경해주세요'}</TitleText>
            <InputSection>
              <InputLabel>아이디</InputLabel>
              <DisabledInput value={user.email} editable={false} />

              <InputLabel>현재 비밀번호</InputLabel>
              <PasswordInputWrapper>
                <PasswordInput
                  placeholder="현재 비밀번호를 입력해주세요"
                  secureTextEntry={!currentPasswordVisible}
                  placeholderTextColor="#999"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <EyeButton onPress={toggleCurrentPasswordVisible}>
                  {currentPasswordVisible ? <BlueEyeIcon /> : <GrayEyeIcon />}
                </EyeButton>
              </PasswordInputWrapper>
              {isFailed ? (
                <WarningTextWrapper>
                  <WarningIcon />
                  <WarningText> 잘못된 비밀번호입니다.</WarningText>
                </WarningTextWrapper>
              ) : null}
            </InputSection>
          </MainContent>
          <ButtonContainer>
            <CommonCompleteButton
              title={'다음'}
              onPress={handleCurrentPasswordSubmit}
              isDisabled={!currentPassword}
            />
          </ButtonContainer>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <>
      <MypagePasswordChange
        isVisible={isModalVisible}
        message={modalMessage}
        onClose={handleModalClose}
      />
      <Container>
        <ContentContainer>
          <MainContent>
            <TitleText>{'POPPIN 계정의\n비밀번호를 변경해주세요'}</TitleText>
            <InputSection>
              <InputLabel>아이디</InputLabel>
              <DisabledInput value={user.email} editable={false} />
              <InputLabel>새 비밀번호</InputLabel>
              <PasswordInputWrapper>
                <PasswordInput
                  placeholder="영문/숫자/특수문자 8자 이상"
                  secureTextEntry={!newPasswordVisible}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <EyeButton onPress={toggleNewPasswordVisible}>
                  {newPasswordVisible ? <BlueEyeIcon /> : <GrayEyeIcon />}
                </EyeButton>
              </PasswordInputWrapper>
              <ConditionList>
                <ConditionItem $checked={passwordConditions.hasLetterAndNumber}>
                  {passwordConditions.hasLetterAndNumber ? (
                    <CheckBlueIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  <CheckText $checked={passwordConditions.hasLetterAndNumber}>
                    영문/숫자
                  </CheckText>
                </ConditionItem>
                <ConditionItem $checked={passwordConditions.hasSpecialChar}>
                  {passwordConditions.hasSpecialChar ? (
                    <CheckBlueIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  <CheckText $checked={passwordConditions.hasSpecialChar}>
                    특수문자
                  </CheckText>
                </ConditionItem>
                <ConditionItem $checked={passwordConditions.hasMinLength}>
                  {passwordConditions.hasMinLength ? (
                    <CheckBlueIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  <CheckText $checked={passwordConditions.hasMinLength}>
                    8자 이상
                  </CheckText>
                </ConditionItem>
              </ConditionList>

              <InputLabel>새 비밀번호 확인</InputLabel>
              <PasswordInputWrapper>
                <PasswordInput
                  placeholder="비밀번호 확인"
                  secureTextEntry={!confirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <EyeButton onPress={toggleConfirmPasswordVisible}>
                  {confirmPasswordVisible ? <BlueEyeIcon /> : <GrayEyeIcon />}
                </EyeButton>
              </PasswordInputWrapper>
              <ConditionItem $checked={isPasswordMatch}>
                {isPasswordMatch ? <CheckBlueIcon /> : <CheckIcon />}
                <CheckText $checked={isPasswordMatch}>비밀번호 일치</CheckText>
              </ConditionItem>
            </InputSection>
          </MainContent>
          <ButtonContainer>
            <CommonCompleteButton
              title={'완료'}
              onPress={handleNewPasswordSubmit}
              isDisabled={!isValidNewPassword()}
            />
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.grey.white};
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const MainContent = styled.View`
  padding: ${moderateScale(24)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(24)}px;
  font-weight: 600;
  line-height: ${moderateScale(34)}px;
  margin-bottom: ${moderateScale(40)}px;
  color: ${props => props.theme.color.grey.black};
`;

const InputSection = styled.View`
  gap: ${moderateScale(16)}px;
`;

const InputLabel = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
  margin-bottom: ${moderateScale(8)}px;
`;

const DisabledInput = styled.TextInput`
  background-color: ${props => props.theme.color.grey.component};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

const PasswordInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.color.grey.component};
  border-radius: ${moderateScale(24)}px;
`;

const ButtonContainer = styled.View`
  padding: ${moderateScale(24)}px;
`;

const PasswordInput = styled.TextInput`
  flex: 1;
  padding: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.black};
`;

const WarningTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const WarningText = styled.Text`
  color: ${props => props.theme.color.red.warning};
`;
const EyeButton = styled.TouchableOpacity`
  padding: ${moderateScale(16)}px;
`;

const ConditionList = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${moderateScale(8)}px;
  gap: ${moderateScale(4)}px;
`;

const ConditionItem = styled.View<StyledProps>`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(4)}px;
  opacity: ${({$checked}) => ($checked ? 1 : 0.5)};
`;

const CheckText = styled.Text<StyledProps>`
  color: ${({$checked, theme}) =>
    $checked ? theme.color.blue.main : theme.color.grey.main};
  font-size: ${moderateScale(12)}px;
`;
