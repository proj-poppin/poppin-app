import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';
import shallow from 'zustand/shallow';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupLikesLandingScreenHeader} from '../Section/Popup.likes.screenHeader';
import {PopupDetailProvider} from '../../Popup/Detail/Provider/Popup.detail.provider';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {BlankDropdownV2} from './PopupLikes.operatingStatus.DropdownV2.component';
import {PopupLikesSortingDropdownV2} from './PopupLikes.sorting.DropdownV2.component';
import PopupStoreCard from 'src/Component/Popup/Landing/PopupStoreCard';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import InterestedPopupCalendarSection from './InterestedPopupCalendarSection';
import InterestedPopupCalendarWithBottomSheet from './InterestedPopupCalendarSection';

export enum OperationStatus {
  NOTYET = 'NOTYET',
  OPERATING = 'OPERATING',
  TERMINATED = 'TERMINATED',
}

export enum SortingOptions {
  OPEN_DATE = 'openDate',
  CLOSE_DATE = 'closeDate',
  INTEREST_DATE = 'interestCreatedAt',
}

export const PopupLikesLandingScreen = () => {
  const {user, isLoggedIn} = useUserStore(
    state => ({user: state.user, isLoggedIn: state.isLoggedIn}),
    shallow,
  );
  const loggedIn = isLoggedIn();
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const [selectedStatus, setSelectedStatus] = useState<OperationStatus>(
    OperationStatus.OPERATING,
  );
  const [sortingOption, setSortingOption] = useState<SortingOptions>(
    SortingOptions.OPEN_DATE,
  );
  const [isCalendarView, setIsCalendarView] = useState(false);

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

  const filteredAndSortedPopups = (interestedPopupStores || [])
    .filter((popup: PopupSchema) => popup.operationStatus === selectedStatus)
    .sort((a: PopupSchema, b: PopupSchema) => {
      if (sortingOption === SortingOptions.INTEREST_DATE) {
        return (
          new Date(b[sortingOption]).getTime() -
          new Date(a[sortingOption]).getTime()
        );
      } else {
        const isAscending = sortingOption === SortingOptions.OPEN_DATE;
        return isAscending
          ? new Date(a[sortingOption]).getTime() -
              new Date(b[sortingOption]).getTime()
          : new Date(b[sortingOption]).getTime() -
              new Date(a[sortingOption]).getTime();
      }
    });

  console.log('filteredAndSortedPopups', filteredAndSortedPopups);

  return (
    <ScreenContainer>
      <PopupLikesLandingScreenHeader
        isCalendarView={isCalendarView}
        toggleView={() => setIsCalendarView(prev => !prev)}
      />
      {isCalendarView ? (
        <InterestedPopupCalendarWithBottomSheet />
      ) : (
        <>
          <FiltersContainer>
            <BlankDropdownV2
              data={[
                {displayName: '오픈 예정', value: OperationStatus.NOTYET},
                {displayName: '운영 중', value: OperationStatus.OPERATING},
                {displayName: '운영 종료', value: OperationStatus.TERMINATED},
              ]}
              onSelect={item => setSelectedStatus(item.value)}
              buttonStyle={{width: '40%'}}
            />
            <PopupLikesSortingDropdownV2
              data={[
                {displayName: '오픈일순', value: SortingOptions.OPEN_DATE},
                {displayName: '마감일순', value: SortingOptions.CLOSE_DATE},
                {displayName: '저장순', value: SortingOptions.INTEREST_DATE},
              ]}
              onSelect={item => setSortingOption(item.value)}
              buttonStyle={{width: '23%'}}
            />
          </FiltersContainer>
          <FlatList
            data={filteredAndSortedPopups}
            keyExtractor={(item: PopupSchema) => item.id}
            renderItem={renderPopupItem}
          />
        </>
      )}
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const FiltersContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const popupItemStyles = StyleSheet.create({
  popupItemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
