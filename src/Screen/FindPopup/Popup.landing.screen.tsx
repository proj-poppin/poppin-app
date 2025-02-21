import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LandingBottomTabProps} from 'src/Navigator/Landing.bottomTab.navigator';
import styled from 'styled-components/native';
import CustomBottomSheet from 'src/Component/BottomSheet/CustomBottomSheet';
import PopupCategoryModal from 'src/Component/Modal/Popup.category.modal';
import {SearchBar} from 'src/Component/SearchBar/SearchBar';
import {
  OperatingPopupScreen,
  NotOpenedPopupScreen,
  ClosedPopupScreen,
} from './Components/Popup.list.screen';
import CustomTabBar from './Components/Custom.tab.bar';
import {usePopupFilters} from './Hooks/Use.popup.filters';
import {usePopupSearch} from './Hooks/Use.popup.search';

const PopupLandingScreenTopTab = createMaterialTopTabNavigator();

export type PopupLandingScreenProps = {};

export const PopupLandingScreen = ({}: NativeStackScreenProps<
  LandingBottomTabProps,
  'PopupLandingScreen'
>) => {
  const {
    modalVisible,
    toggleModal,
    handleApplyFilters,
    handleResetFilters,
    preferenceCategory,
    preferencePopupStore,
  } = usePopupFilters();

  const {
    searchKeyword,
    isSearchMode,
    setSearchKeyword,
    handleSearchToggle,
    handleBackPress,
  } = usePopupSearch();

  return (
    <ScreenContainer>
      <SearchBar
        isSearchMode={isSearchMode}
        onSearchToggle={handleSearchToggle}
        onBackPress={handleBackPress}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <ScreenContent style={{marginBottom: 80}}>
        <PopupLandingScreenTopTab.Navigator
          backBehavior="none"
          screenOptions={{
            swipeEnabled: true,
          }}
          tabBar={props => (
            <CustomTabBar {...props} onFilterChange={() => toggleModal(true)} />
          )}>
          <PopupLandingScreenTopTab.Screen
            name="OperationActiveScreen"
            component={OperatingPopupScreen}
          />
          <PopupLandingScreenTopTab.Screen
            name="OperationUpcomingScreen"
            component={NotOpenedPopupScreen}
          />
          <PopupLandingScreenTopTab.Screen
            name="OperationClosedScreen"
            component={ClosedPopupScreen}
          />
        </PopupLandingScreenTopTab.Navigator>
      </ScreenContent>
      <CustomBottomSheet
        isVisible={modalVisible}
        onClose={() => toggleModal(false)}
        title={'찾고싶은 팝업의 카테고리를 설정해주세요'}>
        <PopupCategoryModal
          visible={modalVisible}
          onClose={() => toggleModal(false)}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          buttonName={'필터 적용하기'}
          validationMode="both"
          initialPreferenceCategory={preferenceCategory}
          initialPreferencePopupStore={preferencePopupStore}
        />
      </CustomBottomSheet>
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View`
  position: relative;
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const ScreenContent = styled.View`
  flex: 1;
`;
