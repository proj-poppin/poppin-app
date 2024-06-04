import React, {useEffect, useState} from 'react';
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
import useGetDetailPopUp from '../../hooks/detailPopUp/useGetDetailPopUp.tsx';
import ShareSvg from '../../assets/detail/share.svg';
import StarOffSvg from '../../assets/detail/starOff.svg';
import StarOnSvg from '../../assets/detail/starOn.svg';
import MapSvg from '../../assets/detail/map.svg';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import globalColors from '../../styles/color/globalColors.ts';
import DetailDividerLine from '../../assets/detail/detailDivider.svg';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import RealTimeVisitorsViewButton from '../../components/atoms/button/CommonButton.tsx';
import DividerLine from '../../components/DividerLine.tsx';
import useAddInterestPopUp from '../../hooks/detailPopUp/useAddInterestPopUp.tsx';
import useDeleteInterestPopUp from '../../hooks/detailPopUp/useDeleteInterestPopUp.tsx';
import ReviewProfileSvg from '../../assets/detail/reviewProfile.svg';
import VerifiedReviewSvg from '../../assets/detail/verifiedReview.svg';
import WriteReviewSvg from '../../assets/detail/writeReview.svg';
import SvgWithNameBoxLabel from '../../components/SvgWithNameBoxLabel.tsx';
import UnderlinedTextButton from '../../components/UnderlineTextButton.tsx';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';
import Text16M from '../../styles/texts/body_medium_large/Text16M.ts';
import OrderSvg from '../../assets/icons/order.svg';
import ReasonItem from '../../components/ReasonItem.tsx';
import CongestionSection from '../../components/organisms/section/CongestionSection.tsx';
import {VisitorDataDetail} from '../../types/DetailPopUpDataNonPublic.ts';
import WebSvg from '../../assets/detail/web.svg';
import InstagramTestSvg from '../../assets/detail/instagramTest.svg';
import ToastComponent from '../../components/atoms/toast/ToastComponent.tsx';
import VisitButton from '../../components/atoms/button/VisitButton.tsx';
import VisitModalSvg from '../../assets/detail/visitModal.svg';
import CustomModal from '../../components/atoms/modal/CustomModal.tsx';
import Geolocation from 'react-native-geolocation-service';
import useAddRecommendReview from '../../hooks/detailPopUp/useAddRecommendReview.tsx';
import {useNavigation} from '@react-navigation/native';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';
import useAddVisitor from '../../hooks/detailPopUp/useAddVisitor.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

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
  const {id} = route.params;
  const {
    data: detailPopUpData,
    loading,
    error,
  } = useGetDetailPopUp(id, !isLoggedIn, fetchTrigger);

  
  const firstImageUrl =
    detailPopUpData?.images?.[0] ??
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/4/1.jpg';
  const [isInterested, setIsInterested] = useState(false);
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
      setIsInterested(detailPopUpData.isInterested);
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
          setLatitude(latitude);
          setLongitude(longitude);
          console.log('Current Location:', latitude, longitude);
          console.log('사용자 허용상태: ', hasPermission);
          Alert.alert(
            '사용자 현재 위치',
            `위도: ${latitude}, 경도: ${longitude}`,
          );
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
    if (hasPermission) {
      const response = await addVisitorPopUp(detailPopUpData!.id!);
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

  const handleToggleInterest = async () => {
    if (isInterested) {
      await deleteInterest(id);
      setToastMessage('관심팝업에서 삭제되었어요!');
    } else {
      await addInterest(id);
      setToastMessage('관심팝업에 저장되었어요!');
    }
    setIsShowToast(true);
    setIsInterested(!isInterested);
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

  if (loading) {
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

  console.log("filteredReviews",detailPopUpData)

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
              <Pressable onPress={() => {}}>
                <MapSvg style={{paddingHorizontal: 20}} />
              </Pressable>
              <Pressable onPress={handleToggleInterest}>
                {isInterested ? <StarOnSvg /> : <StarOffSvg />}
              </Pressable>
              <Pressable onPress={() => {}}>
                <ShareSvg style={{paddingHorizontal: 20}} />
              </Pressable>
            </View>
          </View>
          {isShowToast && (
            <ToastComponent
              height={40}
              onClose={() => setIsShowToast(false)}
              message={toastMessage}
            />
          )}
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
          <View style={{paddingTop: 40,  paddingBottom: 10,paddingLeft:16}}>
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
          <View>
          <Text style={styles.message}>
          *혼잡도는 팝핀 이용자의 통계 데이터이므로 정확하지 않을 수 있습니다.</Text></View>
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
                navigation.navigate('ReviewWrite');
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
                    navigation.navigate('report');
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
              <Text style={styles.reviewContent}>{review.text}</Text>
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
        <VisitButton
          onPress={handleVisitPress}
          onCompletePress={handleCompletePress}
          isInstagram={false}
          title={
            !isLoggedIn
              ? '방문하기'
              : !detailPopUpData.isVisited
              ? '방문하기'
              : '방문완료'
          }
        />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        SvgIcon={VisitModalSvg}
        content="해당 팝업의 50m 이내에 있으면 방문하기 버튼이 활성화 됩니다!"
        checkText="OK"
      />
    </>
  );
};

const styles = StyleSheet.create({
  visitorDataContainer: {
    marginTop: 10,
    marginLeft:16,
    marginRight: 16,
    marginBottom:10,
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
  detailContainer: {
    
  },
  title: {
    ...Text20B.text,
    padding:16,
    marginBottom: 8,
    
  },
  introduce: {
    // marginTop: 15,
    marginLeft: 16,
    marginRight:16,
    marginBottom:10,
    ...Text14M.text,
  },
  link: {
    ...Text14R.text,
    color: globalColors.font,
    marginBottom: 16,
    
  },
  message: {
    color: globalColors.font,
    fontSize: 12,
    paddingLeft: 18,
    paddingBottom:50,
  },
  rowBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight:16
  },
  recentReviewHeader: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight:16,
    
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  detailSection: {
    flexDirection: 'column',
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight:16
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
    bottom: 0,
    flexDirection: 'row',
    borderRadius: 25,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom:25,
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
    paddingRight: 16,
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
  reviewContent: {
    marginVertical: 5,
    fontSize: 14,
    marginLeft: 18,
    marginBottom:10
  },
  reviewText: {
    ...Text16M.text,
    fontSize: 12,
    color:globalColors.font,
    marginVertical: 5,
  },
  verifiedReviewSvg: {
    marginLeft: 5,
  
  },
});

export default PopUpDetailScreen;
