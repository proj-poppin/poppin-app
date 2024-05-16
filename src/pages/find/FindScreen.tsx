import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBlueSvg from '../../assets/icons/searchBlue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InterestSampleSvg from '../../assets/images/interestSample.svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import DividerLine from '../../components/DividerLine.tsx';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import OrderSvg from '../../assets/icons/order.svg';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import FilterSettingButton from '../../components/atoms/button/FilterSettingButton.tsx';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import FindCard from '../../components/findPopup/FindCard.tsx';
import FindFilterBackdrop from '../../components/findPopup/FindFilterBackdrop.tsx';
import {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import FindFilterBottomSheet from '../../components/findPopup/FindFilterBackdrop.tsx';
import CategorySelectButton from '../../components/findPopup/CategorySelectButton.tsx';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import BackMiddleButton from '../../components/atoms/button/BackMiddleButton.tsx';
import NextMiddleButton from '../../components/atoms/button/NextMiddleButton.tsx';
import {POPUUP_TYPES} from '../../components/findPopup/constants.ts';
import useGetFindPopupList from '../../hooks/findpopup/useGetFindPopupList.tsx';
import NotyetTab from './tab/NotyetTab.tsx';
import OperationTab from './tab/OperatonTab.tsx';
import ClosedTab from './tab/ClosedTab.tsx';

export const FINDORDER_TYPES = [
  {label: '최근 오픈 순', value: 'OPEN'},
  {label: '종료 임박 순', value: 'CLOSE'},
  {label: '조회 순', value: 'VIEW'},
  {label: '최신 업로드 순', value: 'UPLOAD'},
];
const TabNames: {[key: string]: string} = {
  '운영 중': 'NOTYET',
  '오픈 예정': 'OPERATING',
  '운영 종료': 'TERMINATING',
};

const Tab = createMaterialTopTabNavigator();

type TFilter = {id: number; name: string; selected: boolean};

function FindScreen({navigation, route}: any) {
  const [availableTags, setAvailableTags] = useState<TFilter[]>(POPUUP_TYPES);
  const [selectedTags, setSelectedTags] = useState<TFilter[]>(availableTags);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedTab, setSelectedTab] = useState('운영 중');
  const [selectedOrder, setSelectedOrder] = useState('OPEN');
  const [searchKeyword, setSearchKeyword] = useState('안녕');
  const [isSettingApplied, setIsSettingApplied] = useState(false);
  const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
    useState(false);

  useEffect(() => {
    if (route.params) {
      const {searchText} = route.params;
    }
  }, [route]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    data: findPopupListData,
    loading: findPopupListLoading,
    error: findPopupListError,
  } = useGetFindPopupList(
    page,
    size,
    selectedTab === '운영 중'
      ? 'NOTYET'
      : selectedTab === '오픈 예정'
      ? 'OPERATING'
      : 'TERMINATING',

    selectedOrder,
    availableTags,
    searchKeyword,
  );

  // console.log('findPopupListData', findPopupListData);
  console.log('sele', selectedTab);

  // console.log('ava', availableTags);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);

    setSelectedOrder('OPEN');
  };

  const handleCategoryClick = () => {
    setAvailableTags(selectedTags);
  };

  const handleOrderSelect = (value: any) => {
    const orderValue = FINDORDER_TYPES[value].value;
    console.log('orderValue', orderValue);
    setSelectedOrder(orderValue);
  };

  useEffect(() => {
    const isSelected = selectedTags.some(tag => tag.selected);
    setIsOneMoreCategorySelected(isSelected);
  }, [selectedTags]);

  // variables
  const snapPoints = useMemo(() => ['77%'], []);

  const handlePresentModal = useCallback(
    (action: () => void) => {
      setSelectedTags(availableTags);
      bottomSheetModalRef.current?.present();
    },
    [availableTags],
  );

  const handleClick = (selectedTag: any) => {
    setSelectedTags(prev => {
      return prev.map(item => {
        if (item.id === selectedTag.id) {
          return {...item, selected: !item.selected};
        } else {
          return item;
        }
      });
    });
  };
  const tagDeleteClick = (tid: number) => {
    setSelectedTags(prev => {
      return prev.map(item => {
        if (item.id === tid) {
          return {...item, selected: false};
        } else {
          return item;
        }
      });
    });
  };
  // 화면클릭시 모달 내려감
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        onPress={handleBackdropPress}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleBackdropPress = () => {
    if (!isSettingApplied) {
      bottomSheetModalRef.current?.close();
      setSelectedTags(availableTags);
    }
  };

  return (
    <>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: globalColors.white}]}>
        <View style={styles.headerContainer}>
          <Text style={Text24B.text}>팝업 목록</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('findInputScreen');
            }}
            style={styles.calendarViewContainer}>
            <SearchBlueSvg />
          </TouchableOpacity>
        </View>

        <Tab.Navigator
          initialRouteName={selectedTab}
          // tabBar={props => (
          //   <View style={styles.tabBar}>

          //     {props.state.routes.map((route, index) => (
          //       <TouchableOpacity
          //         key={index}
          //         style={[
          //           styles.tabItem,
          //           {borderBottomWidth: props.state.index === index ? 5 : 0},
          //         ]}
          //         onPress={() => handleTabPress(props, route.name)}>
          //         <Text
          //           style={[
          //             props.state.index === index
          //               ? styles.activeTab
          //               : styles.inactiveTab,
          //           ]}>
          //           {route.name}
          //         </Text>
          //       </TouchableOpacity>
          //     ))}
          //   </View>
          // )}

          // 탭이 선택될 때의 동작 구현
          tabBar={({state, descriptors, navigation}) => {
            return (
              <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                  {state.routes.map((route, index) => {
                    console.log('route', route);
                    return (
                      <TouchableOpacity
                        key={route.key}
                        style={[
                          styles.tabItem,
                          {
                            borderBottomWidth: state.index === index ? 5 : 0,
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
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={styles.filterContainer}>
                  <FilterSettingButton
                    onPress={handlePresentModal}
                    isSetting={isSettingApplied}
                  />
                  <CustomSelectDropdown
                    data={FINDORDER_TYPES}
                    onSelect={
                      (selectedItem: any, index: any) =>
                        handleOrderSelect(index)
                      // console.log(selectedItem, index)
                    }
                    buttonWidth={120}
                    iconComponent={<OrderSvg style={styles.dropdownIcon} />}
                    buttonTextAfterSelection={(selectedItem: any, index: any) =>
                      selectedItem
                    }
                    buttonTextStyle={Text14M.text}
                  />
                </View>
              </View>
            );
          }}>
          <Tab.Screen name="운영 중">
            {() => (
              <NotyetTab
                data={selectedTab === '운영 중' ? findPopupListData : []}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="오픈 예정">
            {() => (
              <OperationTab
                data={selectedTab === '오픈 예정' ? findPopupListData : []}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="운영 종료">
            {() => (
              <ClosedTab
                data={selectedTab === '운영 종료' ? findPopupListData : []}
                type="close"
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
      <View style={styles.modalContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={styles.popupTitle}>
              찾고 싶은 팝업의 카테고리를 선택해 주세요
            </Text>
            <Text style={styles.popCat}>팝업 카테고리</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(0, 14).map(item => {
                return (
                  <CategorySelectButton
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              })}
            </View>
            <Text style={styles.popType}>팝업 유형</Text>
            <View style={styles.popWrapper}>
              {selectedTags.slice(14, POPUUP_TYPES.length).map(item => {
                return (
                  <CategorySelectButton
                    key={item.id}
                    item={item}
                    onClick={handleClick}
                  />
                );
              })}
            </View>
          </View>
          <DividerLine height={2} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.popSelectedWrapper}>
              {selectedTags.map(tag => {
                if (tag.selected) {
                  return (
                    <CategorySelectButton
                      onClick={() => {}}
                      tagDeleteClick={tagDeleteClick}
                      selected
                      item={tag}
                    />
                  );
                }
                return null;
              })}
            </View>
          </ScrollView>
          <View style={styles.buttonsWrapper}>
            <BackMiddleButton
              onPress={() => {
                setIsSettingApplied(false);
                setAvailableTags(POPUUP_TYPES);
                setSelectedTags(POPUUP_TYPES);
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
    // 필요한 경우 여기에 다른 스타일 추가
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
  //
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
    gap: 10,
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
});

export default FindScreen;
