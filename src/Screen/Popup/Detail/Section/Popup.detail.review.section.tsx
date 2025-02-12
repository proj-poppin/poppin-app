import React, {useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import styled from 'styled-components/native';
import {SectionContainer} from '../../../../Unit/View';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {usePopupDetailReviewContext} from '../Provider/Popup.detail.review.provider';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';
import {themeColors} from '../../../../Theme/theme';
import {deviceWidth, moderateScale} from '../../../../Util';
import {useUserStore} from '../../../../Zustand/User/user.zustand';
import SvgWithNameBoxLabel from '../../../../Component/SvgWithNameBoxLabel';
import ReviewWriteCheckIcon from 'src/Resource/svg/review-write-check-icon.svg';
import FastImage from 'react-native-fast-image';
import ReviewProfileSvg from 'src/Resource/svg/default-app-logo-icon.svg';
import VerifiedReviewSvg from 'src/Resource/svg/verified-review-check-icon.svg';
import LikeReviewSvg from 'src/Resource/svg/review-like-icon.svg';
import PurpleCheckSelectionRow from '../../../../Component/Purple.Selection.Component';
import {EnumValueWithName} from '../../../../Object/Type/enum.type';
import {BlankDropdown} from '../../../../Component/Dropdown';
import UnderlinedTextButton from '../../../../Component/UnderlineTextButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../../Navigator/App.stack.navigator';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import shallow from 'zustand/shallow';
import {usePopupStore} from '../../../../Zustand/Popup/popup.zustand';

const RECENT_REVIEW_ORDER: EnumValueWithName = {displayName: '최근 작성 순', value: 'latest'}
const RECOMMEND_REVIEW_ORDER: EnumValueWithName = {displayName: '추천 순', value: 'recommend'}

const REVIEW_ORDER_TYPES: EnumValueWithName[] = [
  RECENT_REVIEW_ORDER,
  RECOMMEND_REVIEW_ORDER,
];

const ItemSeparatorComponent = () => {
  return (
    <View
      style={{
        height: moderateScale(1),
        backgroundColor: '#e7e7e7',
        marginVertical: moderateScale(16),
      }}
    />
  );
};

export const PopupDetailReviewSection = () => {
  const user = useUserStore(state => state.user);
  const {isVisitedPopup, isWaitingPopup, waitingPopups, startWaitingPopup} =
    usePopupStore(
      state => ({
        isVisitedPopup: state.isVisitedPopup,
        isWaitingPopup: state.isWaitingPopup,
        waitingPopups: state.waitingPopups,
        startWaitingPopup: state.startWaitingPopup,
      }),
      shallow,
    );
  const {showAppModal} = useAppStore(
          state => ({
            showAppModal : state.showAppModal,
          }),
          shallow,
      );
  const {popupDetail} = usePopupDetailContext();
  const {recommendReview} = usePopupDetailReviewContext();
  const {review} = popupDetail;
  const reviews = review || [];
  const [reviewFilterSelection,setReviewFilterSelection] = useState<EnumValueWithName>(REVIEW_ORDER_TYPES[0])

  const visited = isVisitedPopup(popupDetail.id);

  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  // 인증된 사용자 후기만 보기 상태
  const [isOnlyVerifiedReview, setIsOnlyVerifiedReview] = useState(false);

  // 리뷰 추천 상태
  const [recommendedReviews, setRecommendedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const navigateToReviewWriteScreen = () => {
    if (!checkLoginAndShowModal('POPUP_REVIEW')) {
      return;
    }
    navigation.navigate('MypageReviewWriteScreen', {
      selectedPopup: popupDetail,
      isVisited: visited,
    });
  };

  const toggleReviewText = (reviewId: string) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const getDisplayedText = (text: string, isExpanded: boolean) =>
    isExpanded ? text : text.length <= 80 ? text : `${text.substring(0, 80)}...`;

  const handleIsOnlyVerifiedReview = () => {
    setIsOnlyVerifiedReview(prev => !prev); // 인증된 리뷰만 보기 토글
  };

  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
    shallow,
  );

  //TODO - fp-ts, pipe 써서 함수형 프로그래밍으로 데이터 변환

  // 인증된 사용자 후기만 보기 상태에 따라 리뷰 필터링
  const filteredReviews = isOnlyVerifiedReview
    ? reviews.filter(review => review.isCertificated)
    : [...reviews];

  // 기본으로 최신순 정렬, 추천순으로했을때 추천수가 같으면 기본적으로 최신순으로 하기 위함
  const reverseReviews = filteredReviews.reverse()

  // 선택한 오더 타입에 따른 리뷰 정렬
  const orderedReviews = reviewFilterSelection.value === RECENT_REVIEW_ORDER.value
    ? reverseReviews
    : reverseReviews.sort((prev,next) => next.recommendCnt - prev.recommendCnt)


  // 리뷰 추천 핸들링
  const handleRecommendReview = async (popupId: number, reviewId: number) => {
    try {
      // 이미 추천된 리뷰는 요청하지 않음
      if (recommendedReviews[reviewId]) {
        return;
      }

      const response = await recommendReview(popupId, reviewId);

      // 추천 성공 시에만 UI 상태 업데이트
      if (response?.success) {
        setRecommendedReviews(prev => ({
          ...prev,
          [reviewId]: true,
        }));
      }
    } catch (error) {
      console.error('추천 처리 중 오류:', error);
    }
  };

  const handleReportReview = (reviewId?:string) => {
      if (!checkLoginAndShowModal('POPUP_REPORT')) {
        return;
      }
    navigation.navigate('PopupDetailReportScreen', {reviewId});
  };

  return (
    <SectionContainer>
      {popupDetail.operationStatus === 'OPERATING' && (
        <SectionRow>
          <ReviewDataTitle>방문후기</ReviewDataTitle>
          <SvgWithNameBoxLabel
            onPress={navigateToReviewWriteScreen}
            textStyle={[
              {fontSize: moderateScale(13)},
              {marginRight: moderateScale(5)},
            ]}
            width={moderateScale(150)}
            height={moderateScale(33)}
            Icon={ReviewWriteCheckIcon}
            label={visited ? '인증후기 작성하기' : '일반후기 작성하기'}
          />
        </SectionRow>
      )}

      <SectionRow style={{marginTop: moderateScale(10)}}>
        <PurpleCheckSelectionRow
          isSelected={isOnlyVerifiedReview}
          label="인증된 방문자 후기만 보기"
          onClicked={handleIsOnlyVerifiedReview}
        />
        <BlankDropdown
          buttonStyle={{width: moderateScale(120)}}
          data={REVIEW_ORDER_TYPES}
          onSelect={(selectedItem, index) => {setReviewFilterSelection(selectedItem)}}
        />
      </SectionRow>

      {orderedReviews.length > 0 ? (
          orderedReviews.map(review => {
          const isExpanded = expandedReviews[review.reviewId] || false; // Fixed variable name
          const shouldShowMoreButton = review.text.length > 20;

          return (
            <ReviewContainer key={review.reviewId}>
              <RowBetween>
                <RecentReviewHeader>
                  <ReviewProfileSvg />
                  <Column style={{marginLeft: moderateScale(10)}}>
                    <Row>
                      <NicknameText>{review.nickname}</NicknameText>
                      {review.isCertificated && (
                        <VerifiedReviewSvg
                          style={{marginLeft: moderateScale(5)}}
                        />
                      )}
                    </Row>
                    <ReviewMetaText>리뷰 {reviews.length}개</ReviewMetaText>
                  </Column>
                </RecentReviewHeader>
                <UnderlinedTextButton
                  label="신고하기"
                  onClicked={() => handleReportReview(review.reviewId.toString())}
                />
              </RowBetween>

              <HorizontalScrollView horizontal>
                {review.imageUrls.map((url, index,urls) => (
                    <Pressable
                        key={index}
                      onPress={() => showAppModal('POPUP_REVIEW_IMAGE',{appModalImageUrls:[...urls],appModalImageIndex:index})}
                    >
                      <ReviewImage key={index} source={{uri: url}} />
                    </Pressable>
                ))}
              </HorizontalScrollView>

              <ReviewMetaText>
                {getDisplayedText(review.text, isExpanded)}
              </ReviewMetaText>

              {shouldShowMoreButton && (
                <UnderlinedTextButton
                  label={isExpanded ? '접기' : '더보기'}
                  onClicked={() => toggleReviewText(review.reviewId.toString())}
                />
              )}

              <RecommendContainer>
                <SvgWithNameBoxLabel
                  onPress={() => {
                    if (!checkLoginAndShowModal('REVIEW_LIKE')) {
                      return;
                    }
                    handleRecommendReview(
                      Number(popupDetail.id),
                      review.reviewId,
                    );
                  }}
                  isCompleted={!!recommendedReviews[review.reviewId]}
                  textStyle={[{fontSize: moderateScale(13)}]}
                  borderRadius={15}
                  width={55}
                  height={30}
                  Icon={LikeReviewSvg}
                  iconStyle={{transform: [{scale: 0.9}]}}
                  label={`${
                    review.recommendCnt +
                    (recommendedReviews[review.reviewId] ? 1 : 0)
                  }`}
                />
              </RecommendContainer>
            </ReviewContainer>
          );
        })
      ) : (
        <NoReviewText>작성된 후기가 없습니다.</NoReviewText>
      )}
    </SectionContainer>
  );
};

// Styled Components
const SectionRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ReviewDataTitle = styled(BodyLargeText)`
  color: ${({theme}) => themeColors().purple.main};
  font-weight: 600;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(14)}px;
`;

const ReviewContainer = styled.View`
  flex-direction: column;
  margin-vertical: ${moderateScale(10)}px;
`;

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RecentReviewHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(10)}px;
`;

const Column = styled.View`
  flex-direction: column;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NicknameText = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;

const ReviewMetaText = styled.Text`
  font-size: ${moderateScale(14)}px;
  margin-vertical: ${moderateScale(5)}px;
`;

const HorizontalScrollView = styled(ScrollView)`
  margin-vertical: ${moderateScale(10)}px;
`;

const ReviewImage = styled(FastImage)`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  margin-right: ${moderateScale(10)}px;
  border-radius: ${moderateScale(12)}px;
`;

const RecommendContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const NoReviewText = styled.Text`
  text-align: center;
  margin-top: ${moderateScale(20)}px;
`;

export default PopupDetailReviewSection;
