// src/Screen/Review/ReviewDetailScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {MypageReviewDetailProvider} from './Mypage.review.detail.context';
import MypageReviewDetailContainer from './Mypage.review.detail.container';

export interface ReviewDetailScreenProps {}

export function MypageReviewDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageReviewDetailScreen'>) {
  return (
    <MypageReviewDetailProvider>
      <MypageReviewDetailContainer />
    </MypageReviewDetailProvider>
  );
}
