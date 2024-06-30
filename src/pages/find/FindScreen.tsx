import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import globalColors from '../../styles/color/globalColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBlueSvg from '../../assets/icons/searchBlue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomSelectDropdown from '../../components/CustomDropDown';
import OrderSvg from '../../assets/icons/order.svg';
import Text24B from '../../styles/texts/headline/Text24B';
import FilterSettingButton from '../../components/atoms/button/FilterSettingButton';
import Text14M from '../../styles/texts/body_medium/Text14M';
import CategorySelectButton from '../../components/findPopup/CategorySelectButton';
import BackMiddleButton from '../../components/atoms/button/BackMiddleButton';
import NextMiddleButton from '../../components/atoms/button/NextMiddleButton';
import {POP_UP_TYPES, TFilter} from '../../components/findPopup/constants';
import BackSvg from '../../assets/icons/goBack.svg';
import useBackdrop from '../../hooks/common/useBackDrop.tsx';
import {useReducedMotion} from 'react-native-reanimated';
import FindTab from './FindTab.tsx';
import ToastComponent from '../../components/atoms/toast/ToastComponent.tsx';

export const FIND_ORDER_TYPES = [
  {label: '최근 오픈 순', value: 'OPEN'},
  {label: '종료 임박 순', value: 'CLOSE'},
  {label: '조회 순', value: 'VIEW'},
  {label: '최신 업로드 순', value: 'UPLOAD'},
];

const Tab = createMaterialTopTabNavigator();

type FindScreenProps = {
  navigation: any;
  route: any;
};

function FindScreen({navigation, route}: FindScreenProps) {
  const [availableTags, setAvailableTags] = useState<TFilter[]>(POP_UP_TYPES);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
  const [selectedTab, setSelectedTab] = useState('운영 중');
  const [selectedOrder, setSelectedOrder] = useState('OPEN');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSettingApplied, setIsSettingApplied] = useState(false);
  const reducedMotion = useReducedMotion();
  const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
    useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isShowToast, setIsShowToast] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCategoryClick = () => {
    setAvailableTags(selectedTags);
  };

  const handleOrderSelect = (value: any) => {
    const orderValue = FIND_ORDER_TYPES[value].value;
    setSelectedOrder(orderValue);
  };

  const snapPoints = useMemo(() => ['75%'], []);

  const handlePresentModal = useCallback(() => {
    setSelectedTags(availableTags);
    bottomSheetModalRef.current?.present();
  }, [availableTags]);

  const handleClick = (selectedTag: TFilter) => {
    setSelectedTags(prev =>
      prev.map(item =>
        item.id === selectedTag.id ? {...item, selected: !item.selected} : item,
      ),
    );
  };

  useEffect(() => {
    if (route.params) {
      const {searchText} = route.params;
      setSearchKeyword(searchText);
    }
  }, [route]);

  useEffect(() => {
    const isSelected = selectedTags.some(tag => tag.selected);
    setIsOneMoreCategorySelected(isSelected);
  }, [selectedTags]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
    setTimeout(() => setIsShowToast(false), 1500);
  };

  return (
    <>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        {searchKeyword !== '' ? (
          <View style={styles.searchKeywordContainer}>
            <Pressable
              onPress={() => navigation.navigate('Find', {searchText: ''})}
              style={{padding: 10}}>
              <BackSvg />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('findInputScreen')}
              style={styles.searchInputWrapper}>
              <Text>{searchKeyword}</Text>
              <Pressable
                onPress={() => navigation.navigate('findInputScreen')}
                style={styles.calendarViewContainer}>
                <SearchBlueSvg />
              </Pressable>
            </Pressable>
          </View>
        ) : (
          <View style={styles.headerContainer}>
            <Text style={Text24B.text}>팝업 목록</Text>
            <Pressable
              onPress={() => navigation.navigate('findInputScreen')}
              style={styles.calendarViewContainer}>
              <SearchBlueSvg />
            </Pressable>
          </View>
        )}

        <Tab.Navigator
          initialRouteName={'운영 중'}
          tabBar={({state, navigation}) => {
            return (
              <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                  {state.routes.map((route, index) => {
                    return (
                      <Pressable
                        key={route.key}
                        style={[
                          styles.tabItem,
                          {
                            borderBottomWidth: state.index === index ? 5 : 0,
                            borderColor: globalColors.blue,
                          },
                        ]}
                        onPress={() => {
                          handleTabPress(route.name);
                          navigation.navigate(route.name);
                        }}>
                        <Text
                          style={
                            selectedTab === route.name
                              ? styles.activeTab
                              : styles.inactiveTab
                          }>
                          {route.name === '운영 중'
                            ? '운영 중'
                            : route.name === '오픈 예정'
                            ? '오픈 예정'
                            : '운영 종료'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                <View style={styles.filterContainer}>
                  <FilterSettingButton
                    onPress={handlePresentModal}
                    isSetting={isSettingApplied}
                  />
                  <CustomSelectDropdown
                    data={FIND_ORDER_TYPES}
                    onSelect={(selectedItem: any, index: any) =>
                      handleOrderSelect(index)
                    }
                    buttonWidth={120}
                    iconComponent={<OrderSvg style={styles.dropdownIcon} />}
                    buttonTextAfterSelection={(selectedItem: any) =>
                      selectedItem.label
                    }
                    buttonTextStyle={Text14M.text}
                  />
                </View>
              </View>
            );
          }}>
          <Tab.Screen name="운영 중">
            {() => (
              <FindTab
                status="OPERATING"
                selectedOrder={selectedOrder}
                availableTags={availableTags}
                searchKeyword={searchKeyword}
                showToast={showToast}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="오픈 예정">
            {() => (
              <FindTab
                status="NOTYET"
                selectedOrder={selectedOrder}
                availableTags={availableTags}
                searchKeyword={searchKeyword}
                showToast={showToast}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="운영 종료">
            {() => (
              <FindTab
                status="TERMINATED"
                selectedOrder={selectedOrder}
                availableTags={availableTags}
                searchKeyword={searchKeyword}
                showToast={showToast}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
      <View style={styles.modalContainer}>
        <BottomSheetModal
          animateOnMount={!reducedMotion}
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={useBackdrop}
          snapPoints={snapPoints}>
          <View style={styles.contentContainer}>
            <Text style={styles.popupTitle}>
              찾고 싶은 팝업의 카테고리를 선택해 주세요
            </Text>
            <Text style={styles.popCat}>팝업 카테고리</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(0, 14).map(item => (
                <CategorySelectButton
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  selectedTag={selectedTags}
                  isMultipleSelectionPossible={true}
                />
              ))}
            </View>
            <Text style={styles.popType}>팝업 유형</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(14, 17).map(item => (
                <CategorySelectButton
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                  isMultipleSelectionPossible={true}
                  selectedTag={selectedTags}
                />
              ))}
            </View>
          </View>
          <View style={styles.buttonsWrapper}>
            <BackMiddleButton
              onPress={() => {
                setIsSettingApplied(false);
                setAvailableTags(POP_UP_TYPES);
                setSelectedTags(POP_UP_TYPES);
                bottomSheetModalRef.current?.close();
              }}
              title={'초기화'}
              buttonWidth={'30%'}
            />
            <NextMiddleButton
              onPress={() => {
                setIsSettingApplied(true);
                handleCategoryClick();
                bottomSheetModalRef.current?.close();
              }}
              disabled={!isOneMoreCategorySelected}
              title={'필터 적용하기'}
            />
          </View>
        </BottomSheetModal>
      </View>
      {isShowToast && (
        <ToastComponent
          height={35}
          onClose={() => setIsShowToast(false)}
          message={toastMessage}
          bottom={'40%'}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  diverLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  titleContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  bottomSheetHandle: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  labelSmallBlue: {
    fontFamily: 'Pretandard-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: globalColors.blue,
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 0,
    marginLeft: 16,
    marginRight: 16,
    height: 40,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  calendarViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginLeft: 5, //small gap between the text and the icon
  },
  dropdownButtonStyle: {
    backgroundColor: 'white', // 버튼 배경색을 흰색으로 설정
  },
  rowTextStyle: {
    backgroundColor: globalColors.white,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배열
    alignItems: 'center', // 세로 중앙 정렬
    justifyContent: 'flex-start', // 내용물 사이의 공간 동일하게 배분
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  dropdownStyle: {
    borderRadius: 10,
  },
  tabBarContainer: {
    flexDirection: 'column',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    elevation: 2,
    paddingLeft: 17,
    paddingRight: 17,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTabItem: {
    borderBottomWidth: 5, // 선택된 탭 아래에 선 추가
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomColor: globalColors.blue,
  },
  activeTab: {
    color: 'black',
  },
  inactiveTab: {
    color: 'gray',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  popCat: {
    textAlign: 'center',
    fontSize: 15,
    color: '#C37CD2',
  },
  popWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 20,
    justifyContent: 'center',
  },
  popType: {
    color: globalColors.blue,
    textAlign: 'center',
    fontSize: 15,
  },
  popSelectedWrapper: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    gap: 15,
    padding: 10,
  },
  buttonsWrapper: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  resetButton: {
    width: '35%',
    height: '40%',
    borderWidth: 1,
    borderColor: globalColors.blue,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    width: '55%',
    height: '40%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.blue,
  },
  resetText: {
    color: 'gray',
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    marginHorizontal: 0,
    marginLeft: 16,
    marginRight: 16,
  },
  searchKeywordContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputWrapper: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FindScreen;
