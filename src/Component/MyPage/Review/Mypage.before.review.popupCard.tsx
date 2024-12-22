import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';

interface BeforeReviewPopupCardProps {
  popup: PopupSchema;
  showWriteButton?: boolean;
  onPress?: () => void;
}

export const BeforeReviewPopupCard: React.FC<BeforeReviewPopupCardProps> = ({
  popup,
  showWriteButton = true,
  onPress,
}) => {
  return (
    <ReviewItem onPress={onPress}>
      <StoreImage source={{uri: popup.mainImageUrl}} resizeMode="cover" />
      <ReviewContent>
        <StoreNameContainer>
          <StoreName>{popup.name}</StoreName>
        </StoreNameContainer>
        <ReviewDate>
          {popup.openDate} ~ {popup.closeDate}
        </ReviewDate>
        {showWriteButton && (
          <WriteReviewButton>
            <WriteReviewText onPress={onPress}>
              후기 작성하기 ＞
            </WriteReviewText>
          </WriteReviewButton>
        )}
      </ReviewContent>
    </ReviewItem>
  );
};

const ReviewItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${moderateScale(4)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.color.grey.mild};
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
`;

const StoreNameContainer = styled.View`
  width: 70%;
`;

const StoreName = styled.Text`
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
  margin-bottom: ${moderateScale(4)}px;
`;

const ReviewDate = styled.Text`
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
