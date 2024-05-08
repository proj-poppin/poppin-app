// DividerLine.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

const DividerLine = ({height = 1, style}: any) => {
  return <View style={[styles.divider, {height}, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    // 기본 높이 값은 여기서 설정하지 않습니다.
    backgroundColor: globalColors.component, // globalColors.font 색상 사용
  },
});

export default DividerLine;
