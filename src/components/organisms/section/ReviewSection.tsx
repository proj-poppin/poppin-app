import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import ReviewProfileSvg from '../../assets/detail/reviewProfile.svg';
import VerifiedReviewSvg from '../../assets/detail/verifiedReview.svg';
import LikeReviewSvg from '../../assets/detail/likesReview.svg';
import Text20B from '../../../styles/texts/title/Text20B.ts';
import UnderlinedTextButton from '../../UnderlineTextButton.tsx';
import SvgWithNameBoxLabel from '../../SvgWithNameBoxLabel.tsx';
import Text16M from '../../../styles/texts/body_medium_large/Text16M.ts';
import globalColors from '../../../styles/color/globalColors.ts';

const ReviewSection = ({reviews, handleRecommendPress}) => (
  <View>
    <View style={styles.iconContainer}>
      <Text style={[Text20B.text, {color: globalColors.purple}]}>
        방문 후기
      </Text>
    </View>
    {reviews.map(review => (
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
                리뷰 {review.totalReviewWrite}개
              </Text>
            </View>
          </View>
          <UnderlinedTextButton label={'신고하기'} onClicked={() => {}} />
        </View>
        <ScrollView horizontal style={styles.imageScroll}>
          {review.imageUrls.map((url, index) => (
            <Image key={index} source={{uri: url}} style={styles.reviewImage} />
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
);

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colCloseContainer: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  rowCloseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetweenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentReviewHeader: {
    gap: 10,
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
  recommendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  verifiedReviewSvg: {
    marginLeft: 5,
  },
});

export default ReviewSection;
