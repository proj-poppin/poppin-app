import React from 'react';
import styled from 'styled-components/native';
import {ScrollViewPage} from 'src/Component/Page';
import {moderateScale} from 'src/Util';
import {NavigationProp} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {ScreenHeader} from 'src/Component/View';
import {Image, View} from 'react-native';
import CheckIcon from 'src/Resource/svg/check_circle.svg'; // 체크무늬 아이콘 추가 필요
import ChevronRight from 'src/Resource/svg/right-arrow-gray-icon.svg';
import {
  NormalBadge,
  NormalText,
  VerifiedBadge,
  VerifiedText,
} from 'src/Component/MyPage/Review/Mypage.complete.review.poupupCard';

export interface MypageReviewDetailScreenProps {}
const mockData = {
  introduce: '팝업스토어이름 이름 이름...',
  posterUrl:
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',
  isCertificated: true,
  nickname: '본인 닉네임 이름',
  visitedAt: '2023.05.03',
  createdAt: '2023.05.03',
  visitorData: {
    visitDate: '평일 오전',
    satisfaction: '보통',
    congestion: '보통',
  },
  text: '리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다.리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다.리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다. 리뷰 글입니다. 본문입니다.리뷰 글입니다. ',
  images: [
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',

    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/13/images.jpg',
  ],
};

const MypageReviewDetailContainer: React.FC<
  MypageReviewDetailScreenProps
> = () => {
  const renderVisitInfo = () => {
    if (!mockData.isCertificated) return null;

    return (
      <InfoSection>
        <InfoRow>
          <InfoLabel>방문 일시</InfoLabel>
          <InfoValue>{mockData.visitorData.visitDate}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>팝업 만족도</InfoLabel>
          <InfoValue>{mockData.visitorData.satisfaction}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>혼잡도</InfoLabel>
          <InfoValue>{mockData.visitorData.congestion}</InfoValue>
        </InfoRow>
      </InfoSection>
    );
  };

  return (
    <ScrollViewPage
      UpperPart={
        <ScreenHeader LeftComponents={'BACK_BUTTON'} title={'작성 완료 후기'} />
      }
      PageContent={
        <Container>
          <StoreCard>
            <StoreImage source={{uri: mockData.posterUrl}} />
            <StoreInfo>
              <StoreName>{mockData.introduce}</StoreName>
              <VerificationBadge>
                {mockData.isCertificated ? (
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
            <UserImageInfo source={{uri: mockData.posterUrl}} />
            <UserTextInfo>
              <Nickname>{mockData.nickname}</Nickname>
              <DateText>
                방문일 : {mockData.visitedAt}
                {`\t`}작성일: {mockData.createdAt}
              </DateText>
            </UserTextInfo>
          </UserInfoContainer>
          {renderVisitInfo()}
          <ReviewTextContainer>
            <ReviewText>{mockData.text}</ReviewText>
          </ReviewTextContainer>

          <ImageGrid>
            {mockData.images.map((image, index) => (
              <ReviewImage key={index} source={{uri: image}} />
            ))}
          </ImageGrid>
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

const ImageGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

const ReviewImage = styled.Image`
  width: ${moderateScale(100)}px;
  height: ${moderateScale(100)}px;
  border-radius: ${moderateScale(20)}px;
`;

export default MypageReviewDetailContainer;
