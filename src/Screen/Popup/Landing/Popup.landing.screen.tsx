import React, {useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {LandingBottomTabProps} from 'src/Navigator/Landing.bottomTab.navigator';
import {BlankDropdown} from '../../../Component/Dropdown';
import SearchIcon from 'src/Resource/svg/search-icon.svg';
import {LandingScreenHeader} from '../../../Component/View';
import {themeColors} from 'src/Theme/theme';
import {PopupSortOrder} from '../../../Object/Type/popupSortOrder.type';
import {OperationStatus} from '../../../Object/Type/operationStatus.type';
import {usePopupScreenStore} from './Popup.landing.zustand';
import styled from 'styled-components/native';
import {SectionContainer} from '../../../Unit/View';
import {PopupSchema} from '../../../Schema/Popup/popup.schema';
import {EdgeInsets} from 'react-native-safe-area-context';
import PopupLandingFilterModalContent from '../../../Component/PopupCategoryModal';
import GradientButton from '../../../Component/Button/FilterSettingButton';
import {BlackBackgroundModal} from '../../../Component/Modal';
import PopupStoreCard from '../../../Component/Popup/Landing/PopupSearchCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import CustomBottomSheet from '../../../Component/BottomSheet/CustomBottomSheet';
import PopupCategoryModal from '../../../Component/PopupCategoryModal';

interface SearchBarProps {
  isSearchMode: boolean;
  onSearchToggle: () => void;
  onBackPress: () => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

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

export const PopupLandingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<LandingBottomTabProps, 'PopupLandingScreen'>) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const {
    setSelectedCategories,
    setSelectedPopupStores,
    searchKeyword,
    setSearchKeyword,
    isSetting,
    setIsSetting,
  } = usePopupScreenStore();
  const [selectedOrder, setSelectedOrder] = useState<PopupSortOrder>(
    PopupSortOrder.RECENTLY_OPENED,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const handleFilterChange = (selectedCategories: {
    selectedPopupTypes: string[];
    selectedCategories: string[];
  }) => {
    setSelectedCategories(selectedCategories.selectedCategories.join(','));
    setSelectedPopupStores(selectedCategories.selectedPopupTypes.join(','));
    setModalVisible(false);
    setIsSetting(!isSetting);
  };

  const handleResetFilter = () => {
    setSelectedCategories('');
    setSelectedPopupStores('');
    setModalVisible(false);
    setIsSetting(!isSetting);
  };

  const handleSearchToggle = () => setIsSearchMode(true);
  const handleBackPress = () => {
    setIsSearchMode(false);
    setSearchKeyword('');
  };
  const handleOrderChange = (newOrder: PopupSortOrder) =>
    setSelectedOrder(newOrder);

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
        title={'찾고싶은 팝업의 카테고리를 설정해주세요'}
        height={'70%'}>
        <PopupCategoryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onApply={handleFilterChange} // Apply handler
          onReset={handleResetFilter} // Reset handler
          buttonName={'필터 적용하기'}
          validationMode={'both'}
          initialSelectedCategories={''}
        />
      </CustomBottomSheet>
    </ScreenContainer>
  );
};

// Popup List Screen Component
const PopupListScreen: React.FC<PopupListScreenProps> = ({operationStatus}) => {
  const {
    loadMorePopupStores,
    [operationStatus]: {searchedPopupStores, isLoading, pageInfo},
  } = usePopupScreenStore();
  //
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const handlePressCard = (id: string) => {
    navigation.navigate('PopupDetailScreen', {popupId: id});
  };

  const renderPopupItem = ({item}: {item: PopupSchema}) => (
    <View style={popupItemStyles.popupItemContainer}>
      <PopupStoreCard
        item={item}
        key={item.id}
        onPress={() => {
          handlePressCard(item.id);
        }}
      />
    </View>
  );

  const onEndReached = () => {
    if (!pageInfo.isLast) {
      loadMorePopupStores(operationStatus);
    }
  };

  return (
    <SectionContainer fullPage style={{flex: 1}}>
      <FlatList
        data={searchedPopupStores}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderPopupItem}
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" /> : null
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

export const SearchBar: React.FC<SearchBarProps> = ({
  isSearchMode,
  onSearchToggle,
  onBackPress,
  searchKeyword,
  setSearchKeyword,
}) => {
  const inputStyle = useMemo(
    () => ({
      flex: 1,
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
    }),
    [],
  );
  return isSearchMode ? (
    <SearchContainer>
      <InputWrapper>
        <TextInput
          style={inputStyle}
          onChangeText={setSearchKeyword}
          value={searchKeyword}
          placeholder="텍스트를 입력하세요."
          placeholderTextColor="#666"
          autoFocus={isSearchMode}
        />
        <Pressable onPress={onBackPress}>
          <CancelButtonText>취소</CancelButtonText>
        </Pressable>
      </InputWrapper>
    </SearchContainer>
  ) : (
    <LandingScreenHeader
      title="팝업 찾기"
      RightComponents={
        <Pressable onPress={onSearchToggle}>
          <SearchIcon />
        </Pressable>
      }
    />
  );
};

interface CustomTabBarProps
  extends MaterialTopTabBarProps,
    FilterContainerProps {
  insets?: EdgeInsets;
}

const TAB_LABELS = ['운영 중', '오픈 예정', '운영 종료'];

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
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

const SearchContainer = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
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
