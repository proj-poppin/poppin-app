// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
// } from 'react-native';
// import globalColors from '../../../styles/color/globalColors.ts';
// import DismissKeyboardView from '../../../components/DismissKeyboardView.tsx';
// import CompleteButton from '../../../components/atoms/button/CompleteButton.tsx';
// import CustomOKModal from '../../../components/CustomOKModal.tsx';
// import Text20B from '../../../styles/texts/title/Text20B.ts';
// import Text12R from '../../../styles/texts/label/Text12R.ts';
// import {POP_UP_TYPES, TFilter} from './types.ts';
// import CategorySelectButton from '../../../components/findPopup/CategorySelectButton.tsx';
// import {useSelector} from 'react-redux';
// import useGetPreferenceSetting from '../../../hooks/myPage/useGetPreferenceSetting.tsx';
// import usePutPreferenceSetting from '../../../hooks/myPage/usePutSetting.tsx';
// import CloseSvg from '../../../assets/icons/close.svg';
// import {useAppDispatch} from '../../../redux/stores';
// import {triggerPreferenceRefresh} from '../../../redux/slices/preferenceRefreshSlice.ts';
// function PreferenceSettingScreen({navigation, route}: any) {
//   const {data} = useGetPreferenceSetting();
//
//   const {putPreference, success, loading} = usePutPreferenceSetting();
//   const user = useSelector((state: any) => state.user);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedTags, setSelectedTags] = useState<any>(POP_UP_TYPES);
//   const [initialTags, setInitialTags] = useState<any>(POP_UP_TYPES);
//   const [isOneMoreCategorySelected, setIsOneMoreCategorySelected] =
//     useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const dispatch = useAppDispatch();
//
//   useEffect(() => {
//     if (route.params?.fromHome) {
//       navigation.setOptions({
//         headerLeft: () => (
//           <Pressable
//             onPress={() => {
//               navigation.navigate('Home', {shouldRefresh: true});
//             }}
//             style={{padding: 10}}>
//             <CloseSvg />
//           </Pressable>
//         ),
//       });
//     }
//   }, [navigation, route.params?.fromHome]);
//
//   const handleCloseModal = () => {
//     setModalVisible(false);
//     if (route.params?.fromHome) {
//       navigation.navigate('Home', {shouldRefresh: true});
//     } else {
//       dispatch(triggerPreferenceRefresh());
//       navigation.navigate('MyPage');
//     }
//   };
//
//   const handleClick = (selectedTag: TFilter) => {
//     setSelectedTags(prev =>
//       prev.map(item =>
//         item.id === selectedTag.id ? {...item, selected: !item.selected} : item,
//       ),
//     );
//   };
//
//   const tagDeleteClick = (tid: number) => {
//     setSelectedTags(prev =>
//       prev.map(item => (item.id === tid ? {...item, selected: false} : item)),
//     );
//   };
//
//   const checkSelectionInRanges = (tags: any) => {
//     const range1 = tags.slice(0, 13); // id 1-13
//     const range2 = tags.slice(13, 17); // id 14-17
//     const range3 = tags.slice(17, 21); // id 18-21
//
//     const isRange1Selected = range1.some((tag: any) => tag.selected);
//     const isRange2Selected = range2.some((tag: any) => tag.selected);
//     const isRange3Selected = range3.some((tag: any) => tag.selected);
//
//     return isRange1Selected && isRange2Selected && isRange3Selected;
//   };
//
//   const handleSubmit = async () => {
//     setModalVisible(true);
//     await putPreference(selectedTags);
//   };
//
//   const checkIfTagsChanged = (initialTags: any, currentTags: any) => {
//     for (let i = 0; i < initialTags.length; i++) {
//       if (initialTags[i].selected !== currentTags[i].selected) {
//         return true;
//       }
//     }
//     return false;
//   };
//
//   useEffect(() => {
//     const isSelected = checkSelectionInRanges(selectedTags);
//     setIsOneMoreCategorySelected(isSelected);
//
//     if (data) {
//       const hasChanged = checkIfTagsChanged(initialTags, selectedTags);
//       setIsButtonDisabled(!isSelected || !hasChanged);
//     }
//   }, [selectedTags, data]);
//
//   useEffect(() => {
//     if (data) {
//       setSelectedTags(data);
//       setInitialTags(data);
//     }
//   }, [data]);
//
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={globalColors.purple} />
//       </View>
//     );
//   }
//
//   return (
//     <DismissKeyboardView style={styles.container}>
//       <View>
//         <Text style={[Text20B.text, {marginTop: 20, marginBottom: 10}]}>
//           <Text style={{color: globalColors.blue}}>{user.nickname}</Text>
//           <Text>{'님의 팝업 취향을'}</Text>
//         </Text>
//         <View style={styles.selectionRow}>
//           <Text style={[Text20B.text, {marginBottom: 10}]}>
//             {'선택해주세요'}
//           </Text>
//           <Text style={[Text12R.text, {marginLeft: 4, marginTop: 7}]}>
//             {'(카테고리 당 1개 이상 필수 선택)'}
//           </Text>
//         </View>
//       </View>
//       <Text style={styles.popCat}>팝업 유형</Text>
//       <View style={styles.popWrapper}>
//         {selectedTags.slice(13, 17).map(item => (
//           <CategorySelectButton
//             key={item.id}
//             item={item}
//             onClick={handleClick}
//             tagDeleteClick={tagDeleteClick}
//           />
//         ))}
//       </View>
//       <Text style={styles.popCat}>관심사</Text>
//       <View style={styles.popWrapper}>
//         {selectedTags.slice(0, 13).map(item => (
//           <CategorySelectButton
//             key={item.id}
//             item={item}
//             onClick={handleClick}
//             tagDeleteClick={tagDeleteClick}
//           />
//         ))}
//       </View>
//       <Text style={styles.popCat}>팝업 MATE</Text>
//       <View style={styles.popWrapper}>
//         {selectedTags.slice(17, POP_UP_TYPES.length).map(item => (
//           <CategorySelectButton
//             key={item.id}
//             item={item}
//             onClick={handleClick}
//             tagDeleteClick={tagDeleteClick}
//           />
//         ))}
//       </View>
//       <CompleteButton
//         onPress={handleSubmit}
//         title={'설정 저장하기'}
//         disabled={isButtonDisabled}
//       />
//       <CustomOKModal
//         isVisible={modalVisible}
//         onClose={handleCloseModal}
//         isSuccessModal={true}
//         mainTitle="취향설정이 완료됐어요."
//       />
//     </DismissKeyboardView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: globalColors.white,
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectionRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     marginBottom: 20,
//   },
//   popCat: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   popWrapper: {
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 15,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   popType: {
//     color: globalColors.blue,
//     textAlign: 'center',
//     fontSize: 15,
//   },
// });
// export default PreferenceSettingScreen;
