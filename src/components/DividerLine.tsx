// DividerLine.js
import React from 'react';
import {View, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';

const DividerLine = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 15, // 두께 5
    backgroundColor: primaryColors.component, // primaryColors.font 색상 사용
  },
});

export default DividerLine;
