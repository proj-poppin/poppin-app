import React, {memo} from 'react';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import {moderateScale} from 'src/Util';
import {H4, BodyText, DetailText} from 'src/StyledComponents/Text';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {PopupReviewSchema} from '../../Schema/Popup/popupReview.schema';
import {PopupDetailModalType} from '../../Screen/Popup/Detail/Provider/Popup.detail.provider';
import {useAppStore} from '../../Zustand/App/app.zustand';
import {ThreeDotMenu} from '../Menu';
import {globalStyles} from '../../Style';

const areEqual = (
  prevProps: Readonly<{review: PopupReviewSchema}>,
  nextProps: Readonly<{review: PopupReviewSchema}>,
) => {
  return false;
};

/**
 * 팝업 리뷰 컴포넌트입니다. FlatList 의 renderItem 으로 사용됩니다.
 *
 * @param review 리뷰 정보
 * @param index 리뷰 순서 (첫번째가 아닌 경우 구분선 표시)
 * @author 도형
 */
export const ReviewComponent = memo(
  ({
    randomizeOffset,
    popupReviewAuthorId,
    review,
    showPopupDetailModal,
    setTargetReview,
  }: {
    randomizeOffset?: number;
    popupReviewAuthorId: string;
    review: PopupReviewSchema;
    showPopupDetailModal: (type: PopupDetailModalType) => void;
    setTargetReview: (target: PopupReviewSchema) => void;
  }) => {
    const checkLoginAndShowModal = useAppStore(
      state => state.checkLoginAndShowModal,
    );
    const {user, reportUser, userRelation, blockUser} = useUserStore(
      state => ({
        user: state.user,
        userRelation: state.userRelation,
        reportUser: state.reportUser,
        blockUser: state.blockUser,
      }),
      shallow,
    );

    const isPopupAuthor = user.id === popupReviewAuthorId;
    const isAuthorReview = popupReviewAuthorId === review.userId;
    const isReviewAuthor = user.id === review.userId;

    //* 리뷰 신고/차단 가능 여부
    //* 1. 본인 리뷰가 아니어야 함
    //* 2. 리뷰가 삭제되거나 차단되지 않음
    const reviewChoosable = !isReviewAuthor && !isAuthorReview;

    const isUserBlocked = userRelation.blockedUserIds.includes(review.userId);

    const onPressReport = () => {
      if (!checkLoginAndShowModal('POPUP_REPORT')) return;
      setTargetReview(review);
      showPopupDetailModal('REVIEW_REPORT');
    };

    const onPressReportUser = async () => {
      if (!checkLoginAndShowModal('REVIEW_REPORT')) return;
      await reportUser(review.userId.toString());
    };

    const onPressBlockUser = async () => {
      if (!checkLoginAndShowModal('REVIEW_REPORT')) return;
      await blockUser(review.userId);
    };

    return (
      <Container style={globalStyles.screen__horizontalPadding}>
        {/* 프로필 썸네일 */}
        <ThumbnailContainer>
          <ProfileThumbnail source={{uri: review.profileUrl}} />
        </ThumbnailContainer>

        <ReviewRightContainer>
          {/* 리뷰 헤더: 닉네임, 작성 시간 / 3점 메뉴 */}
          <ReviewHeaderContainer>
            <NicknameText>{review.nickname}</NicknameText>

            <ReviewHeaderInnerContainer>
              {reviewChoosable && (
                <ThreeDotMenu
                  triggerIconContainerStyle={{
                    width: moderateScale(16),
                    height: moderateScale(16),
                  }}
                  triggerIconStyle={{size: 16, color: '#999999'}}
                  menuOptions={[
                    {text: '신고하기', onSelect: onPressReport},
                    {text: '이 사용자 신고하기', onSelect: onPressReportUser},
                    {
                      text: '이 사용자의 글 보지 않기',
                      onSelect: onPressBlockUser,
                    },
                  ]}
                />
              )}
            </ReviewHeaderInnerContainer>
          </ReviewHeaderContainer>

          {/* 리뷰 내용 */}
          {review.text && <ReviewText>{review.text}</ReviewText>}

          {/* 리뷰 이미지 */}
          {review.imageUrls.length > 0 && (
            <ImageContainer>
              {review.imageUrls.map((url, index) => (
                <ReviewImage key={index} source={{uri: url}} />
              ))}
            </ImageContainer>
          )}
        </ReviewRightContainer>
      </Container>
    );
  },
  areEqual,
);

// 스타일 정의
const Container = styled.View`
  flex-direction: row;
`;

const ThumbnailContainer = styled.View`
  margin-right: ${moderateScale(8)}px;
`;

const ReviewRightContainer = styled.View`
  flex: 1;
`;

const ProfileThumbnail = styled.Image`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
`;

const ReviewHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NicknameText = styled(H4)`
  color: #77767e;
`;

const ReviewHeaderInnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReviewText = styled(BodyText)`
  color: #333;
  margin-top: ${moderateScale(8)}px;
`;

const ImageContainer = styled.View`
  margin-top: ${moderateScale(8)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReviewImage = styled.Image`
  width: ${moderateScale(60)}px;
  height: ${moderateScale(60)}px;
  margin-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;
