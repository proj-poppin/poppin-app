import React from 'react';
import {ScreenHeader} from 'src/Component/View';
import {useSignupContext, signupStepOrder} from './Auth.signup.provider';

/**
 * 회원가입 화면 헤더입니다.
 * @author 도형
 */
export const SignupScreenHeader = () => {
  const {step} = useSignupContext();

  return (
    <ScreenHeader
      // 이메일 인증 완료, 회원 가입 완료 단계에서는 뒤로 가기 버튼이 보여지지 않습니다.
      LeftComponents={
        step === 'EMAIL_VERIFY_COMPLETE' || step === 'COMPLETE'
          ? undefined
          : 'BACK_BUTTON'
      }
    />
  );
};
