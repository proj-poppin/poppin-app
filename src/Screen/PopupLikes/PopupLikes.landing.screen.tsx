import React from 'react';
import styled from 'styled-components/native';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import Filter from './Components/Filter';
import LikedList from './Components/LikedList';
import InterestedPopupCalendarWithBottomSheet from './Components/CalendarSection';
import {PopupLikesLandingScreenHeader} from './Components/Header';
import { usePopupLikesFilters } from './Hooks/Use.popup.likes.filters';

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
  const {isLoggedIn} = useUserStore();
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const {
    selectedStatus,
    setSelectedStatus,
    sortingOption,
    setSortingOption,
    isCalendarView,
    setIsCalendarView,
    filteredAndSortedPopups,
  } = usePopupLikesFilters();

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
          <Filter
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            sortingOption={sortingOption}
            setSortingOption={setSortingOption}
          />
          <LikedList
            popups={filteredAndSortedPopups} 
            onPressPopup={id =>
              navigation.navigate('PopupDetailScreen', {popupId: id})
            }
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

export default PopupLikesLandingScreen;
