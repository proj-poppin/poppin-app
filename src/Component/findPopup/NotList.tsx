// import React, {useCallback, useMemo, useRef, useState} from 'react';
// import {Text, View, Pressable, StyleSheet, Alert} from 'react-native';
// import globalColors from '../../styles/color/globalColors';
import FindPopupNoList from 'src/Resource/svg/filtered-no-result-popup-image.svg';
import NoListText from 'src/Resource/svg/filtered-no-result-popup-text.svg';
// import Text20B from '../../styles/texts/title/Text20B.ts';
// import CompleteButton from '../button/CompleteButton.tsx';
// import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
// import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
// import BigRightSvg from 'src/Resource/svg/Icons/right-arrow-icon.svg';
// import Text18B from '../../styles/texts/body_large/Text18B.ts';
// import Text16M from '../../styles/texts/body_medium_large/Text16M.ts';
// import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
// import {useNavigation} from '@react-navigation/native';
// import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
// const NotList = () => {
//   const isLoggedIn = useIsLoggedIn();
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => ['40%'], []);
//   const navigation = useNavigation();
//   const [loginModalVisible, setLoginModalVisible] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//
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
//
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);
//
//   const handleNavigation = (route: string) => {
//     navigation.navigate(route);
//     bottomSheetModalRef.current?.dismiss();
//   };
//
//   const handlePresentModal = useCallback(
//     (action: () => void) => {
//       if (isLoggedIn) {
//         bottomSheetModalRef.current?.present();
//       } else {
//         setAlertMessage('로그인이 필요한 서비스입니다.');
//         setLoginModalVisible(true);
//       }
//     },
//     [isLoggedIn],
//   );
//
//   const closeLoginModal = () => {
//     setLoginModalVisible(false);
//   };
//
//   return (
//     <View
//       style={{
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         paddingTop: 40,
//       }}>
//       <Text style={[Text20B.text, {marginBottom: 20}]}>
//         조건에 해당하는 팝업 이벤트가 없어요😥
//       </Text>
//       <FindPopupNoList width="45%" height={200} />
//       <NoListText width={250} height={120} />
//       <CompleteButton
//         onPress={() => handlePresentModal(() => {})}
//         title={'제보하러 가기'}
//         buttonWidth={'90%'}
//       />
//       <View style={styles.modalContainer}>
//         <BottomSheetModal
//           animateOnMount
//           ref={bottomSheetModalRef}
//           index={0}
//           backdropComponent={renderBackdrop}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}>
//           <View style={styles.contentContainer}>
//             <Text style={[Text18B.text, {paddingTop: 15, paddingBottom: 40}]}>
//               제보하는 사람이 누구인가요?
//             </Text>
//             <Pressable
//               style={styles.optionContainer}
//               onPress={() => handleNavigation('UserRegister')}>
//               <View style={styles.optionRow}>
//                 <Text style={[Text18B.text, {color: globalColors.blue}]}>
//                   팝업 이용자
//                 </Text>
//                 <View style={styles.optionRight}>
//                   <Text style={Text18B.text}>제보하기</Text>
//                   <BigRightSvg />
//                 </View>
//               </View>
//               <Text style={[Text16M.text, {paddingTop: 10}]}>
//                 관심있는 팝업이 POPPIN에 올라와 있지 않다면?
//               </Text>
//             </Pressable>
//             <View style={styles.divider} />
//             <Pressable
//               style={styles.optionContainer}
//               onPress={() => handleNavigation('OperatorRegister')}>
//               <View style={styles.optionRow}>
//                 <Text style={[Text18B.text, {color: globalColors.purple}]}>
//                   팝업 운영자
//                 </Text>
//                 <View style={styles.optionRight}>
//                   <Text style={[Text18B.text]}>제보하기</Text>
//                   <BigRightSvg />
//                 </View>
//               </View>
//               <Text style={[Text16M.text, {paddingTop: 10}]}>
//                 운영하는 팝업이 POPPIN에 올라와 있지 않다면?
//               </Text>
//             </Pressable>
//           </View>
//         </BottomSheetModal>
//       </View>
//       <TwoSelectConfirmationModal
//         isVisible={loginModalVisible}
//         onClose={closeLoginModal}
//         onConfirm={() => {
//           navigation.navigate('Entry');
//           closeLoginModal();
//         }}
//         mainAlertTitle="로그인이 필요합니다"
//         subAlertTitle={alertMessage}
//         selectFirstText="나중에 할래요"
//         selectSecondText="로그인하기"
//       />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   optionContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   optionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   optionRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   divider: {
//     height: 2,
//     backgroundColor: globalColors.warmGray,
//     width: '100%',
//     marginBottom: 20,
//   },
// });
//
// export default NotList;
