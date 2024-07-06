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
  TouchableWithoutFeedback, // 추가된 부분
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
import UnderlinedTextButton from '../../components/UnderlineTextButton';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';
import Text16M from '../../styles/texts/body_medium_large/Text16M';
import SortingSvg from '../../assets/detail/sorting.svg';
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
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn';
import useAddVisitor from '../../hooks/detailPopUp/useAddVisitor';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList';
import PopUpDetailOptions from '../../navigators/options/PopUpDetailOptions';
import {Share} from 'react-native';
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

export type PopUpDetailScreenNavigationProp = NativeStackNavigationProp<
  AppNavigatorParamList,
  'PopUpDetail'
>;

const PopUpDetailScreen = ({route}) => {
  const isLoggedIn = useIsLoggedIn();
  const navigation = useNavigation<PopUpDetailScreenNavigationProp>();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const {id} = route.params;
  const [reviews, setReviews] = useState<Review[]>([]); // Correctly set the initial state to an empty array
  const reviewSubmitted = useSelector(state => state.reviewSubmitted);
  const {
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

  const {refetch: refetchInterestList} = useGetInterestList();
  const onRefresh = useSelector((state: RootState) => state.refresh.onRefresh);

  const {interestState, updateInterest} = useInterest();

  const dispatch = useDispatch();
  const initialLoadRef = useRef(true);
  useEffect(() => {
    if (reviewSubmitted) {
      refetch();
      dispatch(setReviewSubmitted(false));
    }
  }, [reviewSubmitted, refetch, dispatch]);

  useEffect(() => {
    if (detailPopUpData) {
      navigation.setOptions(
        PopUpDetailOptions({
          navigation,
          id: detailPopUpData.id,
          name: detailPopUpData.name,
        }),
      );
      setReviews(detailPopUpData.review); // Set the reviews state
    }
  }, [navigation, detailPopUpData]);

  const firstImageUrl =
    detailPopUpData?.images?.[0] ??
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/4/1.jpg';
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

  const handleIsOnlyVerifiedReview = () => {
    setIsOnlyVerifiedReview(!isOnlyVerifiedReview);
  };

  const handleVisitPress = async () => {
    if (!isLoggedIn) {
      navigation.navigate('Entry');
      return;
    }
    const hasPermission = await requestLocationPermission();
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

    if (hasPermission) {
      const response = await addVisitorPopUp(detailPopUpData!.id!, 'fcmToken');
      if (response.success) {
        setToastMessage('방문 인증 되었습니다.');
        setFetchTrigger(!fetchTrigger);
      } else {
        setToastMessage(response.error?.message || '방문 인증에 실패했습니다.');
      }
      setIsShowToast(true);
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
      Alert.alert('로그인이 필요한 서비스입니다.');
      navigation.navigate('Entry');
      return;
    }
    if (isInterested) {
      console.log(`toast: ${isShowToast}`);
      await deleteInterest(id);
      setToastMessage('관심팝업에서 삭제되었어요!');
      updateInterest(id, false);
    } else {
      console.log(`toast: ${isShowToast}`);
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
    Linking.openURL(link)
      .then(r => console.log(r))
      .catch(e => console.log(e));
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
      console.error('Recommend error:', error);
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (detailPopUpData) {
      setIsLoaded(true);
    }
  }, [detailPopUpData]);

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      if (
        detailPopUpData?.isVisited === false &&
        distance !== null &&
        distance <= 0.05
      ) {
        setToastMessage('이 팝업이 근처에 있어요!!');
        setIsShowToast(true);
      }
    }
  }, [distance, detailPopUpData]);

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

  return (
    <TouchableWithoutFeedback onPress={() => setIsShowToast(false)}>
      <>
        <ScrollView style={styles.container}>
          <View style={styles.svgContainer}>
            <Image source={{uri: firstImageUrl}} style={styles.posterImage} />
            {detailPopUpData.operationStatus === 'TERMINATED' ? (
              <View style={styles.closeWrapper}>
                <Text style={[Text24B.text, {color: globalColors.white}]}>
                  팝업 종료
                </Text>
              </View>
            ) : null}
          </View>
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
                <Pressable
                  onPress={async () => {
                    await Share.share({message: 'eqwew'});
                  }}>
                  <ShareSvg style={{paddingHorizontal: 20}} />
                </Pressable>
              </View>
            </View>
            <DetailDividerLine />

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
                satisfyPercent={detailPopUpData.satisfaction ?? 0}
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
                    name: detailPopUpData!.name,
                    id: detailPopUpData!.id,
                    isVisited: detailPopUpData!.isVisited,
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
                <SortingSvg />
              </View>
            </View>
            {filteredReviews.map(review => (
              <View key={review.reviewId} style={styles.colCloseContainer}>
                <View style={styles.rowBetweenContainer}>
                  <View style={styles.recentReviewHeader}>
                    {review.profileUrl ? (
                      <Image
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
                        id: id,
                        isReview: true,
                        reviewId: review.reviewId,
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
        {isShowToast && (
          <ToastComponent
            height={45}
            onClose={() => setIsShowToast(false)}
            message={toastMessage}
          />
        )}
        <Spinner
          visible={addLoading || deleteLoading || recommendLoading} // Updated line
          textContent={'로딩중...'}
          textStyle={{color: '#FFF'}}
        />
      </>
    </TouchableWithoutFeedback>
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
});

export default PopUpDetailScreen;
