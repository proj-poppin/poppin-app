import React, {useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import useGetDetailPopUp from '../../hooks/detailPopUp/useGetDetailPopUp';
import ShareSvg from '../../assets/detail/share.svg';
import StarOffSvg from '../../assets/detail/starOff.svg';
import StarOnSvg from '../../assets/detail/starOn.svg';
import Text20B from '../../styles/texts/title/Text20B';
import Text14R from '../../styles/texts/body_medium/Text14R';
import globalColors from '../../styles/color/globalColors';
import DetailDividerLine from '../../assets/detail/detailDivider.svg';
import Text14B from '../../styles/texts/body_medium/Text14B';
import Text14M from '../../styles/texts/body_medium/Text14M';
import RealTimeVisitorsViewButton from '../../components/atoms/button/CommonButton';
import DividerLine from '../../components/DividerLine';
import useAddInterestPopUp from '../../hooks/detailPopUp/useAddInterestPopUp';
import useDeleteInterestPopUp from '../../hooks/detailPopUp/useDeleteInterestPopUp';
import ReviewProfileSvg from '../../assets/detail/reviewProfile.svg';
import VerifiedReviewSvg from '../../assets/detail/verifiedReview.svg';
import WriteReviewSvg from '../../assets/detail/writeReview.svg';
import SvgWithNameBoxLabel from '../../components/SvgWithNameBoxLabel';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';
import Text16M from '../../styles/texts/body_medium_large/Text16M';
import ReasonItem from '../../components/ReasonItem';
import CongestionSection from '../../components/organisms/section/CongestionSection';
import {Review, VisitorDataDetail} from '../../types/DetailPopUpDataNonPublic';
import WebSvg from '../../assets/detail/web.svg';
import InstagramTestSvg from '../../assets/detail/instagramTest.svg';
import ToastComponent from '../../components/atoms/toast/ToastComponent';
import VisitModalSvg from '../../assets/detail/visitModal.svg';
import CustomModal from '../../components/atoms/modal/CustomModal';
import Geolocation from 'react-native-geolocation-service';
import useAddRecommendReview from '../../hooks/detailPopUp/useAddRecommendReview';
import {useNavigation} from '@react-navigation/native';
import useAddVisitor from '../../hooks/detailPopUp/useAddVisitor';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import PopUpDetailOptions from '../../navigators/options/PopUpDetailOptions';
import useGetDistanceFromLatLonInKm from '../../utils/function/getDistanceFromLatLonInKm.ts';
import VisitCompleteSvg from '../../assets/icons/visitComplete.svg';
import VisitReadySvg from '../../assets/icons/visitReady.svg';
import {requestLocationPermission} from '../../utils/function/requestLocationPermission.ts';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {setReviewSubmitted} from '../../redux/slices/reviewSubmittedSlice.ts';
import {useInterest} from '../../hooks/useInterest.tsx';
import useGetInterestList from '../../hooks/popUpList/useGetInterestList.tsx';
import {RootState} from '../../redux/stores/reducer.ts';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import TwoSelectConfirmationModal from '../../components/TwoSelectConfirmationModal.tsx';
import ImageModal from 'react-native-image-modal';
import EncryptedStorage from 'react-native-encrypted-storage';
import Text12R from '../../styles/texts/label/Text12R.ts';
import MenuSvg from '../../assets/detail/menu.svg'; // MenuSvg 가져오기
import SelectDropdown from 'react-native-select-dropdown';
import useBlockUser from '../../hooks/useBlockUser.tsx';
import UnderlinedTextButton from '../../components/UnderlineTextButton.tsx'; // 추가된 부분
import KakaoShareLink from 'react-native-kakao-share-link';
import SkipModal from '../../components/SkipModal.tsx';
import BlockModal from '../../components/BlockModal.tsx';
import userSlice from '../../redux/slices/user.ts';
import useBlockPopup from '../../hooks/useBlockPopup.tsx';
import FastImage from 'react-native-fast-image';
import {Share} from 'react-native';
export type PopUpDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

const {width} = Dimensions.get('window');
const contentWidth = width * 0.8;

const PopUpDetailScreen = ({route}) => {
  // useBlockPopup();
  const {blockPopupDetails, loading: blockPopupLoading} = useBlockPopup();
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const navigation = useNavigation<PopUpDetailScreenNavigationProp>();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  let {id, alarmId, name, isAlarm, isLoggedIn, initialViewCnt} = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewSubmitted = useSelector(state => state.reviewSubmitted);
  const {
    data: detailPopUpData,
    loading,
    error,
    refetch,
  } = useGetDetailPopUp(id, alarmId, name, isLoggedIn, isAlarm, fetchTrigger);
  const {distance, getDistance} = useGetDistanceFromLatLonInKm();
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };
  const {refetch: refetchInterestList} = useGetInterestList();
  const onRefresh = useSelector((state: RootState) => state.refresh.onRefresh);
  const {interestState, updateInterest} = useInterest();
  const dispatch = useDispatch();
  const initialLoadRef = useRef(true);

  const {blockUserDetails, loading: blockLoading} = useBlockUser(); // 추가된 부분

  useEffect(() => {
    if (reviewSubmitted) {
      refetch();
      dispatch(setReviewSubmitted(false));
    }
  }, [reviewSubmitted, refetch, dispatch]);

  const openBlockModal = (message = '차단한 게시글은 다시 볼 수 없습니다.') => {
    setAlertMessage(message);
    setBlockModalVisible(true);
  };

  useEffect(() => {
    if (detailPopUpData) {
      navigation.setOptions(
        PopUpDetailOptions({
          navigation,
          id: detailPopUpData.id,
          name: detailPopUpData.name,
          isLoggedIn,
          openLoginModal,
          openBlockModal,
        }),
      );
      setReviews(detailPopUpData.review);
    }
  }, [navigation, detailPopUpData, isLoggedIn]);

  const firstImageUrl = detailPopUpData?.images?.[0];

  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const {addRecommendCount, loading: recommendLoading} =
    useAddRecommendReview();
  const {addInterest, loading: addLoading} = useAddInterestPopUp();
  const {deleteInterest, loading: deleteLoading} = useDeleteInterestPopUp();
  const {addVisitorPopUp} = useAddVisitor();
  const [isOnlyVerifiedReview, setIsOnlyVerifiedReview] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const [alertMessage, setAlertMessage] = useState(
    '방문 인증을 위해서는 로그인이 필요합니다.',
  );
  const openLoginModal = (
    message = '관심 팝업에 추가하려면 로그인이 필요합니다.',
    isBlocked = false,
  ) => {
    setAlertMessage(message);
    if (isBlocked) {
      setBlockModalVisible(true);
    }
    setLoginModalVisible(true);
  };

  const closeBlockModal = () => {
    setBlockModalVisible(false);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };
  const handleIsOnlyVerifiedReview = () => {
    setIsOnlyVerifiedReview(!isOnlyVerifiedReview);
  };

  const handleVisitPress = async () => {
    if (!isLoggedIn) {
      openLoginModal('방문 인증을 위해서는 로그인이 필요합니다.');
      return;
    }
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          const distance = getDistance(
            latitude ?? 0,
            longitude ?? 0,
            detailPopUpData?.latitude ?? 0,
            detailPopUpData?.longitude ?? 0,
          );
          console.log('distance⭐️⭐️⭐️⭐️', distance);
          const token = await EncryptedStorage.getItem('pushToken');

          if (distance !== null && distance <= 0.75) {
            const response = await addVisitorPopUp(
              detailPopUpData!.id!,
              token!,
            );
            if (response.success) {
              setToastMessage('방문 인증 되었습니다.');
              setFetchTrigger(!fetchTrigger);
            } else {
              setToastMessage(
                response.error?.message || '방문 인증에 실패했습니다.',
              );
            }
            setIsShowToast(true);
          } else {
            setCompleteModalVisible(true);
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const handleCompletePress = () => {
    if (!isLoggedIn) {
      navigation.navigate('Entry');
      return;
    }
    setModalVisible(true);
  };

  const isInterested = interestState[id] || false;

  const handleToggleInterest = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    if (isInterested) {
      await deleteInterest(id);
      setToastMessage('관심팝업에서 삭제되었어요!');
      updateInterest(id, false);
    } else {
      await addInterest(id);
      setToastMessage('관심팝업에 저장되었어요!');
      updateInterest(id, true);
    }
    setIsShowToast(true);
    if (onRefresh) {
      onRefresh();
    }
  };

  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
  };

  const handleOpenLink = (link: string) => {
    Linking.openURL(link).catch(e => console.log(e));
  };

  const handleSkipBlockComplete = () => {
    setModalVisible(false);
    dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
    navigation.goBack();
  };

  const handleBlockPopup = async () => {
    const response = await blockPopupDetails(id);
    if (response.success) {
      Alert.alert(
        '차단 완료',
        '팝업이 성공적으로 차단되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              setTimeout(() => {
                navigation.goBack();
              }, 300);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      // Optionally handle the error case, e.g., show a different alert or message
      Alert.alert('차단 실패', '팝업 차단에 실패했습니다.');
    }
    closeBlockModal();
  };

  const handleRecommendPress = async (reviewId: number) => {
    try {
      const response = await addRecommendCount(detailPopUpData?.id!, reviewId);
      if (response.success) {
        setReviews(reviews =>
          reviews.map(review =>
            review.reviewId === reviewId
              ? {...review, recommendCnt: review.recommendCnt + 1}
              : review,
          ),
        );
      } else if (response.error && response.error.code === '40020') {
        Alert.alert('이미 추천한 리뷰입니다.');
      } else if (response.error && response.error.code === '40025') {
        Alert.alert('자신의 후기에 추천할 수 없습니다');
      } else {
      }
    } catch (error) {
      console.log('Recommend error:', error);
      // console.error('Recommend error:', error);
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (detailPopUpData) {
      setIsLoaded(true);
    }
  }, [detailPopUpData]);

  if (loading || !isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  if (error || !detailPopUpData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  if (detailPopUpData.isBlocked) {
    Alert.alert(
      '안내',
      '차단된 팝업입니다.',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  const isVisitComplete = detailPopUpData.isVisited;

  const visitorDataDefault: VisitorDataDetail = {
    congestionRate: '여유',
    congestionRatio: 30,
  };

  const weekdayAm =
    detailPopUpData.visitorData?.weekdayAm || visitorDataDefault;
  const weekdayPm =
    detailPopUpData.visitorData?.weekdayPm || visitorDataDefault;
  const weekendAm =
    detailPopUpData.visitorData?.weekendAm || visitorDataDefault;
  const weekendPm =
    detailPopUpData.visitorData?.weekendPm || visitorDataDefault;

  const filteredReviews = isOnlyVerifiedReview
    ? reviews.filter(review => review.isCertificated)
    : reviews;

  const handleShare = async () => {
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: detailPopUpData.name,
          imageUrl: firstImageUrl!,
          link: {
            webUrl: `https://yourapp.com/popup/${detailPopUpData.id}`,
            mobileWebUrl: `https://yourapp.com/popup/${detailPopUpData.id}`,
            androidExecutionParams: [
              {key: 'id', value: detailPopUpData.id.toString()},
            ],
            iosExecutionParams: [
              {key: 'id', value: detailPopUpData.id.toString()},
            ],
          },
          description: detailPopUpData.introduce,
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              webUrl: `https://yourapp.com/popup/${detailPopUpData.id}`,
              mobileWebUrl: `https://yourapp.com/popup/${detailPopUpData.id}`,
              androidExecutionParams: [
                {key: 'id', value: detailPopUpData.id.toString()},
              ],
              iosExecutionParams: [
                {key: 'id', value: detailPopUpData.id.toString()},
              ],
            },
          },
        ],
      });
      console.log('Share response:', response);
      console.log('share id: ', detailPopUpData.id);
    } catch (e) {
      console.log('Share error:', e);
      // console.error('Share error:', e);
    }
  };

  const handleBlockUser = async userId => {
    if (!isLoggedIn) {
      openLoginModal('차단하려면 로그인이 필요합니다.');
      return;
    }
    console.log('userId', userId);
    const response = await blockUserDetails(userId);
    if (response.success) {
      Alert.alert('차단', '해당 사용자가 차단되었습니다.');
      refetch();
    } else {
      if (response.error.code === '40028') {
        Alert.alert('안내', '이미 차단한 사용자입니다.');
      } else if (response.error.code === '40027') {
        Alert.alert('안내', '자신을 차단할 수 없습니다.');
      } else {
        Alert.alert('오류', response.error.message);
      }
    }
  };

  const menuOptions = [
    {label: '신고하기', action: 'Report'},
    {label: '차단하기', action: 'Block'},
  ];

  const handleMenuSelect = (selectedItem, review) => {
    if (!isLoggedIn) {
      if (selectedItem.action === 'Report') {
        openLoginModal('신고하려면 로그인이 필요합니다.');
      } else if (selectedItem.action === 'Block') {
        openLoginModal('차단하려면 로그인이 필요합니다.');
      }
      return;
    }

    if (selectedItem.action === 'Report') {
      navigation.navigate('Report', {
        id: id,
        isReview: true,
        reviewId: review.reviewId,
      });
    } else if (selectedItem.action === 'Block') {
      handleBlockUser(review.userId);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsShowToast(false)}>
      <>
        <ScrollView style={styles.container}>
          <View style={styles.svgContainer}>
            <FastImage
              source={{uri: firstImageUrl}}
              style={styles.posterImage}
            />
            {detailPopUpData.operationStatus === 'TERMINATED' ? (
              <View style={styles.closeWrapper}>
                <Text style={[Text24B.text, {color: globalColors.white}]}>
                  팝업 종료
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.detailContainer}>
            <View style={styles.commonContainer}>
              <Text style={styles.title}>{detailPopUpData.name}</Text>
              <Text
                style={styles.introduce}
                numberOfLines={showFullText ? 0 : 2}
                ellipsizeMode="tail">
                {detailPopUpData.introduce}
              </Text>
              {detailPopUpData.introduce.length > 100 && (
                <UnderlinedTextButton
                  label={showFullText ? '접기' : '더보기'}
                  onClicked={() => setShowFullText(!showFullText)}
                />
              )}
              <View style={styles.iconContainer}>
                <Pressable
                  onPress={() => handleOpenLink(detailPopUpData!.homepageLink)}>
                  {detailPopUpData.isInstagram ? (
                    <SvgWithNameBoxLabel
                      Icon={InstagramTestSvg}
                      label="공식 인스타그램"
                      isBold={false}
                    />
                  ) : (
                    <SvgWithNameBoxLabel
                      Icon={WebSvg}
                      label="공식 페이지"
                      isBold={false}
                    />
                  )}
                </Pressable>
                <View style={styles.socialIcons}>
                  <Pressable onPress={handleToggleInterest}>
                    {isInterested ? <StarOnSvg /> : <StarOffSvg />}
                  </Pressable>
                  <Pressable onPress={handleShare}>
                    <ShareSvg style={{paddingHorizontal: 20}} />
                  </Pressable>
                </View>
              </View>
            </View>
            <DetailDividerLine />

            <View style={styles.commonContainer}>
              <View style={[styles.iconContainer]}>
                <Text style={[Text20B.text, {color: globalColors.purple}]}>
                  상세 정보
                </Text>
                <View style={styles.socialIcons} />
              </View>
              <View style={styles.detailSection}>
                <View style={styles.detailRow}>
                  <Text style={[Text14B.text, {color: globalColors.purple}]}>
                    기간:
                  </Text>
                  <Text
                    style={
                      Text14M.text
                    }>{`${detailPopUpData.openDate} ~ ${detailPopUpData.closeDate}`}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={[Text14B.text, {color: globalColors.purple}]}>
                    운영 시간:
                  </Text>
                  <Text
                    style={
                      Text14M.text
                    }>{`${detailPopUpData.openTime} ~ ${detailPopUpData.closeTime}`}</Text>
                </View>
                <View style={styles.detailRow}>
                  <View style={{height: 35}}>
                    <Text style={[Text14B.text, {color: globalColors.purple}]}>
                      주소:
                    </Text>
                  </View>

                  <Text style={Text14M.text}>
                    {detailPopUpData.address} {'\n'}{' '}
                    {detailPopUpData.addressDetail}
                  </Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <View style={styles.detailRow}>
                  <Text style={Text14M.text}>입장료 : </Text>
                  <Text
                    style={
                      Text14M.text
                    }>{`${detailPopUpData.entranceFee}`}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={Text14M.text}>이용 가능 연령 : </Text>
                  <Text style={Text14M.text}>
                    {detailPopUpData.availableAge}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={Text14M.text}>주차 안내 : </Text>
                  <Text style={Text14M.text}>
                    {detailPopUpData.parkingAvailable
                      ? '주차 가능'
                      : '주차 불가'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={Text14M.text}>예약 안내 : </Text>
                  <Text style={Text14M.text}>
                    {detailPopUpData.resvRequired ? '예약 필수' : '자유 입장'}
                  </Text>
                </View>
              </View>
            </View>
            <DividerLine height={10} />
            <View style={{paddingTop: 40, paddingLeft: 20, paddingBottom: 10}}>
              <Text style={[Text20B.text, {color: globalColors.purple}]}>
                방문자 데이터
              </Text>
            </View>
            <View style={styles.visitorDataContainer}>
              <CongestionSection
                satisfyPercent={detailPopUpData.visitorData?.satisfaction ?? 0}
                title="혼잡도"
                data={{weekdayAm, weekdayPm, weekendAm, weekendPm}}
              />
            </View>
            <Text
              style={[
                Text12R.text,
                {color: globalColors.font},
                {marginHorizontal: 10},
              ]}>
              *혼잡도는 팝핀 이용자의 통계 데이터이므로 정확하지 않을 수
              있습니다.{'\n'}
            </Text>
            <DividerLine height={10} />
            <View style={[styles.iconContainer, styles.commonContainer]}>
              <Text style={[Text20B.text, {color: globalColors.purple}]}>
                방문 후기
              </Text>
              <Pressable
                onPress={() => {
                  if (!isLoggedIn) {
                    openLoginModal('후기를 작성하려면 로그인이 필요합니다.');
                    return;
                  }
                  navigation.navigate('ReviewWrite', {
                    name: detailPopUpData!.name,
                    id: detailPopUpData!.id,
                    isVisited: detailPopUpData!.isVisited,
                  });
                }}>
                <SvgWithNameBoxLabel
                  Icon={WriteReviewSvg}
                  label={
                    !isLoggedIn || !isVisitComplete
                      ? '일반후기 작성하기'
                      : '인증후기 작성하기'
                  }
                />
              </Pressable>
            </View>
            <Text
              style={[
                Text12R.text,
                {color: globalColors.font},
                {marginHorizontal: 10},
              ]}>
              *부적절한 리뷰가 작성되어 있다면 신고하기 버튼을 눌러주시기
              바랍니다.{'\n'}*3회 이상 누적시 제제를 받을 수 있습니다 {'\n'}
            </Text>
            <View style={[styles.rowBetweenContainer, styles.commonContainer]}>
              <View style={styles.recentReviewHeader}>
                <ReasonItem
                  isSelected={isOnlyVerifiedReview}
                  onClicked={handleIsOnlyVerifiedReview}
                />
                <Text>인증된 방문 후기만 보기</Text>
              </View>
              <View style={styles.recentReviewHeader}>
                <Text>추천순</Text>
              </View>
            </View>
            <View style={styles.commonContainer}>
              {filteredReviews.map(review => (
                <View key={review.reviewId} style={styles.colCloseContainer}>
                  <View style={styles.rowBetweenContainer}>
                    <View style={styles.recentReviewHeader}>
                      {review.profileUrl ? (
                        <FastImage
                          source={{uri: review.profileUrl}}
                          style={{width: 50, height: 50, borderRadius: 40}}
                        />
                      ) : (
                        <ReviewProfileSvg />
                      )}
                      <View style={styles.colCloseContainer}>
                        <View style={styles.rowCloseContainer}>
                          <Text style={Text20B.text}>{review.nickname}</Text>
                          {review.isCertificated && (
                            <VerifiedReviewSvg
                              style={styles.verifiedReviewSvg}
                            />
                          )}
                        </View>
                        <Text style={styles.reviewText}>
                          리뷰 {review.reviewCnt}개
                        </Text>
                      </View>
                    </View>
                    <SelectDropdown
                      data={menuOptions}
                      onSelect={selectedItem =>
                        handleMenuSelect(selectedItem, review)
                      }
                      buttonTextAfterSelection={selectedItem =>
                        selectedItem.label
                      }
                      rowTextForSelection={item => item.label}
                      renderCustomizedButtonChild={() => <MenuSvg />}
                      buttonStyle={styles.dropdownButtonStyle}
                      dropdownStyle={styles.dropdownStyle}
                      rowTextStyle={styles.rowTextStyle}
                      defaultButtonText=""
                    />
                  </View>
                  <ScrollView horizontal style={styles.imageScroll}>
                    {review.imageUrls.map((url, index) => (
                      <ImageModal
                        key={index}
                        resizeMode="contain"
                        style={{
                          width: 120,
                          height: 120,
                          overflow: 'hidden',
                          borderRadius: 10,
                          marginHorizontal: 5,
                        }}
                        source={{uri: url}}
                      />
                    ))}
                  </ScrollView>
                  <Text style={styles.reviewText}>{review.text}</Text>
                  <Pressable
                    onPress={() => handleRecommendPress(review.reviewId)}>
                    <View style={styles.recommendContainer}>
                      <SvgWithNameBoxLabel
                        Icon={LikeReviewSvg}
                        label={`${review.recommendCnt}`}
                      />
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <RealTimeVisitorsViewButton
            onPress={() => {}}
            title={'실시간 방문자 수'}
            isRealTimeInfo={true}
            cnt={detailPopUpData.realTimeVisit}
            borderColor={globalColors.warmGray}
          />
          <View style={{width: 20}} />
          {isVisitComplete ? (
            <VisitCompleteSvg />
          ) : (
            <Pressable onPress={handleVisitPress}>
              <VisitReadySvg />
            </Pressable>
          )}
        </View>
        <CustomModal
          isVisible={completeModalVisible}
          onClose={closeCompleteModal}
          SvgIcon={VisitModalSvg}
          contentFirstLine={'해당 팝업의 50m 이내에 있으면'}
          contentSecondLine={'방문하기 버튼이 활성화 됩니다!'}
          checkText="확인했어요"
          distance={distance!} // 거리 값을 전달
        />
        {isShowToast && (
          <ToastComponent
            height={45}
            onClose={() => setIsShowToast(false)}
            message={toastMessage}
          />
        )}
        <TwoSelectConfirmationModal
          isVisible={loginModalVisible}
          onClose={closeLoginModal}
          onConfirm={() => {
            navigation.navigate('Entry');
            closeLoginModal();
          }}
          mainAlertTitle="로그인이 필요합니다"
          subAlertTitle={alertMessage}
          selectFirstText="나중에 할래요"
          selectSecondText="로그인하기"
        />
        <TwoSelectConfirmationModal
          isVisible={blockModalVisible}
          onClose={closeBlockModal}
          onConfirm={handleBlockPopup}
          mainAlertTitle="차단하시겠습니까?"
          subAlertTitle={alertMessage}
          selectFirstText="취소할래요"
          selectSecondText="차단할래요"
        />
        <Spinner
          visible={
            addLoading || deleteLoading || recommendLoading || blockLoading
          }
          textContent={'로딩중...'}
          textStyle={{color: '#FFF'}}
        />
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  commonContainer: {
    marginHorizontal: 12,
  },
  visitorDataContainer: {
    margin: 10,
    borderColor: globalColors.component,
    borderWidth: 1.0,
    borderRadius: 15,
    padding: 20,
  },
  recommendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reviewContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  reviewRowSection: {
    flexDirection: 'row',
    gap: 10,
  },
  chartRowSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewChartSection: {
    flexDirection: 'column',
    columnGap: 20,
  },
  leftButtonText: {
    marginLeft: 10,
    padding: 10,
    color: globalColors.font,
    fontSize: 14,
  },
  rightButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  container: {
    flex: 1,
    marginBottom: 140,
  },
  posterImage: {
    width: '100%',
    height: 400,
  },
  detailContainer: {},
  title: {
    ...Text20B.text,
    marginTop: 20,
  },
  introduce: {
    marginTop: 15,
    ...Text14M.text,
  },
  link: {
    ...Text14R.text,
    color: globalColors.font,
    marginBottom: 16,
  },
  rowBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recentReviewHeader: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  detailSection: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 16,
  },
  additionalInfo: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    borderRadius: 25,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    justifyContent: 'space-around',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
  },
  bottomBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.purple,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  bottomBarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colCloseContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  rowCloseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageScroll: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  reviewImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  reviewText: {
    ...Text16M.text,
    marginVertical: 5,
  },
  verifiedReviewSvg: {
    marginLeft: 5,
  },
  svgContainer: {
    position: 'relative',
  },
  closeWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonStyle: {
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownStyle: {
    position: 'absolute',
    borderRadius: 8,
    top: -20,
    backgroundColor: globalColors.white,
    marginTop: 5,
    marginLeft: -100,
    minWidth: 135,
  },
  rowTextStyle: {
    color: globalColors.font,
    textAlign: 'center',
  },
});

export default PopUpDetailScreen;
