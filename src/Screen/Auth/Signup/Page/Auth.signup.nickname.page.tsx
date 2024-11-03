import React from 'react';
import {FullViewPage} from '../../../../Component/Page';
import {SectionContainer} from '../../../../Unit/View';
import CommonTextFormField from '../../../../Component/CommonTextFormField';
import {useSignupContext} from '../Auth.signup.provider';
import CommonCompleteButton from '../../../Popup/Landing/common.complete.button';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import {useMutation} from '@tanstack/react-query';

export function SignupNicknamePage() {
  const {nickname, birthday, updateInput, onPressNicknameStepBottomButton} =
    useSignupContext();

  // Update nickname field using context
  function handleNicknameChange(nickname: string) {
    updateInput({nickname});
  }

  // Update birthday field using context
  function handleBirthdateChange(date: string) {
    updateInput({birthday: date});
  }

  // Validation for nickname and birthday
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 10;
  const isBirthdateValid = /^\d{4}\.\d{2}\.\d{2}$/.test(birthday);
  const isFormValid = isNicknameValid && isBirthdateValid;

  // Sign up mutation
  const {isPending: signingup, mutate: signup} = useMutation({
    mutationFn: onPressNicknameStepBottomButton,
  });

  return (
    <FullViewPage
      PageContent={
        <>
          <SectionContainer
            style={{
              marginTop: 30,
              justifyContent: 'flex-start',
              paddingBottom: moderateScale(20),
            }}>
            <LabelText>닉네임</LabelText>
            <CommonTextFormField
              onChangeText={handleNicknameChange}
              placeholder="한글/영문 10자 이하 공백포함"
              errorText={
                !isNicknameValid
                  ? nickname.length < 2
                    ? '2자 이상 입력해주세요.'
                    : '10자 이하로 입력해주세요.'
                  : undefined
              }
            />
            <LabelText>생년월일</LabelText>
            <CommonTextFormField
              onChangeText={handleBirthdateChange}
              placeholder="YYYY.MM.DD"
              errorText={
                !isBirthdateValid && birthday
                  ? '형식에 맞게 입력해주세요 (YYYY.MM.DD)'
                  : undefined
              }
            />
          </SectionContainer>

          <CommonCompleteButton
            title="완료"
            loading={signingup}
            onPress={signup}
            isDisabled={!isFormValid}
          />
        </>
      }
    />
  );
}

const LabelText = styled.Text`
  color: black;
  font-size: ${moderateScale(18)}px;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 500;
`;
