import React, {useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {calculateDaysRemaining, moderateScale} from 'src/Util';
import StarFilledSvg from 'src/Resource/svg/star-filled-icon.svg';
import StarOutlineSvg from 'src/Resource/svg/star-outline-icon.svg';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import {usePopupDetailContext} from 'src/Screen/Popup/Detail/Provider/Popup.detail.provider';
import {POP_UP_TYPES} from 'src/Component/findPopup/constants';
import {themeColors} from '../../../Theme/theme';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import shallow from 'zustand/shallow';

interface PopupStoreCardProps {
  item: PopupSchema;
  onPress?: () => void;
  isInterestPopupCard?: boolean;
  dDayType?: string;
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
  isInterestPopupCard = false,
  dDayType,
}) => {
  const remainingDays = calculateDaysRemaining(item.closeDate);
  const status = item.operationStatus;
  const loadingStates = usePopupStore(state => state.loadingStates);

  // 전체 로딩 중인지 확인(A 팝업 관심팝업 추가/삭제 로딩중일때 B 팝업 관심팝업 추가/삭제 버튼 적용 막기 위함. 병렬 요청 방지)
  const isAnyLoading = Object.values(loadingStates).some(loading => loading);

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
  const {scrapping, scrapPopup, unScrapPopup} = usePopupDetailContext();

  const scrapped =
    interestedPopupStores?.some(popup => popup.id === item.id) ?? false;

  const {setLoadingState, togglePopupScrap} = usePopupStore.getState();
  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
    shallow,
  );
  const handleFavoritePress = async (
    event: GestureResponderEvent,
    popupId: string,
  ) => {
    event.persist(); // Synthetic Event를 유지
    if (!checkLoginAndShowModal('POPUP_SCRAP')) {
      return;
    }
    setLoadingState(popupId, true);
    try {
      await togglePopupScrap(popupId);
    } catch (error) {
      console.error(`Error toggling scrap for popup ${popupId}:`, error);
    } finally {
      setLoadingState(popupId, false);
    }
  };

  return (
    <CardContainer onPress={onPress}>
      <CardImage source={{uri: item.mainImageUrl}} resizeMode="cover" />

      {/* 종료 상태일 때 ClosedWrapper를 렌더링 */}
      {status === 'TERMINATED' && (
        <ClosedWrapper>
          <ClosedText>팝업 종료</ClosedText>
        </ClosedWrapper>
      )}

      <FavoriteButton
        onPress={event => handleFavoritePress(event, item.id)}
        disabled={scrapping || isAnyLoading}>
        {scrapped ? <StarFilledSvg /> : <StarOutlineSvg />}
      </FavoriteButton>
      {loadingStates[item.id] && <LoadingText>로딩중...</LoadingText>}

      <CardContent>
        {isInterestPopupCard && (
          <StatusContainer>
            <StatusText>
              {dDayType
                ? dDayType // 오픈 D-Day, 마감 D-Day 표시
                : status === 'OPERATING'
                ? '운영 중'
                : status === 'TERMINATED'
                ? '팝업 종료'
                : status === 'NOTYET' && remainingDays !== undefined
                ? `오픈 D-${remainingDays}`
                : ''}
            </StatusText>
          </StatusContainer>
        )}
        <InfoContainer>
          <StoreName>{item.name}</StoreName>
          <StoreLocation>{item.address}</StoreLocation>
          <StoreDate>
            {formatDate(item.openDate)} ~ {formatDate(item.closeDate)}
          </StoreDate>
        </InfoContainer>
        {!isInterestPopupCard && (
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
        )}
      </CardContent>
    </CardContainer>
  );
};

//   closeWrapper: {
//     width: 140,
//     height: 140,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

const ClosedText = styled.Text`
  color: white;
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;

const ClosedWrapper = styled.View`
  width: ${moderateScale(124)}px;
  height: ${moderateScale(124)}px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${moderateScale(8)}px;
`;

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
const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  right: ${moderateScale(6)}px;
  background-color: ${({theme}) => theme.color.grey.white};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(2)}px;
  z-index: 1;
`;

const LoadingText = styled(Text)`
  font-size: ${moderateScale(10)}px;
  position: absolute;
  color: ${({theme}) => theme.color.blue.main};
  margin-left: ${moderateScale(310)}px;
  width: ${moderateScale(40)}px;
  top: ${moderateScale(35)}px;
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

// 디데이 잘리는 경우 있어서 width, height auto로 변경
const StatusContainer = styled.View`
  background-color: ${themeColors().purple.mild};
  width: auto;
  max-width: ${moderateScale(82)}px;
  height: auto;
  border-radius: ${moderateScale(10)}px;
  padding: ${moderateScale(6)}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${moderateScale(12)}px;
`;

const StatusText = styled.Text`
  color: #000;
  font-size: ${moderateScale(12)}px;
  font-weight: bold;
`;

export default PopupStoreCard;
