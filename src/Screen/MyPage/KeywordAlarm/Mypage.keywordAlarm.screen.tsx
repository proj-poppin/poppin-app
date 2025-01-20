// src/Screen/Review/ReviewListScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {KeywordAlarmProvider} from './Mypage.keywordAlarm.context';
import KeywordAlarmContainer from './Mypage.keywordAlarm.container';

export interface MypageKeywordAlarmScreenProps {}
export function MypageKeywordAlarmScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageKeywordAlarmScreen'>) {
  return (
    <KeywordAlarmProvider>
      <KeywordAlarmContainer navigation={navigation} />
    </KeywordAlarmProvider>
  );
}
