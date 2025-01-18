import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../../Util';
import ReviewCompleteIcon from '../../../../Resource/svg/review-write-complete-icon.svg';
import ReviewWriteReadyIcon from '../../../../Resource/svg/review-write-ready-icon.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import shallow from 'zustand/shallow';
export const MyPageLandingReviewSection = () => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const user = useUserStore(state => state.user);

  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
    shallow,
  );
  const onPressReviewWriteButton = () => {
    if (!checkLoginAndShowModal('POPUP_REVIEW')) {
      return;
    }
    navigation.navigate('MypageReviewListScreen', {});
  };
  const onPressReivewListButton = () => {
    if (!checkLoginAndShowModal('POPUP_REVIEW')) {
      return;
    }
    navigation.navigate('MypageCompleteReviewListScreen', {});
  };

  return (
    <ReviewsContainer>
      <ReviewItem onPress={() => onPressReviewWriteButton()}>
        <ReviewLabel>후기 작성하기</ReviewLabel>
        <ReviewIconRowContainer>
          <ReviewWriteReadyIcon />
          <ReviewReadyNumber>{user.visitedPopupCnt}</ReviewReadyNumber>
        </ReviewIconRowContainer>
      </ReviewItem>
      <Divider />
      <ReviewItem onPress={() => onPressReivewListButton()}>
        <ReviewLabel>작성 완료한 후기</ReviewLabel>
        <ReviewIconRowContainer>
          <ReviewCompleteIcon />
          <ReviewCompleteNumber>{user.writtenReview}</ReviewCompleteNumber>
        </ReviewIconRowContainer>
      </ReviewItem>
    </ReviewsContainer>
  );
};

const ReviewsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-vertical: ${moderateScale(8)}px;
  margin-top: ${moderateScale(16)}px;
`;
const ReviewIconRowContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${moderateScale(12)}px;
`;
const ReviewItem = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
`;

const ReviewReadyNumber = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(2)}px;
  margin-left: ${moderateScale(4)}px;
  color: ${theme => theme.theme.color.blue.main};
`;
const ReviewCompleteNumber = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(2)}px;
  margin-left: ${moderateScale(4)}px;
`;

const ReviewLabel = styled.Text`
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
`;

const Divider = styled.View`
  width: 1px;
  height: ${moderateScale(40)}px;
  background-color: #e0e0e0;
`;
