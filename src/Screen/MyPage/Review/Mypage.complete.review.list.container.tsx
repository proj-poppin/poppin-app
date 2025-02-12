// src/Screen/Review/ReviewListContainer.tsx
import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';
import Filter from 'src/Resource/svg/filter.svg';
import {CompleteReviewCard} from 'src/Component/MyPage/Review/Mypage.complete.review.poupupCard';
import {useReviewListContext} from './Mypage.complete.review.list.context';
import {EnumValueWithName} from 'src/Object/Type/enum.type';
import {BlankDropdown} from 'src/Component/Dropdown';

interface CompleteReviewContainerProps {}

const RECENT_REVIEW_ORDER: EnumValueWithName = {
  displayName: '최신순',
  value: 'latest',
};
const OLDEST_REVIEW_ORDER: EnumValueWithName = {
  displayName: '오래된 순',
  value: 'oldest',
};

const REVIEW_ORDER_TYPES: EnumValueWithName[] = [
  RECENT_REVIEW_ORDER,
  OLDEST_REVIEW_ORDER,
];

export const CompleteReviewContainer: React.FC<
  CompleteReviewContainerProps
> = () => {
  //TODO-[규진] 산아형 다 끝나면 할 일 - 생년월일 받기
  const [isLastest, setIsLastest] = useState(true);
  const [reviewFilterSelection, setReviewFilterSelection] =
    useState<EnumValueWithName>(REVIEW_ORDER_TYPES[0]);

  const context = useReviewListContext();
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  // 정렬된 리뷰 목록 계산
  const sortedReviews = useMemo(() => {
    if (!context.completeReviews) return [];

    return [...context.completeReviews].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      // 최신순 정렬
      if (reviewFilterSelection.value === RECENT_REVIEW_ORDER.value) {
        return dateB - dateA;
      }

      // 오래된 순 정렬
      if (reviewFilterSelection.value === OLDEST_REVIEW_ORDER.value) {
        return dateA - dateB;
      }

      return 0; // 기본값
    });
  }, [context.completeReviews, reviewFilterSelection]);

  const totalReviews = context.completeReviews?.length || 0;

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'작성 완료 후기'} />
      }
      PageContent={
        <ContentContainer>
          <InfoSection>
            <InfoContainer>
              <TotalReviewText>총 {totalReviews}개</TotalReviewText>
              <ToggleFilter
                buttonStyle={{width: moderateScale(100)}}
                data={REVIEW_ORDER_TYPES}
                onSelect={(selectedItem, index) => {
                  setReviewFilterSelection(selectedItem);
                }}
              />
            </InfoContainer>
          </InfoSection>
          <ReviewListSection>
            {sortedReviews.length > 0 ? (
              sortedReviews.map((popup, index) => (
                <CompleteReviewCard
                  key={popup.reviewId} // index 대신 고유 ID 사용
                  isVerified={popup.isCertified}
                  storeName={popup.name}
                  date={popup.createdAt}
                  imageUrl={popup.imageUrl}
                  onPress={() =>
                    navigation.navigate('MypageReviewDetailScreen', {
                      reviewId: popup.reviewId,
                    })
                  }
                />
              ))
            ) : (
              <EmptyText>작성 완료된 후기가 없습니다.</EmptyText>
            )}
          </ReviewListSection>
        </ContentContainer>
      }
    />
  );
};

const ContentContainer = styled.View`
  flex: 1;
  background-color: white;
  padding: ${moderateScale(12)}px;
`;

const InfoSection = styled.View`
  margin-bottom: ${moderateScale(24)}px;
`;

const InfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TotalReviewText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

const ToggleFilter = styled(BlankDropdown)`
  display: flex;
  flex-direction: row;
`;
const FilterText = styled.Text`
  font-size: ${moderateScale(16)}px;
  margin-right: ${moderateScale(6)}px;
`;

export const ReviewListSection = styled.View`
  flex: 1;
`;

export const EmptyText = styled.Text`
  margin-top: ${moderateScale(16)}px;
  text-align: center;
  font-size: ${moderateScale(16)}px;
  color: ${props => props.theme.color.grey.main};
`;

export default CompleteReviewContainer;
