import DefaultImageSvg from '../../src/assets/images/defaultImage.svg';

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../style/textStyles.ts';
import primaryColors from '../style/primaryColors.ts';
const PopUpCard = ({Svg = DefaultImageSvg, title, date = null}) => {
  const formattedTitle =
    title.length > 7 ? `${title.substring(0, 7)}...` : title;
  return (
    <View style={styles.container}>
      <View style={styles.svgContainer}>
        <DefaultImageSvg width="60%" height="80%" />
      </View>
      <Text style={[globalStyles.labelPrimary, styles.title]}>
        {formattedTitle}
      </Text>
      {date && (
        <Text style={[globalStyles.labelPrimaryGray, styles.date]}>{date}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 130,
    backgroundColor: primaryColors.white,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 5,
  },
  svgContainer: {
    width: '100%',
    height: 80,
    paddingTop: 10, // SVG 상단 패딩
    paddingLeft: 10, // SVG 좌측 패딩
    paddingRight: 10, // SVG 우측 패딩
    borderTopLeftRadius: 8, // 상단 좌측 모서리 둥글게
    borderTopRightRadius: 8, // 상단 우측 모서리 둥글게
  },
  title: {
    marginTop: 5, // 제목 상단 마진
  },
  date: {
    marginTop: 5, // 날짜 상단 마진
  },
});

export default PopUpCard;
