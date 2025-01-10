import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {MypageWithdrawProvider} from './Mypage.withdraw.context';
import MypageWithdrawContainer from './Mypage.withdraw.container';

export interface MypageWithdrawScreenProps {}

export const MypageWithdrawScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageWithdrawScreen'>) => {
  return (
    <MypageWithdrawProvider>
      <MypageWithdrawContainer />
    </MypageWithdrawProvider>
  );
};
