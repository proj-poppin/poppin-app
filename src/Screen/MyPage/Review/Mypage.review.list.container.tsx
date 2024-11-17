// src/Screen/Review/ReviewListContainer.tsx
import React from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {NavigationProp} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';
import LinearGradient from 'react-native-linear-gradient';
import CheckIcon from 'src/Resource/svg/check_circle.svg';
import {BeforeReviewPopupCard} from 'src/Component/MyPage/Review/Mypage.before.review.popupCard';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import CommonCompleteButton from 'src/Screen/Popup/Landing/common.complete.button';
import {useReviewListContext} from './Mypage.review.list.context';

interface ReviewListContainerProps {
  navigation: NavigationProp<AppStackProps, 'MypageReviewListScreen'>;
}

export const ReviewListContainer: React.FC<ReviewListContainerProps> = ({
  navigation,
}) => {
  const {visitedPopups, isLoading, error} = useReviewListContext();
  const {} = usePopupStore();

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'후기 작성하기'} />
      }
      PageContent={
        <ContentContainer>
          <InfoSection>
            <InfoContainer>
              <CheckIcon width={26} height={26} />
              <InfoTitle>인증된 후기</InfoTitle>
            </InfoContainer>

            <InfoDescription>
              목록에는 '방문 인증이 된' 팝업만 나타납니다.{'\n'}
              일반 후기를 남기고 싶으시다면 하단 버튼을 이용해 주세요.
            </InfoDescription>
          </InfoSection>

          <ReviewListSection>
            {isLoading ? (
              <EmptyText>로딩중...</EmptyText>
            ) : error ? (
              <EmptyText>{error}</EmptyText>
            ) : visitedPopups.length > 0 ? (
              visitedPopups.map(popup => (
                <BeforeReviewPopupCard
                  key={popup.id}
                  popup={popup}
                  showWriteButton={true}
                  onPress={() => {
                    navigation.navigate('MyPageReviewWriteScreen', {
                      isVisited: true,
                      selectedPopup: popup,
                    });
                  }}
                />
              ))
            ) : (
              <EmptyText>방문 인증된 후기가 없습니다.</EmptyText>
            )}
          </ReviewListSection>
        </ContentContainer>
      }
      BottomPart={
        <>
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: moderateScale(250),
            }}
          />
          <CommonCompleteButton
            title={'일반 후기 작성하기'}
            onPress={() => {
              navigation.navigate('MyPageReviewWriteScreen', {
                isVisited: false,
              });
            }}
          />
        </>
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
`;

const InfoIcon = styled.Text`
  color: ${props => props.theme.color.blue.main};
  font-size: ${moderateScale(24)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const InfoTitle = styled.Text`
  margin-left: ${moderateScale(8)}px;
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(8)}px;
`;

const InfoDescription = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.main};
  line-height: ${moderateScale(20)}px;
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

export const ReviewItem = styled.View`
  flex-direction: row;
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.grey.mild};
`;

export const StoreImage = styled.Image`
  width: ${moderateScale(96)}px;
  height: ${moderateScale(96)}px;
  border-radius: ${moderateScale(8)}px;
  margin-right: ${moderateScale(16)}px;
  background-color: ${props => props.theme.color.grey.white};
`;

export const ReviewContent = styled.View`
  flex: 1;

  justify-content: space-between;
`;

export const nameContainer = styled.View`
  width: 70%;
`;
export const name = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(4)}px;
`;

export const ReviewDate = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.main};
  margin-bottom: ${moderateScale(8)}px;
`;

const WriteReviewButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: ${moderateScale(8)}px ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${props => props.theme.color.purple.mild};
`;

const WriteReviewText = styled.Text`
  color: ${props => props.theme.color.purple.main};
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color.blue.main};
  align-self: center;
  width: 90%;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(24)}px;
  align-items: center;
  margin-top: ${moderateScale(20)}px;
`;

export const SubmitButtonText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;

export default ReviewListContainer;
