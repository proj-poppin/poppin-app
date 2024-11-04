import React from 'react';
import {Image, Pressable, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {PopupSchema} from '../../../Schema/Popup/popup.schema';
import {moderateScale} from '../../../Util';
import {POP_UP_TYPES} from '../../../Screen/MyPage/preferenceSetting/types';
import StarFilledSvg from '../../../Resource/svg/star-filled-icon.svg';
import StarOutlineSvg from '../../../Resource/svg/star-outline-icon.svg';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';
import {usePopupDetailContext} from '../../../Screen/Popup/Detail/Provider/Popup.detail.provider';

interface PopupStoreCardProps {
  item: PopupSchema;
  onPress?: () => void;
}

export type TFilter = {
  id: number;
  label: string;
  name: string;
  selected: boolean;
};

// 카테고리/타입 매핑을 POP_UP_TYPES를 이용하도록 변경
const getFilterLabel = (name: string): string => {
  const filter = POP_UP_TYPES.find(filter => filter.name === name);
  return filter?.label || name;
};

// 날짜 형식 맞추기
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}.${String(date.getDate()).padStart(2, '0')}`;
};

// D-Day 계산 함수 추가
const calculateDday = (dateString: string): string => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays}`;
};

// Component
export const PopupStoreCard: React.FC<PopupStoreCardProps> = ({
  item,
  onPress,
}) => {
  const activeCategories = Object.entries(item.preferences.preferenceCategory)
    .filter(([key, value]) => value === true && key !== 'id')
    .map(([key]) => getFilterLabel(key));

  const activeTypes = Object.entries(item.preferences.preferencePopupStore)
    .filter(([key, value]) => value === true && key !== 'id')
    .map(([key]) => getFilterLabel(key));

  const dday = calculateDday(item.closeDate);
  const interestedPopupStores = usePopupStore(
    state => state.interestedPopupStores,
  );
  const {scrapPopup, unScrapPopup, scrapping} = usePopupDetailContext();

  const scrapped =
    interestedPopupStores?.some(popup => popup.id === item.id) ?? false;

  return (
    <CardContainer onPress={onPress}>
      <CardImage source={{uri: item.mainImageUrl}} resizeMode="cover" />
      <DdayBadge>
        <DdayText>종료 D-{dday}</DdayText>
      </DdayBadge>
      <FavoriteButton>
        <Pressable
          onPress={scrapped ? unScrapPopup : scrapPopup}
          disabled={scrapping}>
          {scrapped ? <StarFilledSvg /> : <StarOutlineSvg />}
        </Pressable>
        {scrapping && <LoadingText>로딩중...</LoadingText>}
      </FavoriteButton>
      <CardContent>
        <InfoContainer>
          <StoreName>{item.name}</StoreName>
          <StoreLocation>{item.address}</StoreLocation>
          <StoreDate>
            {formatDate(item.openDate)} ~ {formatDate(item.closeDate)}
          </StoreDate>
        </InfoContainer>

        <TagsContainer>
          {activeCategories.map(label => (
            <CategoryItem key={label}>
              <TagText>{label}</TagText>
            </CategoryItem>
          ))}
          {activeTypes.map(label => (
            <TagItem key={label}>
              <TagText>{label}</TagText>
            </TagItem>
          ))}
        </TagsContainer>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.color.grey.white};
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
`;

const CardImage = styled(Image)`
  width: ${moderateScale(124)}px;
  height: ${moderateScale(124)}px;
  border-radius: ${moderateScale(8)}px;
`;
const DdayBadge = styled.View`
  position: absolute;
  top: ${moderateScale(8)}px;
  left: ${moderateScale(6)}px;
  background-color: ${({theme}) =>
    `${theme.color.grey.black}90`}; // 80은 hex 값으로 80% opacity
  padding: ${moderateScale(4)}px ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  font-size: ${moderateScale(12)}px;
`;
const DdayText = styled.Text`
  color: white;
  font-size: ${moderateScale(10)}px;
`;
const FavoriteButton = styled.View`
  position: absolute;
  right: ${moderateScale(6)}px;
  background-color: ${({theme}) => theme.color.grey.white};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(6)}px;
`;
const LoadingText = styled(Text)`
  font-size: ${moderateScale(10)}px;
  position: absolute;
  color: ${({theme}) => theme.color.blue.main};
  margin-left: ${moderateScale(55)}px;
  width: ${moderateScale(35)}px;
  top: ${moderateScale(30)}px;
`;
const CardContent = styled.View`
  padding: ${moderateScale(4)}px ${moderateScale(16)}px;
`;

const InfoContainer = styled.View`
  gap: ${moderateScale(8)}px;
`;

const StoreName = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: 600;
  color: ${({theme}) => theme.color.grey.black};
`;

const StoreLocation = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-top: ${moderateScale(8)}px;
  color: ${({theme}) => theme.color.grey.main};
`;

const StoreDate = styled.Text`
  font-size: ${moderateScale(12)}px;
  margin-top: ${moderateScale(8)}px;
  color: ${({theme}) => theme.color.grey.main};
`;

const TagsContainer = styled.View`
  flex-direction: row;
  gap: ${moderateScale(8)}px;
  margin-top: ${moderateScale(16)}px;
`;

const CategoryItem = styled.View`
  background-color: ${({theme}) => theme.color.red.mild};
  padding: ${moderateScale(8)}px ${moderateScale(12)}px;
  border-radius: ${moderateScale(16)}px;
  margin-right: ${moderateScale(4)}px;
`;

const TagItem = styled.View`
  background-color: ${({theme}) => theme.color.blue.selected};
  padding: ${moderateScale(8)}px ${moderateScale(12)}px;
  border-radius: ${moderateScale(16)}px;
  margin-right: ${moderateScale(4)}px;
`;

const TagText = styled.Text`
  font-size: ${moderateScale(10)}px;
  color: ${({theme}) => theme.color.grey.black};
`;

export default PopupStoreCard;
