import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import globalColors from '../../styles/color/globalColors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBlueSvg from '../../assets/icons/searchBlue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InterestSampleSvg from '../../assets/images/interestSample.svg';
import DividerLine from '../../components/DividerLine.tsx';
import CustomSelectDropdown from '../../components/CustomDropDown.tsx';
import OrderSvg from '../../assets/icons/order.svg';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import FilterSettingButton from '../../components/atoms/button/FilterSettingButton.tsx';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import FindCard from '../../components/findPopup/FindCard.tsx';
import FindFilterBackdrop from '../../components/findPopup/FindFilterBackdrop.tsx';
import BottomSheetModal, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import FindFilterBottomSheet from '../../components/findPopup/FindFilterBackdrop.tsx';
import PopupTag from '../../components/findPopup/PopupTag.tsx';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import OperatingTab from '../../components/findPopup/tabs/OperationTab.tsx';
import UpcomingTab from '../../components/findPopup/tabs/UpcomingTab.tsx';
import ClosedTab from '../../components/findPopup/tabs/ClosedTab.tsx';

const findOrderTypes = [
  '최근 오픈 순',
  '종료 임박 순',
  '조회 순',
  '최신 업로드 순',
];

const Tab = createMaterialTopTabNavigator();

// function OperatingTab() {
//   const [backdropVisible, setBackdropVisible] = useState(false);
//   const [filtersParams, setFiltersParams] = useState<TSelectedTag[]>([]);
//   const [selectedTags, setSelectedTags] = useState<TFilter[]>(POPUUP_TYPES);

//   const bottomSheetRef = useRef<any>(null);

//   const toggleBackdrop = () => {
//     setBackdropVisible(!backdropVisible);
//     // if (bottomSheetRef.current) {
//     //   if (backdropVisible) {
//     //     bottomSheetRef.current.snapTo(0); // 바텀 시트 닫기
//     //   } else {
//     //     bottomSheetRef.current.snapTo(0.6); // 바텀 시트 열기 (화면의 반 정도 차지)
//     //   }
//     // }
//   };

//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   // variables
//   const snapPoints = useMemo(() => ['98%'], []);

//   // callbacks
//   const handlePresentModal = useCallback((action: () => void) => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleClick = (tid: number) => {
//     setSelectedTags(prev => {
//       return prev.map(item => {
//         if (item.id === tid) {
//           return {...item, selected: !item.selected};
//         } else {
//           return item;
//         }
//       });
//     });
//   };
//   const tagDeletClick = (tid: number) => {
//     setSelectedTags(prev => {
//       return prev.map(item => {
//         if (item.id === tid) {
//           return {...item, selected: false};
//         } else {
//           return item;
//         }
//       });
//     });
//   };
//   // 화면클릭시 모달 내려감
//   const renderBackdrop = useCallback(
//     (
//       props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
//     ) => (
//       <BottomSheetBackdrop
//         {...props}
//         pressBehavior="close"
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//       />
//     ),
//     [],
//   );
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   const openBottomSheet = () => {
//     bottomSheetModalRef.current?.expand();
//   };
//   return (
//     <>
//       <ScrollView>
//         <View style={styles.headerContainer}>
//           <FilterSettingButton onPress={openBottomSheet} />
//           <CustomSelectDropdown
//             data={findOrderTypes}
//             onSelect={(selectedItem, index) => console.log(selectedItem, index)}
//             buttonWidth={120}
//             iconComponent={<OrderSvg style={styles.dropdownIcon} />}
//             buttonTextAfterSelection={(selectedItem, index) => selectedItem}
//             buttonTextStyle={Text14M.text}
//           />
//         </View>
//         <DividerLine height={1} />

//         {dummydata.map(item => {
//           return <FindCard key={item.id} item={item} />;
//         })}

//         <DividerLine height={1} />
//       </ScrollView>
//       <BottomSheetModal
//         ref={bottomSheetModalRef}
//         index={0}
//         backdropComponent={renderBackdrop}
//         snapPoints={snapPoints}
//         onChange={handleSheetChanges}>
//         <BottomSheetView style={styles.bottomSheetContent}>
//           <Text style={styles.popupTitle}>
//             찾고 싶은 팝업의 카테고리를 선택해 주세요
//           </Text>
//           <View>
//             <Text style={{textAlign: 'center', fontSize: 15}}>
//               팝업카테고리
//             </Text>
//             <View
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 height: 'auto',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 gap: 15,
//                 padding: 20,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {selectedTags.slice(0, 14).map(item => {
//                 return (
//                   <PopupTag key={item.id} item={item} onClick={handleClick} />
//                 );
//               })}
//             </View>
//             <Text style={{textAlign: 'center', fontSize: 15}}>팝업 유형</Text>
//             <View
//               style={{
//                 display: 'flex',
//                 width: '100%',
//                 height: 'auto',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 gap: 20,
//                 padding: 20,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               {selectedTags.slice(14, POPUUP_TYPES.length).map(item => {
//                 return (
//                   <PopupTag key={item.id} item={item} onClick={handleClick} />
//                 );
//               })}
//             </View>
//           </View>
//           <View style={styles.diverLine}></View>
//           <View
//             style={{
//               width: '100%',
//               height: 60,
//               display: 'flex',
//               flexDirection: 'row',
//               gap: 10,
//               padding: 10,
//             }}>
//             {selectedTags.map(tag => {
//               if (tag.selected) {
//                 return (
//                   <PopupTag tagDeletClick={tagDeletClick} selected item={tag} />
//                 );
//               }
//               return null;
//             })}
//           </View>
//           <View
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//               gap: 15,
//             }}>
//             <View
//               style={{
//                 width: '50%',
//                 height: 50,
//                 borderWidth: 1,
//                 borderColor: 'blue',
//                 borderStyle: 'solid',
//                 borderRadius: 30,

//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Text>초기화</Text>
//             </View>

//             <View
//               style={{
//                 width: '50%',
//                 height: 50,
//                 borderWidth: 1,
//                 borderColor: 'gray',
//                 borderStyle: 'solid',
//                 borderRadius: 30,
//                 backgroundColor: 'blue',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Text style={{color: 'white'}}>필터적용하기</Text>
//             </View>
//           </View>
//         </BottomSheetView>
//       </BottomSheetModal>
//     </>
//   );
// }

// function UpcomingTab() {
//   return (
//     <ScrollView>
//       <View style={styles.headerContainer}>
//         <FilterSettingButton
//           onPress={() => {
//             console.log('filter');
//           }}
//         />
//         <CustomSelectDropdown
//           data={findOrderTypes}
//           onSelect={(selectedItem, index) => console.log(selectedItem, index)}
//           buttonWidth={120}
//           iconComponent={<OrderSvg style={styles.dropdownIcon} />}
//           buttonTextAfterSelection={(selectedItem, index) => selectedItem}
//           buttonTextStyle={Text14M.text}
//         />
//       </View>

//       <DividerLine height={1} />

//       {dummydata.map(item => {
//         return <FindCard key={item.id} item={item} />;
//       })}
//     </ScrollView>
//   );
// }

// function ClosedTab() {
//   return (
//     <ScrollView>
//       <View style={styles.headerContainer}>
//         <FilterSettingButton
//           onPress={() => {
//             console.log('filter');
//           }}
//         />
//         <CustomSelectDropdown
//           data={findOrderTypes}
//           onSelect={(selectedItem, index) => console.log(selectedItem, index)}
//           buttonWidth={120}
//           iconComponent={<OrderSvg style={styles.dropdownIcon} />}
//           buttonTextAfterSelection={(selectedItem, index) => selectedItem}
//           buttonTextStyle={Text14M.text}
//         />
//       </View>
//       <DividerLine height={1} />
//       {dummydata.map(item => {
//         return <FindCard type="close" key={item.id} item={item} />;
//       })}
//       {/*
//       <SampleInterestPopUpCard
//         Svg={InterestSampleSvg}
//         title="팝업 스토어 이름1"
//         date="2024.01.01-2024.02.02"
//         status={'운영 중'}
//       />
//       <SampleInterestPopUpCard
//         Svg={InterestSampleSvg}
//         title="팝업 스토어 이름1"
//         date="2024.01.01-2024.02.02"
//         status={'운영 중'}
//       />
//       <SampleInterestPopUpCard
//         Svg={InterestSampleSvg}
//         title="팝업 스토어 이름1"
//         date="2024.01.01-2024.02.02"
//         status={'운영 중'}
//       /> */}
//     </ScrollView>
//   );
// }

function FindScreen({navigation}: any) {
  const [selectedTab, setSelectedTab] = useState('operating'); // 'operating', 'upcoming', 'closed'
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

        <Tab.Navigator>
          <Tab.Screen name="운영 중" component={OperatingTab} />
          <Tab.Screen name="오픈 예정" component={UpcomingTab} />
          <Tab.Screen name="운영 종료" component={ClosedTab} />
        </Tab.Navigator>
      </SafeAreaView>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
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
});

export default FindScreen;
