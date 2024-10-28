import React from 'react';
import styled from 'styled-components/native';
import {SectionContainer} from 'src/Unit/View';
import {useSignupContext} from '../Auth.signup.provider';
import {moderateScale} from 'src/Util';

/**
 *
 * @auth 도형
 */
export function SignupGuideTextSection() {
  const {step} = useSignupContext();

  let text = '';

  if (step === 'EMAIL') {
    text = `POPPIN의 회원이 되어\n맞춤 팝업을 추천받아보세요!`;
  } else if (step === 'AUTH_CODE') {
    text = `회원님의 이메일로\n확인 코드를 전송했어요`;
  } else if (step === 'EMAIL_VERIFY_COMPLETE') {
    return null;
  }
  // else if (step === 'PASSWORD') {
  //   text = '비밀번호를 설정해주세요';
  // }
  else if (step === 'NICKNAME') {
    text = 'POPPIN에서\n사용할 정보를 알려주세요';
  } else if (step === 'COMPLETE') {
    // text = '본인 인증 하러 가볼까요?';
    return null;
  }

  if (!text) {
    return null;
  }

  return (
    <SectionContainer>
      <TitleText>{text}</TitleText>
    </SectionContainer>
  );
}

const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
  line-height: ${moderateScale(30)}px;
  text-align: center;
`;
