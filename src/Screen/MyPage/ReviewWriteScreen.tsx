// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Pressable,
//   Dimensions,
// } from 'react-native';
// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import globalColors from '../../styles/color/globalColors';
// import OptionSingleButton from '../../components/atoms/button/OptionSingleButton';
// import PlusSvg from '../../assets/icons/plus.svg';
// import ImageDeleteSvg from '../../assets/icons/imageDelete.svg';
// import CompleteButton from '../../components/atoms/button/CompleteButton';
// import DismissKeyboardView from '../../components/DismissKeyboardView';
// import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
// import useCreateReview from '../../hooks/review/useCreateReview.tsx';
// import {useImageSelector} from '../../hooks/useImageSelector.tsx';
// import getDetailPopUp from '../../Axios/popup/⭐\uFE0FdetailPopUp.ts';
// import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
// import Text20B from '../../styles/texts/title/Text20B.ts';
// import ReviewWriteBadgeAuthSvg from 'src/Resource/svg/review-authorized-text-badge.svg';
// import Text14M from '../../styles/texts/body_medium/Text14M.ts';
// import {useDispatch} from 'react-redux';
// import {setReviewSubmitted} from '../../redux/slices/reviewSubmittedSlice.ts';
// import ReviewWriteTipSvg from 'src/Resource/svg/review-write-tip-mini-icon.svg';
// import Text16B from '../../styles/texts/body_medium_large/Text16B.ts';
// import Text14B from '../../styles/texts/body_medium/Text14B.ts';
// const {width: screenWidth} = Dimensions.get('window');
//
// type ReviewWriteScreenRouteProp = RouteProp<
//   AppNavigatorParamList,
//   'ReviewWrite'
// >;
//
// function ReviewWriteScreen() {
//   const dispatch = useDispatch();
//   const route = useRoute<ReviewWriteScreenRouteProp>();
//   const navigation = useNavigation();
//   const {name, id, isVisited} = route.params;
//   const {createReview, loading} = useCreateReview();
//   const {selectedImages, handleSelectImages, handleRemoveImage} =
//     useImageSelector();
//   const popupId = id;
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [completeModalVisible, setCompleteModalVisible] = useState(false);
//   const openCompleteModal = () => setCompleteModalVisible(true);
//   const closeCompleteModal = () => {
//     setCompleteModalVisible(false);
//     navigation.goBack();
//   };
//
//   const [selectedVisitTime, setSelectedVisitTime] = useState<string | null>(
//     null,
//   );
//   const [selectedSatisfaction, setSelectedSatisfaction] = useState<
//     string | null
//   >(null);
//   const [selectedCongestion, setSelectedCongestion] = useState<string | null>(
//     null,
//   );
//   const [review, setReview] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//
//   useEffect(() => {
//     navigation.setOptions({
//       title: isVisited ? '인증 후기 작성' : '일반 후기 작성',
//     });
//   }, [isVisited, navigation]);
//
//   const handleSubmit = async () => {
//     if (!isSubmitEnabled) {
//       return;
//     }
//     let nickname = 'OO';
//     const response = await createReview(
//       popupId ?? 1,
//       review,
//       selectedVisitTime ?? '',
//       selectedSatisfaction ?? '',
//       selectedCongestion ?? '',
//       nickname, // @ts-ignore
//       selectedImages,
//       isVisited,
//     );
//     if (response.success) {
//       const resp = await getDetailPopUp(popupId);
//       if (resp.success) {
//         closeCompleteModal();
//         dispatch(setReviewSubmitted(true));
//       }
//     } else if (response.error) {
//       // console.error('Review submission error:', response.error.message);
//     }
//   };
//
//   const isSubmitEnabled =
//     selectedVisitTime !== null &&
//     selectedSatisfaction !== null &&
//     selectedCongestion !== null &&
//     review.trim().length >= 10;
//
//   const characterCount = review.length;
//   const isOverLimit = characterCount > 200;
//   const isReviewValid = characterCount >= 10;
//
//   return (
//     <DismissKeyboardView style={styles.container}>
//       <View style={styles.titleRow}>
//         <View style={styles.titleContainer}>
//           <Text style={Text20B.text} numberOfLines={2} ellipsizeMode="tail">
//             {name}
//           </Text>
//         </View>
//         {/*{isVisited ? (*/}
//         {/*  <ReviewWriteBadgeAuthSvg style={{height: '80%'}} />*/}
//         {/*) : (*/}
//         {/*  <Text style={[Text14M.text, {color: globalColors.font}]}>*/}
//         {/*    일반 후기*/}
//         {/*  </Text>*/}
//         {/*)}*/}
//       </View>
//       <View style={styles.sectionContainer}>
//         <Text style={[Text14B.text, {color: globalColors.purple}, {width: 65}]}>
//           방문 일시
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.scrollView}>
//           {['평일 오전', '평일 오후', '주말 오전', '주말 오후'].map(
//             (time, index) => (
//               <OptionSingleButton
//                 key={index}
//                 id={index.toString()}
//                 title={time}
//                 onPress={() => setSelectedVisitTime(time)}
//                 isSelected={selectedVisitTime === time}
//               />
//             ),
//           )}
//         </ScrollView>
//       </View>
//
//       <View style={styles.sectionContainer}>
//         <Text style={[Text14B.text, {color: globalColors.purple}, {width: 65}]}>
//           팝업 만족도
//         </Text>
//         <View style={styles.buttonsContainer}>
//           {['만족', '보통', '불만족'].map((satisfaction, index) => (
//             <OptionSingleButton
//               key={index}
//               id={index.toString()}
//               title={satisfaction}
//               onPress={() => setSelectedSatisfaction(satisfaction)}
//               isSelected={selectedSatisfaction === satisfaction}
//             />
//           ))}
//         </View>
//       </View>
//       <View style={styles.sectionContainer}>
//         <Text style={[Text14B.text, {color: globalColors.purple}, {width: 65}]}>
//           혼잡도
//         </Text>
//         <View style={styles.buttonsContainer}>
//           {['여유', '보통', '혼잡'].map((congestion, index) => (
//             <OptionSingleButton
//               key={index}
//               id={index.toString()}
//               title={congestion}
//               onPress={() => setSelectedCongestion(congestion)}
//               isSelected={selectedCongestion === congestion}
//             />
//           ))}
//         </View>
//       </View>
//       <Text
//         style={[
//           styles.hintText,
//           {color: isReviewValid ? globalColors.blue : globalColors.font},
//         ]}>
//         ✓ 10자 이상
//       </Text>
//       <TextInput
//         style={[
//           styles.reviewInput,
//           {
//             borderColor: isReviewValid
//               ? globalColors.blue
//               : globalColors.warmGray,
//           },
//         ]}
//         multiline
//         placeholder="팝업에 대한 후기를 입력해 주세요. 부적절하거나 불쾌감을 줄 수 있는 컨텐츠를 게시할 경우 제재를 받을 수 있습니다."
//         placeholderTextColor={globalColors.font}
//         maxLength={200}
//         value={review}
//         onChangeText={setReview}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//       />
//       <Text style={[styles.characterCount, isOverLimit && styles.overLimit]}>
//         {characterCount}/200
//       </Text>
//       <View style={styles.tipContainer}>
//         <ReviewWriteTipSvg />
//         <Text style={[Text16B.text, styles.tipTitle]}>
//           팝핀이 알려주는 후기작성 TIP!
//         </Text>
//       </View>
//       <View style={styles.tipContentContainer}>
//         <Text style={[Text14M.text, styles.tipText]}>
//           •<Text style={{color: globalColors.blue}}>어떤 프로그램</Text>이
//           있었나요
//         </Text>
//         <Text style={[Text14M.text, styles.tipText]}>
//           •<Text style={{color: globalColors.blue}}>혼잡도</Text>는 어땠나요
//         </Text>
//         <Text style={[Text14M.text, styles.tipText]}>
//           •<Text style={{color: globalColors.blue}}>나만의 꿀팁</Text>이 있나요
//         </Text>
//       </View>
//       <View style={styles.imagesContainer}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           scrollEnabled={selectedImages.length >= 2}
//           contentContainerStyle={[styles.imagesContainer]}>
//           {selectedImages.length < 5 && (
//             <Pressable
//               style={styles.addImageButton}
//               onPress={handleSelectImages}>
//               <PlusSvg />
//               <Text style={styles.addImageText}>
//                 {'사진 추가하기\n(최대 5장)'}
//               </Text>
//             </Pressable>
//           )}
//           {selectedImages.map((image, index) => (
//             <View key={index} style={styles.imageContainer}>
//               <Image source={{uri: image.uri}} style={styles.selectedImage} />
//               <TouchableOpacity
//                 style={styles.deleteIcon}
//                 onPress={() => handleRemoveImage(index)}>
//                 <ImageDeleteSvg />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//       <View style={{paddingBottom: 40}}>
//         <CompleteButton
//           title="작성 완료"
//           onPress={() => setIsModalVisible(true)}
//           disabled={!isSubmitEnabled || loading}
//         />
//       </View>
//       <TwoSelectConfirmationModal
//         isVisible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         onConfirm={handleSubmit}
//         mainAlertTitle="후기를 제출할까요?"
//         subAlertTitle="한번 제출한 후기는 수정할 수 없습니다."
//         selectFirstText="한번 더 확인 할래요"
//         selectSecondText="네, 제출할래요"
//       />
//     </DismissKeyboardView>
//   );
// }
//
// const styles = StyleSheet.create({
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   titleContainer: {
//     width: screenWidth, // 화면 너비의 60%
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: globalColors.white,
//   },
//   sectionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   reviewInput: {
//     borderWidth: 1,
//     borderColor: globalColors.warmGray,
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//     textAlignVertical: 'top',
//     height: 150,
//     fontSize: 14,
//   },
//   imagesContainer: {
//     flexDirection: 'row',
//   },
//   addImageButton: {
//     width: 150,
//     height: 150,
//     borderWidth: 1,
//     borderColor: globalColors.warmGray,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   addImageText: {
//     fontSize: 12,
//     color: globalColors.font,
//     textAlign: 'center',
//   },
//   imageContainer: {
//     position: 'relative',
//     marginRight: 10,
//   },
//   selectedImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
//   },
//   deleteIcon: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//   },
//   characterCount: {
//     textAlign: 'right',
//     marginTop: 5,
//     fontSize: 14,
//     color: globalColors.font,
//   },
//   overLimit: {
//     color: 'red',
//   },
//   tipContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   tipTitle: {
//     color: globalColors.blue,
//     marginLeft: 10,
//   },
//   tipContentContainer: {
//     marginBottom: 20,
//   },
//   tipText: {
//     color: globalColors.font,
//     marginBottom: 5,
//   },
//   hintText: {
//     marginBottom: 5,
//     fontSize: 14,
//   },
// });
//
// export default ReviewWriteScreen;
