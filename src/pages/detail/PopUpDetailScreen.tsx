import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useGetDetailPopUp from '../../hooks/useGetDetailPopUp.tsx';
import ButtonInstagramSvg from '../../assets/detail/buttonInstagram.svg';
import ButtonWebSvg from '../../assets/detail/buttonWeb.svg';
import MenuSvg from '../../assets/detail/menu.svg';
import ShareSvg from '../../assets/detail/share.svg';
import StarOffSvg from '../../assets/detail/starOff.svg';
import StarOnSvg from '../../assets/detail/starOn.svg';
import HyperLinkSvg from '../../assets/detail/hyperLink.svg';
import MapSvg from '../../assets/detail/map.svg';
import {ScrollView} from 'react-native';
import {Pressable} from 'react-native';
import Text20B from '../../styles/texts/title/Text20B.ts';
import Text14R from '../../styles/texts/body_medium/Text14R.ts';
import globalColors from '../../styles/color/globalColors.ts';
import DetailDividerLine from '../../assets/detail/detailDivider.svg';
import Text14B from '../../styles/texts/body_medium/Text14B.ts';
import Text14M from '../../styles/texts/body_medium/Text14M.ts';
import CommonButton from '../../components/atoms/button/CommonButton.tsx';
import DividerLine from '../../components/DividerLine.tsx';
import {useState} from 'react';
import useAddInterestPopUp from '../../hooks/useAddInterestPopUp.tsx';
import useDeleteInterestPopUp from '../../hooks/useDeleteInterestPopUp.tsx';
import HorizontalBarChart from '../../components/HorizontalBarChart.tsx';
import Text18B from '../../styles/texts/body_large/Text18B.ts';
import Text18R from '../../styles/texts/body_large/Text18R.ts';
import Text18M from '../../styles/texts/body_large/Text18M.ts';
import Text16B from '../../styles/texts/body_medium_large/Text16B.ts';
import Text16M from '../../styles/texts/body_medium_large/Text16M.ts';
import VerticalDividerLine from '../../components/organisms/VerticalDividerLine.tsx';
import PercentageButton from '../../components/findPopup/percentageButton.tsx';
import ReviewProfileSvg from '../../assets/detail/reviewProfile.svg';
import VerifiedReviewSvg from '../../assets/detail/verifiedReview.svg';
import WriteReviewSvg from '../../assets/detail/writeReview.svg';
import SvgWithNameBoxLabel from '../../components/SvgWithNameBoxLabel.tsx';
import ReasonItem from '../../components/ReasonItem.tsx';
import OrderSvg from '../../assets/icons/order.svg';
import Text24B from '../../styles/texts/headline/Text24B.ts';
import PressableUnderlineText from '../../components/molecules/pressable_text/PressableUnderlineText.tsx';
import UnderlinedTextButton from '../../components/UnderlineTextButton.tsx';
import InterestSampleSvg from '../../assets/images/interestSample.svg';
import ImageContainerRow from '../../components/ImageContainerRow.tsx';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';

const PopUpDetailScreen = ({route}) => {
  const {id} = route.params;
  const {data: detailPopUpData, loading, error} = useGetDetailPopUp(id);
  const firstImageUrl =
    detailPopUpData?.images?.[0] ??
    'https://v1-popup-poster.s3.ap-northeast-2.amazonaws.com/4/1.jpg';
  const firstId = detailPopUpData?.id;
  const [isInterested, setIsInterested] = useState(false); // Replace with actual state based on API response if needed

  const {
    addInterest,
    loading: addingInterestLoading,
    success: addingInterestSuccess,
  } = useAddInterestPopUp();
  const {
    deleteInterest,
    loading: deletingInterestLoading,
    success: deletingInterestSuccess,
  } = useDeleteInterestPopUp();

  const [isOnlyVerifiedReview, setIsOnlyVerifiedReview] = useState(false);

  const handleIsOnlyVerifiedReview = () => {
    setIsOnlyVerifiedReview(!isOnlyVerifiedReview);
  };

  const handleToggleInterest = async () => {
    console.log('handleToggleInterest:', isInterested);
    if (isInterested) {
      await deleteInterest(id);
    } else {
      console.log('addInterest:', id);
      await addInterest(id);
    }
    setIsInterested(!isInterested);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !detailPopUpData) {
    return <Text>Error loading details...</Text>;
  }

  const handleOpenLink = url => {
    if (url) {
      Linking.openURL(url).then(r => console.log('Link opened:', r));
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Image source={{uri: firstImageUrl}} style={styles.posterImage} />
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{detailPopUpData.name}</Text>
          <Text style={styles.introduce} numberOfLines={2} ellipsizeMode="tail">
            {detailPopUpData.introduce}
          </Text>
          <Text style={styles.link}>더보기</Text>
          <View style={styles.iconContainer}>
            <Pressable
              onPress={() => handleOpenLink(detailPopUpData.homepageLink)}>
              {detailPopUpData.isInstagram ? (
                <ButtonWebSvg />
              ) : (
                <ButtonWebSvg />
              )}
            </Pressable>
            <View style={styles.socialIcons}>
              <Pressable onPress={handleToggleInterest}>
                {isInterested ? <StarOnSvg /> : <StarOffSvg />}
              </Pressable>
              <Pressable onPress={() => {}}>
                <ShareSvg style={{paddingHorizontal: 20}} />
              </Pressable>
            </View>
          </View>
          <DetailDividerLine />
          <View style={styles.iconContainer}>
            <Text style={[Text20B.text, {color: globalColors.purple}]}>
              상세 정보
            </Text>
            <View style={styles.socialIcons}>
              <Pressable onPress={() => {}}>
                <HyperLinkSvg />
              </Pressable>
              <Pressable onPress={() => {}}>
                <MapSvg style={{paddingHorizontal: 20}} />
              </Pressable>
            </View>
          </View>
          <View style={styles.detailSection}>
            <View style={styles.detailRow}>
              <Text style={[Text14B.text, {color: globalColors.purple}]}>
                기간:
              </Text>
              <Text style={Text14M.text}>
                {`${detailPopUpData.openDate} ~ ${detailPopUpData.closeDate}`}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[Text14B.text, {color: globalColors.purple}]}>
                운영 시간:
              </Text>
              <Text style={Text14M.text}>
                {`${detailPopUpData.openTime} ~ ${detailPopUpData.closeTime}`}
              </Text>
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
              <Text style={Text14M.text}>
                {`${detailPopUpData.entranceFee}`}
              </Text>
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
          <Text style={[Text20B.text, {color: globalColors.purple}]}>
            방문자 데이터
          </Text>
          <View style={styles.reviewContainer}>
            <View style={styles.reviewRowSection}>
              <Text style={[Text16B.text, {color: globalColors.font}]}>
                팝업 만족도
              </Text>
              <Text style={[Text16M.text]}>
                방문자의 83%가 이 팝업에 만족하고 있어요!
              </Text>
            </View>
            <View style={styles.reviewRowSection}>
              <Text style={[Text16B.text, {color: globalColors.font}]}>
                혼잡도
              </Text>
              <View style={styles.reviewChartSection}>
                <Text style={[Text18B.text]}>평일</Text>
                <View style={styles.chartRowSection}>
                  <Text style={[Text18M.text]}>오전</Text>
                  <VerticalDividerLine />
                  <HorizontalBarChart percentage={45} />
                  <PercentageButton percentage={45} />
                </View>
                <View style={styles.chartRowSection}>
                  <Text style={[Text18M.text]}>오전</Text>
                  <VerticalDividerLine />
                  <HorizontalBarChart percentage={55} />
                  <PercentageButton percentage={55} />
                </View>
                <Text style={[Text18B.text]}>주말</Text>
                <View style={styles.chartRowSection}>
                  <Text style={[Text18M.text]}>오전</Text>
                  <VerticalDividerLine />
                  <HorizontalBarChart percentage={90} />
                  <PercentageButton percentage={90} />
                </View>
                <View style={styles.chartRowSection}>
                  <Text style={[Text18M.text]}>오전</Text>
                  <VerticalDividerLine />
                  <HorizontalBarChart percentage={45} />
                  <PercentageButton percentage={45} />
                </View>
              </View>
            </View>
            <DividerLine height={10} />
            <View style={styles.iconContainer}>
              <Text style={[Text20B.text, {color: globalColors.purple}]}>
                방문 후기
              </Text>
              <SvgWithNameBoxLabel
                Icon={WriteReviewSvg}
                label="방문후기 작성하기"
              />
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
            <View style={styles.rowBetweenContainer}>
              <View style={styles.recentReviewHeader}>
                <ReviewProfileSvg />
                <Text style={Text20B.text}>콩나물 부침개</Text>
                <VerifiedReviewSvg />
                <SvgWithNameBoxLabel Icon={LikeReviewSvg} label="00" />
              </View>
              <UnderlinedTextButton label={'신고하기'} onClicked={() => {}} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <CommonButton
          onPress={() => {}}
          title={'실시간 방문자 수'}
          isRealTimeInfo={true}
          // cnt={detailPopUpData.realTimeVisit}
          cnt={100}
          borderColor={globalColors.warmGray}
        />
        <View style={{width: 20}} />
        <CommonButton onPress={() => {}} title={'방문 하기'} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    height: 300, // Adjust height as needed
  },
  detailContainer: {},
  title: {
    ...Text20B.text,
    marginBottom: 8,
  },
  introduce: {
    ...Text14R.text,
    color: globalColors.font,
    marginBottom: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    // 추가 정보 섹션 스타일
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4, // 각 항목 사이의 간격을 위해 설정
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
  // Add additional styles as needed
});

export default PopUpDetailScreen;
