import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Keyboard, View} from 'react-native';
import {ScrollViewPage} from '../../../../Component/Page';
import {SectionContainer} from '../../../../Unit/View';
import CommonTextFormField from '../../../../Component/CommonTextFormField';
import {useSignupContext} from '../Auth.signup.provider';
import CommonCompleteButton from '../../../Popup/Landing/common.complete.button';
import styled from 'styled-components/native';
import TermsAndPrivacyPolicyAgreement from '../../../../Component/PressableUnderlineText';
import {moderateScale} from '../../../../Util';

export function SignupEmailPage() {
  const {
    email,
    emailValid,
    password,
    passwordValid,
    updateInput,
    onPressEmailStepBottomButton,
  } = useSignupContext();

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const {isPending: codeSending, mutate: sendSignupAuthCode} = useMutation({
    mutationFn: onPressEmailStepBottomButton,
  });

  function handleEmailChange(email: string) {
    updateInput({email});
  }

  function handlePasswordChange(password: string) {
    updateInput({password});
  }

  function handlePasswordConfirmationChange(confirmPassword: string) {
    setPasswordConfirmation(confirmPassword);
  }

  async function handleSubmit() {
    Keyboard.dismiss();
    setShowErrors(true);
    if (emailValid && passwordValid && password === passwordConfirmation) {
      await sendSignupAuthCode();
    }
  }

  const isFormValid =
    emailValid && passwordValid && password === passwordConfirmation;

  return (
    <ScrollViewPage
      PageContent={
        <SectionContainer style={{marginTop: 30, justifyContent: 'flex-start'}}>
          <LabelText>이메일</LabelText>
          <CommonTextFormField
            onChangeText={handleEmailChange}
            placeholder="이메일 주소를 입력해주세요."
            keyboardType="email-address"
            errorText={
              showErrors && !emailValid
                ? '유효한 이메일을 입력해주세요.'
                : undefined
            }
          />
          <LabelText>비밀번호 설정</LabelText>
          <CommonTextFormField
            onChangeText={handlePasswordChange}
            secureTextEntry
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            isPasswordType={true}
            errorText={
              showErrors && !passwordValid
                ? '유효한 비밀번호를 입력해주세요.'
                : undefined
            }
          />
          <LabelText>비밀번호 확인</LabelText>
          <CommonTextFormField
            onChangeText={handlePasswordConfirmationChange}
            secureTextEntry
            placeholder="다시 한번 입력해주세요"
            isPasswordType={true}
            errorText={
              showErrors && password !== passwordConfirmation
                ? '비밀번호가 일치하지 않습니다.'
                : undefined
            }
          />
          <CommonCompleteButton
            style={{width: '100%', marginBottom: 20}}
            onPress={handleSubmit}
            title="다음"
            isDisabled={!isFormValid}
            loading={codeSending}
          />
          <TermsAndPrivacyPolicyAgreement
            onPrivacyPolicyPress={() => {}}
            onTermsOfServicePress={() => {}}
          />
        </SectionContainer>
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
