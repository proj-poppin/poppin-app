import React from 'react';
import {useSignupContext} from '../Auth.signup.provider';
import {SignupEmailPage} from './Auth.signup.email.page';
import {SignupAuthCodePage} from './Auth.signup.authCode.page';
import {SignupNicknamePage} from './Auth.signup.nickname.page';
import {SignupCompletePage} from './Auth.signup.complete.page';

export function SignupPage() {
  const {step} = useSignupContext();
  switch (step) {
    case 'EMAIL':
      return <SignupEmailPage />;
    case 'AUTH_CODE':
      return <SignupAuthCodePage />;
    case 'NICKNAME':
      return <SignupNicknamePage />;
    case 'COMPLETE':
      return <SignupCompletePage />;
  }
}
