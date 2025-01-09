// src/screens/PasswordChange/PasswordChangeScreen.tsx
import React from 'react';
import {ScreenHeader} from 'src/Component/View';
import {MypagePasswordChangeContainer} from './Mypage.password.change.container';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {MypagePasswordChangeProvider} from './Mypage.password.change.context';

export interface MypagePasswordChangeScreenProps {}
export function MypagePasswordChangeScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypagePasswordChangeScreen'>) {
  return (
    <MypagePasswordChangeProvider>
      <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'비밀번호 변경'} />
      <MypagePasswordChangeContainer />
    </MypagePasswordChangeProvider>
  );
}
