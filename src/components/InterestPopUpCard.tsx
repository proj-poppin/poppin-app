// InterestPopUpCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DefaultImageSvg from '../assets/images/interestSample.svg'; // SVG 파일 경로가 정확한지 확인하세요.
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';
import StarOnSvg from '../assets/icons/starOn.svg';

const InterestPopUpCard = ({
  Svg = DefaultImageSvg,
  title,
  date = null,
  status = '', // 상태 텍스트
}) => {
  const formattedTitle =
    title.length > 11 ? `${title.substring(0, 11)}...` : title;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.svgContainer}>
        <Svg width="120" height="120" />
      </View>
      <View style={styles.textContainer}>
        {/* 상태와 별 아이콘이 같은 줄에 위치하도록 레이아웃 수정 */}
        <View style={styles.statusAndStarContainer}>
          {status && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
          <StarOnSvg style={styles.starIcon} />
        </View>
        <Text style={[globalStyles.bodyLargePrimaryBlack, styles.title]}>
          {formattedTitle}
        </Text>
        {date && (
          <Text style={[globalStyles.labelPrimaryGray, styles.date]}>
            {date}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'flex-start', // SVG와 텍스트 컨테이너를 위쪽으로 정렬
    backgroundColor: primaryColors.white,
  },
  svgContainer: {
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  statusAndStarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 상태와 별 아이콘 사이 공간을 균등하게 배분
    alignItems: 'center',
    width: '100%', // 부모 컨테이너의 전체 너비 사용
  },
  statusContainer: {
    backgroundColor: primaryColors.purpleLight,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  statusText: {
    color: primaryColors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 5,
  },
  date: {},
  starIcon: {
    // 필요한 경우 크기나 마진 조정
  },
});

export default InterestPopUpCard;
