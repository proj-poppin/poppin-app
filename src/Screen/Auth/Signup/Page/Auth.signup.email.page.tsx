import React from 'react';
import {Keyboard, Text, View} from 'react-native';
import {ScrollViewPage} from '../../../../Component/Page';
import {useSignupContext} from '../Auth.signup.provider';
import {useMutation} from '@tanstack/react-query';
import {SectionContainer} from '../../../../Unit/View';
import {BorderedTextInputV2} from '../../../../Component/TextInput';
import {RadiusButtonV2} from '../../../../Component/Button/RadiusButton.v2';

export function SignupEmailPage() {
  const {
    email,
    emailValid,
    emailInputRef,
    updateInput,
    onPressEmailStepBottomButton,
  } = useSignupContext();

  const {isPending: codeSending, mutate: sendAuthCode} = useMutation({
    mutationFn: onPressEmailStepBottomButton,
  });

  function onChangeEmail(email: string) {
    updateInput({email});
  }

  function onSubmit() {
    Keyboard.dismiss();
    sendAuthCode();
  }
  return (
    <ScrollViewPage
      PageContent={
        <SectionContainer>
          <BorderedTextInputV2
            ref={emailInputRef}
            color={'PURPLE'}
            active={emailValid}
            headerText={'이메일 주소'}
            props={{
              value: email,
              onChangeText: onChangeEmail,
              keyboardType: 'email-address',
              editable: !codeSending,
              onSubmitEditing: onSubmit,
            }}
          />
        </SectionContainer>
      }
      BottomPart={
        <SectionContainer>
          <RadiusButtonV2
            color={'PURPLE'}
            priority={'PRIMARY'}
            text={'인증번호 받기'}
            onPress={onSubmit}
            loading={codeSending}
            loadingText={'이메일 전송 중'}
          />
        </SectionContainer>
      }
    />
  );
}
