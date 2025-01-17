// src/Screen/Review/ReviewListScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ReviewProvider} from './Mypage.review.list.context';
import {CompleteReviewContainer} from './Mypage.complete.review.list.container';
import {CompleteReviewProvider} from './Mypage.complete.review.list.context';

export interface MyPageCompleteReviewListScreenProps {}

export function MyPageCompleteReviewListScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageCompleteReviewListScreen'>) {
  return (
    <CompleteReviewProvider>
      <CompleteReviewContainer />
    </CompleteReviewProvider>
  );
}
