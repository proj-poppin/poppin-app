import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {usePopupStore} from '../../../Zustand/Popup/popup.zustand';
import shallow from 'zustand/shallow';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupLikesLandingScreenHeader} from '../Section/Popup.likes.screenHeader';
import {PopupDetailProvider} from '../../Popup/Detail/Provider/Popup.detail.provider';
import PopupStoreCard from '../../../Component/Popup/Landing/PopupStoreCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {BlankDropdown} from '../../../Component/Dropdown';
import DownBlackSvg from 'src/Resource/svg/down-arrow-gray-icon.svg';
import OrderSvg from '../../assets/icons/order.svg';
import {useUserStore} from '../../../Zustand/User/user.zustand';

export type PopupLikesLandingScreenProps = {};

// Enum for Operation Status
export enum OperationStatus {
  NOTYET = 'NOTYET', // 오픈 예정
  OPERATING = 'OPERATING', // 운영 중
  TERMINATED = 'TERMINATED', // 운영 종료
}

// Enum for Sorting Options
export enum SortingOptions {
  OPEN_DATE = 'openDate', // 오픈일순
  CLOSE_DATE = 'closeDate', // 마감일순
  INTEREST_DATE = 'interestCreatedAt', // 저장순
}

export const PopupLikesLandingScreen = () => {
  const {user, isLoggedIn} = useUserStore(
    state => ({user: state.user, isLoggedIn: state.isLoggedIn}),
    shallow,
  );
  const loggedIn = isLoggedIn();
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const [selectedStatus, setSelectedStatus] = useState<OperationStatus>(
    OperationStatus.NOTYET,
  );
  const [sortingOption, setSortingOption] = useState<SortingOptions>(
    SortingOptions.OPEN_DATE,
  );

  const {interestedPopupStores} = usePopupStore(
    state => ({
      interestedPopupStores: state.interestedPopupStores,
    }),
    shallow,
  );

  const handlePressCard = (id: string) => {
    navigation.navigate('PopupDetailScreen', {popupId: id});
  };

  const renderPopupItem = ({item}: {item: PopupSchema}) => (
    <View style={popupItemStyles.popupItemContainer}>
      <PopupDetailProvider>
        <PopupStoreCard
          item={item}
          key={item.id}
          onPress={() => {
            handlePressCard(item.id);
          }}
          isInterestPopupCard={true}
        />
      </PopupDetailProvider>
    </View>
  );

  if (!loggedIn) {
    return (
      <ScreenContainer>
        <Text>로그인이 필요한 서비스입니다.</Text>
      </ScreenContainer>
    );
  }

  // Filter and Sort Logic
  const filteredAndSortedPopups = (interestedPopupStores || [])
    .filter((popup: PopupSchema) => popup.operationStatus === selectedStatus)
    .sort((a: PopupSchema, b: PopupSchema) => {
      if (sortingOption === SortingOptions.INTEREST_DATE) {
        // 저장순은 내림차순
        return (
          new Date(b[sortingOption]).getTime() -
          new Date(a[sortingOption]).getTime()
        );
      } else {
        // 오픈일순 또는 마감일순은 오름차순
        const isAscending = sortingOption === SortingOptions.OPEN_DATE;
        return isAscending
          ? new Date(a[sortingOption]).getTime() -
              new Date(b[sortingOption]).getTime()
          : new Date(b[sortingOption]).getTime() -
              new Date(a[sortingOption]).getTime();
      }
    });

  return (
    <ScreenContainer>
      <PopupLikesLandingScreenHeader />
      {/* Filter Dropdowns */}
      <FiltersContainer>
        <BlankDropdown
          data={[
            {displayName: '오픈 예정', value: OperationStatus.NOTYET},
            {displayName: '운영 중', value: OperationStatus.OPERATING},
            {displayName: '운영 종료', value: OperationStatus.TERMINATED},
          ]}
          onSelect={item => setSelectedStatus(item.value)}
          buttonStyle={{width: '48%'}}
        />
        <BlankDropdown
          data={[
            {displayName: '오픈일순', value: SortingOptions.OPEN_DATE},
            {displayName: '마감일순', value: SortingOptions.CLOSE_DATE},
            {displayName: '저장순', value: SortingOptions.INTEREST_DATE},
          ]}
          onSelect={item => setSortingOption(item.value)}
          buttonStyle={{width: '48%'}}
        />
      </FiltersContainer>

      {/* Popup List */}
      <FlatList
        data={filteredAndSortedPopups}
        keyExtractor={(item: PopupSchema) => item.id}
        renderItem={renderPopupItem}
      />
    </ScreenContainer>
  );
};

// Styled Components
const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const FiltersContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({theme}) => theme.color.grey.main};
`;

const popupItemStyles = StyleSheet.create({
  popupItemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
