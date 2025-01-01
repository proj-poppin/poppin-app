import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import CheckIcon from 'src/Resource/svg/check_circle.svg';
import ArrowIcon from 'src/Resource/svg/right-arrow-gray-icon.svg';
// ReviewCard 컴포넌트 추가
interface CompleteReviewCardProps {
  isVerified: boolean;
  storeName: string;
  date: string;
  imageUrl: string;
  onPress?: () => void;
}

export const CompleteReviewCard: React.FC<CompleteReviewCardProps> = ({
  isVerified,
  storeName,
  date,
  imageUrl,
  onPress,
}) => {
  return (
    <ReviewItem onPress={onPress}>
      <StoreImage source={{uri: imageUrl}} resizeMode="cover" />
      <ReviewContent>
        <ReviewTypeContainer>
          {isVerified ? (
            <VerifiedBadge>
              <CheckIcon width={moderateScale(16)} height={moderateScale(16)} />
              <VerifiedText>방문 인증 후기</VerifiedText>
            </VerifiedBadge>
          ) : (
            <NormalBadge>
              <NormalText>일반 후기</NormalText>
            </NormalBadge>
          )}
        </ReviewTypeContainer>
        <StoreName numberOfLines={1} ellipsizeMode="tail">
          {storeName}
        </StoreName>
        <ReviewDate>{date}</ReviewDate>
        <ArrowContainer>
          <ArrowIcon width={moderateScale(12)} />
        </ArrowContainer>
      </ReviewContent>
    </ReviewItem>
  );
};

const ReviewItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${moderateScale(8)}px ${moderateScale(4)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.grey.mild};
  align-items: center;
`;

const StoreImage = styled.Image`
  width: ${moderateScale(96)}px;
  height: ${moderateScale(96)}px;
  border-radius: ${moderateScale(8)}px;
  margin-right: ${moderateScale(16)}px;
  background-color: ${props => props.theme.color.grey.white};
`;

const ReviewContent = styled.View`
  flex: 1;
  height: ${moderateScale(96)}px;
`;
const ReviewTypeContainer = styled.View``;
const VerifiedBadge = styled.View`
  background-color: ${props => props.theme.color.blue.mild};
  padding: ${moderateScale(4)}px ${moderateScale(8)}px;
  border-radius: ${moderateScale(16)}px;
  align-self: flex-start;
  margin-bottom: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  gap: ${moderateScale(4)}px;
`;
const NormalBadge = styled(VerifiedBadge)`
  background-color: ${props => props.theme.color.grey.main};
`;

const VerifiedText = styled.Text`
  color: ${props => props.theme.color.grey.black};
  font-size: ${moderateScale(12)}px;
`;

const NormalText = styled(VerifiedText)`
  color: ${props => props.theme.color.grey.black};
`;

const StoreName = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(5)}px;
`;

const ReviewDate = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: ${props => props.theme.color.grey.main};
`;

const ArrowContainer = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
`;
