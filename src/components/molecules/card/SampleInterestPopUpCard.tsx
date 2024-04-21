import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DefaultImageSvg from '../../../assets/images/interestSample.svg';
import StarOnSvg from '../../../assets/icons/starOn.svg';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';
import Text12B from '../../../styles/texts/label/Text12B.ts';
import globalColors from '../../../styles/color/globalColors.ts';

const SampleInterestPopUpCard = ({
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
        <View style={styles.statusAndStarContainer}>
          {status && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
          <StarOnSvg style={styles.starIcon} />
        </View>
        <Text style={[Text18B.text, styles.title]}>{formattedTitle}</Text>
        {date && <Text style={[Text12B.text, styles.date]}>{date}</Text>}
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
    backgroundColor: globalColors.white,
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
    backgroundColor: globalColors.purpleLight,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  statusText: {
    color: globalColors.black,
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

export default SampleInterestPopUpCard;
