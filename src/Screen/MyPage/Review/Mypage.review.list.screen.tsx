// src/Screen/Review/ReviewListScreen.tsx
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ReviewProvider} from './Mypage.review.list.context';
import ReviewListContainer from './Mypage.review.list.container';

export interface MypageReviewListScreenProps {}
export function MypageReviewListScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MypageReviewListScreen'>) {
  return (
    <ReviewProvider>
      <ReviewListContainer navigation={navigation} />
    </ReviewProvider>
  );
}
