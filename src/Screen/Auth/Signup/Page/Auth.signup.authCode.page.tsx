import React, {useState} from 'react';
import {FullViewPage} from '../../../../Component/Page';
import ResendButton from '../../../../Component/ResendButton';
import {moderateScale} from '../../../../Util';
import {SectionContainer} from '../../../../Unit/View';
import styled from 'styled-components/native';
import CommonTextFormField from '../../../../Component/CommonTextFormField';
import {useSignupContext} from '../Auth.signup.provider';
import {useMutation} from '@tanstack/react-query';
import CommonCompleteButton from '../../../Popup/Landing/common.complete.button';

export function SignupAuthCodePage() {
  const {verifyAuthCode, onPressAuthCodeResendButton, goNextStep} =
    useSignupContext();

  const [authCode, setAuthCode] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false); // Track if code is entered
  const [authCodeIncorrect, setAuthCodeIncorrect] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {mutate: verifyCode, isPending: verifying} = useMutation({
    mutationFn: (authCode: string) => verifyAuthCode(authCode),
    onSuccess: isValid => {
      if (isValid) {
        goNextStep();
      } else {
        setAuthCodeIncorrect(true);
      }
    },
  });

  const handleAuthCodeChange = (code: string) => {
    setAuthCode(code);
    setIsCodeEntered(code.length > 5);
    setAuthCodeIncorrect(false);
  };

  const handleCompletePress = () => {
    if (authCode.length > 5) {
      verifyCode(authCode);
    }
  };

  const handleResendPress = async () => {
    setIsResending(true);
    await onPressAuthCodeResendButton();
    setIsResending(false);
  };

  return (
    <FullViewPage
      PageContent={
        <>
          <SectionContainer
            style={{
              marginTop: 15,
              justifyContent: 'flex-start',
              paddingBottom: moderateScale(20),
            }}>
            <ResendButton onPress={handleResendPress} isLoading={isResending} />
            <InternalContainer></InternalContainer>
            <LabelText>확인 코드 입력</LabelText>
            <CommonTextFormField
              onChangeText={handleAuthCodeChange}
              placeholder={'코드를 입력해 주세요'}
              isAuthCodeForm={true}
              errorText={
                authCodeIncorrect ? '인증 코드가 일치하지 않습니다.' : undefined
              }
            />
          </SectionContainer>
          <CommonCompleteButton
            title={'다음'}
            onPress={handleCompletePress}
            isDisabled={!isCodeEntered || verifying}
          />
        </>
      }
    />
  );
}

const InternalContainer = styled.View`
  margin-top: ${moderateScale(70)}px;
`;

const LabelText = styled.Text`
  color: black;
  font-size: ${moderateScale(18)}px;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 500;
`;
