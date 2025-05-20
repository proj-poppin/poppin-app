import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {LandingBottomTabProps} from 'src/Navigator/Landing.bottomTab.navigator';
import {BlankDropdown} from 'src/Component/Dropdown';
import {themeColors} from 'src/Theme/theme';
import {PopupSortOrder} from 'src/Object/Type/popupSortOrder.type';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';
import {usePopupScreenStore} from './Popup.landing.zustand';
import styled from 'styled-components/native';
import {SectionContainer} from 'src/Unit/View';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {EdgeInsets} from 'react-native-safe-area-context';
import GradientButton from 'src/Component/Button/FilterSettingButton';
import PopupStoreCard from 'src/Component/Popup/Landing/PopupStoreCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import CustomBottomSheet from 'src/Component/BottomSheet/CustomBottomSheet';
import {PopupDetailProvider} from '../Detail/Provider/Popup.detail.provider';
import PopupCategoryModal from 'src/Component/Modal/Popup.category.modal';
import shallow from 'zustand/shallow';
import {PreferenceCategory} from 'src/Schema/Preference/preferenceCategory.schema';
import {categoryKeys, popupStoreKeys} from 'src/Object/preference.enum';
import {PreferencePopupStore} from 'src/Schema/Preference/preferencePopupStore';
import {BlankPreference} from '../../../Schema/Preference/preference.schema';
import NotList from 'src/Component/findPopup/NotList';
import {SearchBar} from 'src/Component/SearchBar/SearchBar';

interface FilterContainerProps {
  onOrderChange: (newOrder: PopupSortOrder) => void;
  onFilterChange: () => void;
}

interface PopupListScreenProps {
  operationStatus: OperationStatus;
}

// Top Tab Navigator
const PopupLandingScreenTopTab = createMaterialTopTabNavigator();

const REVIEW_ORDER_TYPES = [
  {displayName: '최근 오픈 순', value: PopupSortOrder.RECENTLY_OPENED},
  {displayName: '종료 임박 순', value: PopupSortOrder.CLOSING_SOON},
  {displayName: '조회 순', value: PopupSortOrder.MOST_VIEWED},
  {displayName: '최신 업로드 순', value: PopupSortOrder.RECENTLY_UPLOADED},
];

export type PopupLandingScreenProps = {};

export const PopupLandingScreen = ({}: NativeStackScreenProps<
  LandingBottomTabProps,
  'PopupLandingScreen'
>) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const {
    setSelectedCategories,
    setSelectedPopupStores,
    setFilteringFourteenCategories,
    setFilteringThreeCategories,
    preferenceCategory: preferenceCategory,
    preferencePopupStore: preferencePopupStore,
    searchKeyword,
    setSearchKeyword,
    setIsSetting,
  } = usePopupScreenStore(
    state => ({
      setSelectedCategories: state.setSelectedCategories,
      setSelectedPopupStores: state.setSelectedPopupStores,
      preferenceCategory: state.preferenceCategory,
      preferencePopupStore: state.preferencePopupStore,
      setFilteringFourteenCategories: state.setFilteringFourteenCategories,
      setFilteringThreeCategories: state.setFilteringThreeCategories,
      searchKeyword: state.searchKeyword,
      setSearchKeyword: state.setSearchKeyword,
      isSetting: state.isSetting,
      setIsSetting: state.setIsSetting,
    }),
    shallow,
  );

  const [selectedOrder, setSelectedOrder] = useState<PopupSortOrder>(
    PopupSortOrder.RECENTLY_OPENED,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterChange = (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => {
    const updatedCategories = categoryKeys.reduce((acc, key) => {
      acc[key as keyof PreferenceCategory] =
        selectedCategories.selectedCategories.includes(key);
      return acc;
    }, {} as PreferenceCategory);

    const updatedPopupStores = popupStoreKeys.reduce((acc, key) => {
      acc[key as keyof PreferencePopupStore] =
        selectedCategories.selectedPopupTypes.includes(key);
      return acc;
    }, {} as PreferencePopupStore);

    // 상태 업데이트
    setFilteringFourteenCategories(updatedCategories);
    setFilteringThreeCategories(updatedPopupStores);

    // 기존 필터 값 업데이트
    setSelectedCategories(selectedCategories.selectedCategories.join(','));
    setSelectedPopupStores(selectedCategories.selectedPopupTypes.join(','));
    setIsSetting(true);
  };

  const handleResetFilter = () => {
    // 상태 초기화
    setSelectedCategories('');
    setSelectedPopupStores('');
    setFilteringFourteenCategories(BlankPreference.preferenceCategory);
    setFilteringThreeCategories(BlankPreference.preferencePopupStore);
    setModalVisible(false);
    setIsSetting(false);
  };

  const handleSearchToggle = () => setIsSearchMode(true);
  const handleBackPress = () => {
    setIsSearchMode(false);
    setSearchKeyword('');
  };
  const handleOrderChange = (newOrder: PopupSortOrder) => {
    setSelectedOrder(newOrder);
  };

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
            <CustomTabBar
              {...props}
              onOrderChange={handleOrderChange}
              onFilterChange={() => setModalVisible(true)}
            />
          )}>
          <PopupLandingScreenTopTab.Screen
            name="OperationActiveScreen"
            component={OperatingPopupScreen}
            options={{tabBarLabel: '운영중'} as MaterialTopTabNavigationOptions}
          />
          <PopupLandingScreenTopTab.Screen
            name="OperationUpcomingScreen"
            component={NotOpenedPopupScreen}
            options={
              {tabBarLabel: '오픈 예정'} as MaterialTopTabNavigationOptions
            }
          />
          <PopupLandingScreenTopTab.Screen
            name="OperationClosedScreen"
            component={ClosedPopupScreen}
            options={
              {tabBarLabel: '운영 종료'} as MaterialTopTabNavigationOptions
            }
          />
        </PopupLandingScreenTopTab.Navigator>
      </ScreenContent>
      <CustomBottomSheet
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={'찾고싶은 팝업의 카테고리를 설정해주세요'}>
        <PopupCategoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onApply={handleFilterChange}
          onReset={handleResetFilter}
          buttonName={'필터 적용하기'}
          validationMode="both"
          initialPreferenceCategory={preferenceCategory}
          initialPreferencePopupStore={preferencePopupStore}
        />
      </CustomBottomSheet>
    </ScreenContainer>
  );
};

const PopupListScreen: React.FC<PopupListScreenProps> = ({operationStatus}) => {
  const {
    loadMorePopupStores,
    [operationStatus]: {searchedPopupStores, isLoading, pageInfo},
  } = usePopupScreenStore();
  //
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  if (isLoading && searchedPopupStores.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color={themeColors().blue.main} />
      </View>
    );
  }

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
        />
      </PopupDetailProvider>
    </View>
  );

  const onEndReached = () => {
    if (!pageInfo.isLast) {
      loadMorePopupStores(operationStatus);
    }
  };

  // 검색 결과가 없을 때 NotList를 렌더링
  if (
    searchedPopupStores == null ||
    (!isLoading && searchedPopupStores.length === 0)
  ) {
    return (
      <SectionContainer fullPage style={{flex: 1}}>
        <NotList />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer fullPage style={{flex: 1}}>
      <FlatList
        data={searchedPopupStores}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderPopupItem}
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoading && searchedPopupStores.length > 0 ? (
            <View style={{paddingVertical: 20}}>
              <ActivityIndicator size="small" color={themeColors().blue.main} />
            </View>
          ) : null
        }
      />
    </SectionContainer>
  );
};

// Screen Components for each Tab
const OperatingPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.OPERATING} />
);
const NotOpenedPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.NOTYET} />
);
const ClosedPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.TERMINATED} />
);

interface CustomTabBarProps
  extends MaterialTopTabBarProps,
    FilterContainerProps {
  insets?: EdgeInsets;
}

const TAB_LABELS = ['운영 중', '오픈 예정', '운영 종료'];

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  insets = {top: 0, left: 0, right: 0, bottom: 0},
  onOrderChange,
  onFilterChange,
}) => {
  return (
    <>
      <View style={[tabBarStyles.tabBarContainer, {paddingTop: insets.top}]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = TAB_LABELS[index];

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{
                ...tabBarStyles.tabButton,
                borderBottomColor: isFocused
                  ? themeColors().blue.main
                  : 'transparent',
              }}>
              <Text style={tabBarStyles.tabLabel}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
      <FilterContainer
        onOrderChange={onOrderChange}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

const FilterContainer: React.FC<FilterContainerProps> = ({
  onOrderChange,
  onFilterChange,
}) => {
  const {isSetting, setIsSetting} = usePopupScreenStore();

  const handlePress = () => {
    onFilterChange();
  };

  return (
    <View style={filterStyles.filterContainer}>
      <GradientButton
        onPress={handlePress}
        isSelected={isSetting}
        selectedButtonName="필터 적용"
        unSelectedButtonName="필터 설정"
        useOptionalNames
      />
      <BlankDropdown
        buttonStyle={{width: 130}}
        data={REVIEW_ORDER_TYPES}
        onSelect={selectedItem =>
          usePopupScreenStore
            .getState()
            .setSelectedOrderType(selectedItem.value)
        }
      />
    </View>
  );
};
// Styled Components and StyleSheets
const ScreenContainer = styled.View`
  position: relative;
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const ScreenContent = styled.View`
  flex: 1;
`;

const tabBarStyles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 3,
  },
  tabLabel: {
    color: themeColors().grey.black,
  },
});

const filterStyles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const popupItemStyles = StyleSheet.create({
  popupItemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
