import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  toggleInterest,
  setInterest,
} from '../../redux/slices/interestedPopUpSlice'; // 추가
import useGetDetailPopUp from '../../hooks/detailPopUp/useGetDetailPopUp';
import ShareSvg from '../../assets/detail/share.svg';
import StarOffSvg from '../../assets/detail/starOff.svg';
import StarOnSvg from '../../assets/detail/starOn.svg';
// import MapSvg from '../../assets/detail/map.svg';
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
import UnderlinedTextButton from '../../components/UnderlineTextButton';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';
import Text16M from '../../styles/texts/body_medium_large/Text16M';
import OrderSvg from '../../assets/icons/order';
import ReasonItem from '../../components/ReasonItem';
import CongestionSection from '../../components/organisms/section/CongestionSection';
import {VisitorDataDetail} from '../../types/DetailPopUpDataNonPublic';
import WebSvg from '../../assets/detail/web.svg';
import InstagramTestSvg from '../../assets/detail/instagramTest.svg';
import ToastComponent from '../../components/atoms/toast/ToastComponent';
import VisitModalSvg from '../../assets/detail/visitModal.svg';
import CustomModal from '../../components/atoms/modal/CustomModal';
import Geolocation from 'react-native-geolocation-service';
import useAddRecommendReview from '../../hooks/detailPopUp/useAddRecommendReview';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn';
import useAddVisitor from '../../hooks/detailPopUp/useAddVisitor';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import PopUpDetailOptions from '../../navigators/options/PopUpDetailOptions';
import {RootState} from '../../redux/stores/reducer';
import {Share} from 'react-native';
import getDetailPopUp from '../../apis/popup/detailPopUp.ts';
import useGetDistanceFromLatLonInKm from '../../utils/function/getDistanceFromLatLonInKm.ts';
import loadingSlice from '../../redux/slices/loading.ts';
import VisitCompleteSvg from '../../assets/icons/visitComplete.svg';
import VisitReadySvg from '../../assets/icons/visitReady.svg';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const auth = await Geolocation.requestAuthorization('whenInUse');
    if (auth === 'granted') {
      return true;
    } else if (auth === 'denied') {
      Alert.alert(
        'Permission Denied',
        'Location permission is required. Please enable it in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openURL('app-settings:'),
          },
        ],
      );
    }
    return false;
  } else if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
      // User denied permission without checking 'Don't ask again'
      return false;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      // User denied permission and checked 'Don't ask again'
      Alert.alert(
        'Permission Denied',
        'Location permission is required. Please enable it in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
      );
    }
    return false;
  }
  return false;
}

export type PopUpDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

const PopUpDetailScreen = ({route}) => {
  const isLoggedIn = useIsLoggedIn();
  const navigation = useNavigation<PopUpDetailScreenNavigationProp>();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const {id, name} = route.params;
  const dispatch = useDispatch();
  const isInterested = useSelector(
    (state: RootState) => state.interestedPopups[id],
  );

  let {
    data: detailPopUpData,
    loading,
    error,
    refetch,
  } = useGetDetailPopUp(id, !isLoggedIn, fetchTrigger);
  const {distance, getDistance} = useGetDistanceFromLatLonInKm();
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const openCompleteModal = () => {
    setCompleteModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      dispatch(loadingSlice.actions.setLoading({isLoading: true}));
      setTimeout(() => {
        dispatch(loadingSlice.actions.setLoading({isLoading: false}));
      }, 200);
    }, [dispatch, refetch]),
  );

  // 제보하기 버튼 클릭후 모달 닫기
  const closeCompleteModal = () => {
    setCompleteModalVisible(false);
    // navigation.goBack();
  };

  useEffect(() => {
    if (detailPopUpData) {
      navigation.setOptions(
        PopUpDetailOptions({
          navigation,
          id: detailPopUpData.id,
          name: detailPopUpData.name,
        }),
      );
      dispatch(
        setInterest({
          popupId: detailPopUpData.id,
          isInterested: detailPopUpData.isInterested,
        }),
      );
    }
    console.log('realVisit!!:', detailPopUpData?.realTimeVisit);
  }, [navigation, detailPopUpData, dispatch]);

  const firstImageUrl =
    detailPopUpData?.images?.[0] ??
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/4/1.jpg';
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const {addRecommendCount} = useAddRecommendReview();
  const {addInterest} = useAddInterestPopUp();
  const {deleteInterest} = useDeleteInterestPopUp();
  const {addVisitorPopUp} = useAddVisitor();
  const [isOnlyVerifiedReview, setIsOnlyVerifiedReview] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    if (detailPopUpData) {
      setToastMessage('이 팝업이 근처에 있어요!!');
      setIsShowToast(true);
    }
  }, [detailPopUpData]);

  const handleIsOnlyVerifiedReview = () => {
    setIsOnlyVerifiedReview(!isOnlyVerifiedReview);
  };
  const handleVisitPress = async () => {
    if (!isLoggedIn) {
      navigation.navigate('Entry');
      return;
    }
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          getDistance(
            latitude ?? 0,
            longitude ?? 0,
            detailPopUpData?.latitude ?? 0,
            detailPopUpData?.longitude ?? 0,
          );
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    // console.log('latitude:', latitude);
    // console.log('longitude:', longitude);
    // console.log('detailPopUpData?.latitude:', detailPopUpData?.latitude);
    // console.log('detailPopUpData?.longitude:', detailPopUpData?.longitude);
    // console.log('🎨🎨🎨🎨🎨🎨🎨distance:', distance);
    if (hasPermission && distance !== null && distance <= 0.05) {
      const response = await addVisitorPopUp(detailPopUpData!.id!, 'fcmToken');
      if (response.success) {
        setToastMessage('방문 인증 되었습니다.');
        setFetchTrigger(!fetchTrigger);
      } else {
        setToastMessage(response.error?.message || '방문 인증에 실패했습니다.');
      }
      setIsShowToast(true);
    } else {
      openCompleteModal();
    }
  };
  const handleCompletePress = () => {
    if (!isLoggedIn) {
      navigation.navigate('Entry');
      return;
    }
    setModalVisible(true);
  };

  const handleToggleInterest = async () => {
    if (isInterested) {
      await deleteInterest(id, 'fcmToken');
      setToastMessage('관심팝업에서 삭제되었어요!');
    } else {
      await addInterest(id, 'fcmToken');
      setToastMessage('관심팝업에 저장되었어요!');
    }
    setIsShowToast(true);
    dispatch(toggleInterest(id)); // 추가
  };

  const handleOpenLink = url => {
    if (url) {
      Linking.openURL(url).then(r => console.log('Link opened:', r));
    }
  };

  const handleRecommendPress = async (reviewId: number) => {
    try {
      const response = await addRecommendCount(detailPopUpData?.id!, reviewId);
      if (response.success) {
        detailPopUpData!.review = detailPopUpData!.review.map(review => {
          if (review.reviewId === reviewId) {
            return {...review, recommendCnt: review.recommendCnt + 1};
          }
          return review;
        });
      } else if (response.error && response.error.code === '40020') {
        Alert.alert('이미 추천한 리뷰입니다.');
      } else {
        setToastMessage('리뷰 추천에 실패했습니다.');
      }
    } catch (error) {
      console.error('Recommend error:', error);
      setToastMessage('리뷰 추천에 실패했습니다.');
    }
    setIsShowToast(true);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200); // Delay of 0.5 seconds

    return () => clearTimeout(timer);
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

  const isVisitComplete = detailPopUpData.isVisited;
  const buttonTitle = isVisitComplete ? '방문완료' : '방문하기';
  const buttonColor = isVisitComplete ? globalColors.blue : globalColors.white;
  const buttonTextColor = isVisitComplete
    ? globalColors.white
    : globalColors.blue;

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
    ? detailPopUpData.review.filter(review => review.isCertificated)
    : detailPopUpData.review;

  return (
    <>
      <ScrollView style={styles.container}>
        <Image source={{uri: firstImageUrl}} style={styles.posterImage} />
        <View style={styles.detailContainer}>
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
              onPress={() => handleOpenLink(detailPopUpData.homepageLink)}>
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
              {/*<Pressable onPress={() => {}}>*/}
              {/*  <MapSvg style={{paddingHorizontal: 20}} />*/}
              {/*</Pressable>*/}

              <Pressable onPress={handleToggleInterest}>
                {isInterested ? <StarOnSvg /> : <StarOffSvg />}
              </Pressable>
              <Pressable
                onPress={async () => {
                  await Share.share({message: 'eqwew'});
                }}>
                <ShareSvg style={{paddingHorizontal: 20}} />
              </Pressable>
            </View>
          </View>
          <DetailDividerLine />
          {isShowToast && (
            <ToastComponent
              height={40}
              onClose={() => setIsShowToast(false)}
              message={toastMessage}
            />
          )}
          {/*<DetailDividerLine />*/}
          <View style={styles.iconContainer}>
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
              <Text style={[Text14B.text, {color: globalColors.purple}]}>
                주소:
              </Text>
              <Text style={Text14M.text}>{detailPopUpData.address}</Text>
            </View>
          </View>
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Text style={Text14M.text}>입장료 : </Text>
              <Text
                style={Text14M.text}>{`${detailPopUpData.entranceFee}`}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={Text14M.text}>이용 가능 연령 : </Text>
              <Text style={Text14M.text}>{detailPopUpData.availableAge}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={Text14M.text}>주차 안내 : </Text>
              <Text style={Text14M.text}>
                {detailPopUpData.parkingAvailable ? '주차 가능' : '주차 불가'}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={Text14M.text}>예약 안내 : </Text>
              <Text style={Text14M.text}>
                {detailPopUpData.resvRequired ? '예약 필수' : '자유 입장'}
              </Text>
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
              satisfyPercent={detailPopUpData.viewCnt}
              title="혼잡도"
              data={{weekdayAm, weekdayPm, weekendAm, weekendPm}}
            />
          </View>
          <DividerLine height={10} />
          <View style={styles.iconContainer}>
            <Text style={[Text20B.text, {color: globalColors.purple}]}>
              방문 후기
            </Text>
            <Pressable
              onPress={() => {
                if (!isLoggedIn) {
                  navigation.navigate('Entry');
                  return;
                }
                navigation.navigate('ReviewWrite', {
                  name: detailPopUpData.name,
                  id: detailPopUpData.id,
                  isVisited: detailPopUpData.isVisited,
                });
              }}>
              <SvgWithNameBoxLabel
                Icon={WriteReviewSvg}
                label="방문후기 작성하기"
              />
            </Pressable>
          </View>
          <View style={styles.rowBetweenContainer}>
            <View style={styles.recentReviewHeader}>
              <ReasonItem
                isSelected={isOnlyVerifiedReview}
                onClicked={handleIsOnlyVerifiedReview}
              />
              <Text>인증된 방문 후기만 보기</Text>
            </View>
            <View style={styles.recentReviewHeader}>
              <Text>추천순</Text>
              <OrderSvg />
            </View>
          </View>
          {filteredReviews.map(review => (
            <View key={review.reviewId} style={styles.colCloseContainer}>
              <View style={styles.rowBetweenContainer}>
                <View style={styles.recentReviewHeader}>
                  <ReviewProfileSvg />
                  <View style={styles.colCloseContainer}>
                    <View style={styles.rowCloseContainer}>
                      <Text style={Text20B.text}>{review.nickname}</Text>
                      {review.isCertificated && (
                        <VerifiedReviewSvg style={styles.verifiedReviewSvg} />
                      )}
                    </View>
                    <Text style={styles.reviewText}>
                      리뷰 {review.reviewCnt}개
                    </Text>
                  </View>
                </View>
                <UnderlinedTextButton
                  label={'신고하기'}
                  onClicked={() => {
                    navigation.navigate('Report', {
                      id: review.reviewId,
                      isReview: true,
                    });
                  }}
                />
              </View>
              <ScrollView horizontal style={styles.imageScroll}>
                {review.imageUrls.map((url, index) => (
                  <Image
                    key={index}
                    source={{uri: url}}
                    style={styles.reviewImage}
                  />
                ))}
              </ScrollView>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Pressable onPress={() => handleRecommendPress(review.reviewId)}>
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
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 400, // Adjust height as needed
  },
  detailContainer: {},
  title: {
    ...Text20B.text,
    marginBottom: 8,
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
});

export default PopUpDetailScreen;
