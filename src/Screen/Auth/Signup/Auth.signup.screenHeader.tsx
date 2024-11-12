import React from 'react';
import {ScreenHeader} from 'src/Component/View';
import {useSignupContext} from './Auth.signup.provider';

/**
 * 회원가입 화면 헤더입니다.
 * 각 단계에 따라 적절한 BackButton과 title을 설정합니다.
 * @auth 도형
 */
export const SignupScreenHeader = () => {
  const {step} = useSignupContext();

  let title;
  let showBackButton = true;

  switch (step) {
    case 'EMAIL':
      title = '회원가입';
      break;
    case 'AUTH_CODE':
      title = '이메일 확인';
      break;
    case 'NICKNAME':
      title = '정보 입력';
      break;
    case 'COMPLETE':
      title = undefined;
      showBackButton = false;
      break;
  }

  return (
    <ScreenHeader
      LeftComponents={showBackButton ? 'BACK_BUTTON' : undefined}
      title={title}
    />
  );
};
