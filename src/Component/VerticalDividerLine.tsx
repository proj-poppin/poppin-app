// DividerLine.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

const VerticalDividerLine = ({height = 50, style}: any) => {
  return <View style={[styles.divider, {height}, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    // 기본 높이 값은 여기서 설정하지 않습니다.
    width: 1.5,
    backgroundColor: globalColors.warmGray, // globalColors.font 색상 사용
    marginLeft: 10,
  },
});

export default VerticalDividerLine;
