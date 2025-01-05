// src/Screen/Review/ReviewListContainer.tsx
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {NavigationProp} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';

import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';

import Filter from 'src/Resource/svg/filter.svg';
import {CompleteReviewCard} from 'src/Component/MyPage/Review/Mypage.complete.review.poupupCard';
import {mockPopupData} from './Mypage.complete.review.list.context';
interface CompleteReviewContainerProps {
  navigation: NavigationProp<AppStackProps, 'MypageCompleteReviewListScreen'>;
}

export const CompleteReviewContainer: React.FC<
  CompleteReviewContainerProps
> = ({navigation}) => {
  //TODO-[규진] 산아형 다 끝나면 할
  // const {completeReviews, isLoading, error} = useComplete();
  const [isLastest, setIsLastest] = useState(true);
  const {} = usePopupStore();

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'작성 완료 후기'} />
      }
      PageContent={
        <ContentContainer>
          <InfoSection>
            <InfoContainer>
              <TotalReviewText>총 n개</TotalReviewText>
              <ToggleFilter onPress={() => setIsLastest(prev => !prev)}>
                <FilterText>{isLastest ? '최신순' : '오래된 순'}</FilterText>
                <Filter width={13} height={13} />
              </ToggleFilter>
            </InfoContainer>
          </InfoSection>
          <ReviewListSection>
            {mockPopupData && mockPopupData.length > 0 ? (
              mockPopupData.map((popup, index) => (
                <CompleteReviewCard
                  key={index}
                  isVerified={true}
                  storeName={popup.name}
                  date={popup.closeDate}
                  imageUrl={popup.mainImageUrl}
                  onPress={() =>
                    navigation.navigate('MypageReviewDetailScreen', {
                      id: popup.id,
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
  padding: ${moderateScale(20)}px;
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

const ToggleFilter = styled.TouchableOpacity`
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
