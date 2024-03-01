// DividerLine.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';

const DividerLine = ({height = 15}) => {
  return <View style={[styles.divider, {height}]} />;
};

const styles = StyleSheet.create({
  divider: {
    // 기본 높이 값은 여기서 설정하지 않습니다.
    backgroundColor: primaryColors.component, // primaryColors.font 색상 사용
  },
});

export default DividerLine;
