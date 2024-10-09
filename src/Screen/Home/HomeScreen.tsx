// import React, {useEffect, useState} from 'react';
// import {
//   ActivityIndicator,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import globalColors from '../../styles/color/globalColors.ts';
// import DividerLine from '../../components/DividerLine.tsx';
// import QuestionSvg from '../../assets/icons/question.svg';
// import DownSvg from 'src/Resource/svg/down-arrow-gray-icon.svg';
// import RightSvg from 'src/Resource/svg/right-arrow-gray-icon.svg';
// import Text18B from '../../styles/texts/body_large/Text18B.ts';
// import useGetHotList from '../../hooks/popUpList/useGetHotList.tsx';
// import useGetNewList from '../../hooks/popUpList/useGetNewList.tsx';
// import RowPopUpCard from '../../components/molecules/card/RowPopUpCard.tsx';
// import DismissKeyboardView from '../../components/DismissKeyboardView.tsx';
// import UpSvg from 'src/Resource/svg/up-arrow-gray-icon.svg';
// import HotListCard from '../../components/molecules/card/HotListCard.tsx';
// import useGetClosingList from '../../hooks/popUpList/useGetClosingList.tsx';
// import HotListNoticeSvg from '../../assets/images/hotListNotice.svg';
// import HomeMainTitle from '../../components/organisms/header/HomeMainTitle';
// import ForLoginBox from '../../components/ForLoginBox.tsx';
// import useGetTasteList from '../../hooks/popUpList/useGetTasteList.tsx';
// import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
// import HomeHeader from '../../components/organisms/header/HomeHeader.tsx';
// import useGetPreferenceSettingOnce from '../../hooks/usePreferenceSettingOnce.tsx';
// import useGetUserSetting from '../../hooks/myPage/useGetUserSetting.tsx';
// import Animated, {FadeInDown} from 'react-native-reanimated';
// import {resetPreferenceRefresh} from '../../redux/slices/preferenceRefreshSlice';
// import Text14M from '../../styles/texts/body_medium/Text14M.ts';
//
// function HomeScreen({navigation, route}) {
//   const dispatch = useDispatch();
//   const shouldRefreshHome = useSelector(
//     state => state.preferenceRefresh.shouldRefreshHome,
//   );
//
//   const [showNotice, setShowNotice] = useState(false);
//   const [showHotList, setShowHotList] = useState(true);
//   const {
//     data: hotList,
//     loading: hotListLoading,
//     error: hotListError,
//     refetch: refetchHotList,
//   } = useGetHotList();
//   const {
//     data: newList,
//     loading: newListLoading,
//     error: newListError,
//     refetch: refetchNewList,
//   } = useGetNewList();
//   const {
//     data: closingList,
//     loading: closingListLoading,
//     error: closingListError,
//     refetch: refetchClosingList,
//   } = useGetClosingList();
//   const {
//     data: tasteList,
//     loading: newTasteLoading,
//     error: newTastePopUpError,
//     refetch: refetchTasteList,
//   } = useGetTasteList();
//   const {
//     preferenceSetting,
//     loading: prefLoading,
//     error: prefError,
//     refetch: refetchPreference,
//   } = useGetPreferenceSettingOnce();
//
//   const isLoggedIn = useIsLoggedIn();
//   const {
//     data: user,
//     loading: loadingUser,
//     refetch: refetchUser,
//   } = useGetUserSetting();
//   const [refreshing, setRefreshing] = useState(false);
//
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([
//       refetchPreference(), //  취향 유무
//       refetchUser(), // 유저 정보
//       refetchHotList(), // 인기 리스트
//       refetchNewList(), // 새로 오픈 리스트
//       refetchClosingList(), // 종료 임박 리스트
//       refetchTasteList(), // 취향 리스트
//     ]);
//     setRefreshing(false);
//   };
//
//   useEffect(() => {
//     if (route.params?.shouldRefresh) {
//       onRefresh();
//       navigation.setParams({shouldRefresh: false});
//     }
//   }, [navigation, onRefresh, route.params?.shouldRefresh]);
//
//   useEffect(() => {
//     if (shouldRefreshHome) {
//       onRefresh();
//       dispatch(resetPreferenceRefresh());
//     }
//   }, [shouldRefreshHome, dispatch, onRefresh]);
//
//   useEffect(() => {
//     if (preferenceSetting?.data?.isPreferenceSettingCreated === false) {
//     }
//   }, [preferenceSetting]);
//
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//
//   const navigateToFind = (status, order) => {
//     navigation.navigate('Find', {status, order, shouldRefresh: true});
//   };
//
//   useEffect(() => {
//     setShowHotList(!!hotList && hotList.length > 0);
//   }, [hotList]);
//
//   if (hotListLoading || newListLoading || loadingUser || prefLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={globalColors.blue} />
//       </View>
//     );
//   }
//
//   return (
//     <View>
//       <HomeHeader />
//       <DismissKeyboardView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <View
//           style={[
//             {flex: 1},
//             {backgroundColor: globalColors.white},
//             {marginTop: 20, marginBottom: 130},
//           ]}>
//           {isLoggedIn ? (
//             preferenceSetting?.data?.isPreferenceSettingCreated === false ? (
//               <View style={styles.container}>
//                 <HomeMainTitle text1={`어서오세요, ${user?.nickname}님`} />
//                 <ForLoginBox
//                   isNeedSvg={false}
//                   text1={'팝업 취향을 설정하고 '}
//                   text2={'팝업 추천을 받아보세요!'}
//                   buttonText={'취향 설정하러 가기'}
//                   onPress={() =>
//                     navigation.navigate('PreferenceSetting', {fromHome: true})
//                   }
//                 />
//               </View>
//             ) : (
//               <View style={styles.container}>
//                 <HomeMainTitle
//                   text1={`안녕하세요, ${user?.nickname}님`}
//                   text2={'취향저격 팝업을 알려드릴게요'}
//                 />
//                 <ScrollView
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   style={styles.popUpScrollView}>
//                   {tasteList?.popupSummaryDtos.map((item, index) => (
//                     <Animated.View
//                       key={item.id}
//                       entering={FadeInDown.delay(index * 100)}>
//                       <Pressable
//                         onPress={() =>
//                           navigation.navigate('PopUpDetail', {
//                             id: item.id,
//                             isLoggedIn: isLoggedIn,
//                           })
//                         }>
//                         <RowPopUpCard
//                           id={item.id}
//                           imageUrl={item.image_url}
//                           name={item.name}
//                           introduce={item.introduce}
//                         />
//                       </Pressable>
//                     </Animated.View>
//                   ))}
//                 </ScrollView>
//               </View>
//             )
//           ) : (
//             <View style={styles.container}>
//               <ForLoginBox
//                 isNeedSvg={false}
//                 text1={'로그인하고'}
//                 text2={'팝업 추천을 받아보세요!'}
//                 buttonText={'로그인 하러 가기'}
//                 onPress={() => navigation.replace('Entry')}
//               />
//             </View>
//           )}
//           <DividerLine height={12} />
//           <View style={styles.bottomContainer}>
//             <View style={styles.middleContainer}>
//               <View style={styles.textAndQuestionContainer}>
//                 <Text style={Text18B.text}>인기 TOP 5</Text>
//                 <View style={styles.questionContainer}>
//                   <Pressable onPress={() => setShowNotice(prev => !prev)}>
//                     <QuestionSvg style={{paddingLeft: 40}} />
//                   </Pressable>
//                   {showNotice && (
//                     <View style={styles.noticeAbsoluteContainer}>
//                       <HotListNoticeSvg />
//                     </View>
//                   )}
//                 </View>
//                 <Pressable onPress={toggleDropdown}>
//                   {isDropdownOpen ? (
//                     <UpSvg style={{paddingLeft: 435}} />
//                   ) : (
//                     <DownSvg style={{paddingLeft: 435}} />
//                   )}
//                 </Pressable>
//               </View>
//             </View>
//             {showHotList && (
//               <HotListCard
//                 isLoggedin={isLoggedIn}
//                 navigation={navigation}
//                 isDropdownOpen={isDropdownOpen}
//                 itemList={hotList?.slice(0, 5) || []}
//                 isLoggedIn={isLoggedIn}
//               />
//             )}
//
//             <View style={styles.middleContainer}>
//               <Text style={Text18B.text}>새로 오픈</Text>
//               {/*<Pressable onPress={() => navigateToFind('OPERATING', 'OPEN')}>*/}
//               {/*  <View style={styles.textAndQuestionContainer}>*/}
//               {/*    <Text style={[Text14M.text, {color: globalColors.stroke2}]}>*/}
//               {/*      전체 보기*/}
//               {/*    </Text>*/}
//               {/*    <RightSvg style={{paddingLeft: 20}} />*/}
//               {/*  </View>*/}
//               {/*</Pressable>*/}
//             </View>
//             <ScrollView
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               style={styles.popUpScrollView}>
//               {newList?.map((item, index) => (
//                 <Animated.View
//                   key={item.id}
//                   entering={FadeInDown.delay(index * 100)}>
//                   <Pressable
//                     onPress={() =>
//                       navigation.navigate('PopUpDetail', {
//                         id: item.id,
//                         isLoggedIn: isLoggedIn,
//                       })
//                     }>
//                     <RowPopUpCard
//                       id={item.id}
//                       imageUrl={item.image_url}
//                       name={item.name}
//                       introduce={item.introduce}
//                     />
//                   </Pressable>
//                 </Animated.View>
//               ))}
//             </ScrollView>
//
//             <View style={styles.middleContainer}>
//               <Text style={Text18B.text}>종료 임박</Text>
//               {/*<Pressable onPress={() => navigateToFind('OPERATING', 'CLOSE')}>*/}
//               {/*  <View style={styles.textAndQuestionContainer}>*/}
//               {/*    <Text style={[Text14M.text, {color: globalColors.stroke2}]}>*/}
//               {/*      전체 보기*/}
//               {/*    </Text>*/}
//               {/*    <RightSvg style={{paddingLeft: 20}} />*/}
//               {/*  </View>*/}
//               {/*</Pressable>*/}
//             </View>
//             <ScrollView
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               style={styles.popUpScrollView}>
//               {closingList?.map((item, index) => (
//                 <Animated.View
//                   key={item.id}
//                   entering={FadeInDown.delay(index * 100)}>
//                   <Pressable
//                     onPress={() =>
//                       navigation.navigate('PopUpDetail', {
//                         id: item.id,
//                         isLoggedIn: isLoggedIn,
//                       })
//                     }>
//                     <RowPopUpCard
//                       id={item.id}
//                       imageUrl={item.image_url}
//                       name={item.name}
//                       introduce={item.introduce}
//                     />
//                   </Pressable>
//                 </Animated.View>
//               ))}
//             </ScrollView>
//           </View>
//         </View>
//       </DismissKeyboardView>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     marginBottom: 20,
//   },
//   bottomContainer: {
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     marginBottom: 60,
//   },
//   middleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textAndQuestionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   popUpScrollView: {
//     marginTop: 13,
//     paddingHorizontal: 5, // 스크롤뷰의 좌우 패딩
//     marginBottom: 28,
//   },
//   questionContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   noticeAbsoluteContainer: {
//     position: 'absolute',
//     shadowOpacity: 0.2,
//     shadowColor: 'black',
//     right: -200,
//     top: -30,
//     zIndex: 1,
//   },
// });
//
// export default HomeScreen;
