import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import NormalReviewWriteScreen from './Mypage.review.normal.screen';
import {ReviewWriteProvider} from './Mypage.review.write.context';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import VisitedRivewWriteScreen from './Mypage.review.visited.screen';

/**
 * 마이 페이지 내부 리뷰 페이지
 * isVisited 여부에 따라서 NormalReviewWriteScreen과 VistiedReivewWriteScreen으로 다르게 렌더링한다.
 * @author 규진
 */
export interface MyPageReviewWriteScreenProps {
  isVisited: boolean;
  selectedPopup?: PopupSchema | undefined;
}

export function MyPageReviewWriteScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'MyPageReviewWriteScreen'>) {
  return (
    <ReviewWriteProvider>
      {route.params.isVisited ? (
        <VisitedRivewWriteScreen selectedPopup={route.params.selectedPopup} />
      ) : (
        <NormalReviewWriteScreen />
      )}
    </ReviewWriteProvider>
  );
}
