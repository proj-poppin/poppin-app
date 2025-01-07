import React from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {
  moderateScale,
  parseCongestionToKorean,
  parseSatisfactionToKorean,
  parseVisitDateToKorean,
} from 'src/Util';
import {NavigationProp} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';
import {Image, View} from 'react-native';
import CheckIcon from 'src/Resource/svg/check_circle.svg';
import ChevronRight from 'src/Resource/svg/right-arrow-gray-icon.svg';
import {
  NormalBadge,
  NormalText,
  VerifiedBadge,
  VerifiedText,
} from 'src/Component/MyPage/Review/Mypage.complete.review.poupupCard';
import PoppinCirclePng from 'src/Resource/png/app-logo.png';

import {useReviewContext} from './Mypage.review.detail.context';

const MypageReviewDetailContainer: React.FC = () => {
  const {review, isLoading, error} = useReviewContext();

  if (isLoading) {
    return <InfoLabel> 로딩중... </InfoLabel>;
  }

  if (error || !review) {
    return <InfoLabel> 에러입니다. </InfoLabel>;
  }

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'작성 완료 후기'} />
      }
      PageContent={
        <Container>
          <StoreCard>
            <StoreImage source={{uri: review.posterUrl}} />
            <StoreInfo>
              <StoreName>{review.introduce}</StoreName>
              <VerificationBadge>
                {review.isCertified ? (
                  <VerifiedBadge>
                    <CheckIcon
                      width={moderateScale(16)}
                      height={moderateScale(16)}
                    />
                    <VerifiedText>방문 인증 후기</VerifiedText>
                  </VerifiedBadge>
                ) : (
                  <NormalBadge>
                    <NormalText>일반 후기</NormalText>
                  </NormalBadge>
                )}
              </VerificationBadge>
            </StoreInfo>
            <ChevronRight />
          </StoreCard>
          <UserInfoContainer>
            {review.profile ? (
              <UserImageInfo source={{uri: review.profile}} />
            ) : (
              <UserImageInfo source={PoppinCirclePng} />
            )}
            <UserTextInfo>
              <Nickname>{review.nickname}</Nickname>
              <DateText>
                {review.visitedAt ? `방문일 : ${review.visitedAt}\t` : null}
                작성일: {review.createdAt}
              </DateText>
            </UserTextInfo>
          </UserInfoContainer>
          <InfoSection>
            <InfoRow>
              <InfoLabel>방문 일시</InfoLabel>
              {/*평일 오전/ 평일 오후/ 주말 오전/ 주말 오후 */}
              <InfoValue>
                {parseVisitDateToKorean(review.visitorData.visitDate)}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>팝업 만족도</InfoLabel>
              {/*만족/ 보통/ 불만족 */}
              <InfoValue>
                {parseSatisfactionToKorean(review.visitorData.satisfaction)}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>혼잡도</InfoLabel>
              {/*여유/ 보통/ 혼잡*/}
              <InfoValue>
                {parseCongestionToKorean(review.visitorData.congestion)}
              </InfoValue>
            </InfoRow>
          </InfoSection>
          <ReviewTextContainer>
            <ReviewText>{review.text}</ReviewText>
          </ReviewTextContainer>

          <ImageScrollView>
            {review.images.map((image, index) => (
              <ReviewImage key={index} source={{uri: image}} />
            ))}
          </ImageScrollView>
        </Container>
      }
    />
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: ${moderateScale(16)}px;
`;

const StoreCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.grey.mild};
  padding: ${moderateScale(16)}px 0px;
`;
const StoreImage = styled.Image`
  width: ${moderateScale(96)}px;
  height: ${moderateScale(96)}px;
  border-radius: ${moderateScale(16)}px;
`;
const StoreInfo = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: ${moderateScale(20)}px;
  justify-content: space-between;
`;

const StoreName = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: bold;
  color: ${props => props.theme.color.grey.black};
`;

const VerificationBadge = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(20)}px 0px;
`;

const UserImageInfo = styled.Image`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
`;

const UserTextInfo = styled.View`
  margin-left: ${moderateScale(10)}px;
  flex-direction: column;
  font-size: ${moderateScale(20)}px;
`;
const Nickname = styled.Text`
  font-size: ${moderateScale(14)}px;
  font-weight: semi-bold;
  color: ${props => props.theme.color.grey.black};
  margin-right: ${moderateScale(8)}px;
`;

const DateText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.main};
`;

const InfoSection = styled.View`
  margin-bottom: ${moderateScale(20)}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(8)}px;
`;

const InfoLabel = styled.Text`
  width: ${moderateScale(70)}px;
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.purple.main};
`;

const InfoValue = styled.Text`
  margin-left: ${moderateScale(20)}px;

  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
  background-color: rgb(255, 255, 255);
  padding: ${moderateScale(8)}px ${moderateScale(18)}px;
  border: 1px ${props => props.theme.color.grey.mild} solid;
  border-radius: ${moderateScale(16)}px;
`;
const ReviewTextContainer = styled.View`
  border: 1px ${props => props.theme.color.grey.mild} solid;
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(20)}px;
`;
const ReviewText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
  line-height: ${moderateScale(20)}px;
`;

export const ImageScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: moderateScale(8),
    paddingRight: moderateScale(16),
  },
})`
  flex-direction: row;
`;

export const ReviewImage = styled.Image`
  width: ${moderateScale(124)}px;
  height: ${moderateScale(124)}px;
  border-radius: ${moderateScale(20)}px;
  margin-right: ${moderateScale(8)}px;
`;

export default MypageReviewDetailContainer;
