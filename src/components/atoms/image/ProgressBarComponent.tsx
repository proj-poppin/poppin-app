import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressFirstSvg from '../../../assets/images/progress1.svg';
import ProgressSecondSvg from '../../../assets/images/progress2.svg';
import ProgressThirdSvg from '../../../assets/images/progress3.svg';

const ProgressBarComponent = ({step}) => {
  const renderProgressBar = () => {
    switch (step) {
      case 1:
        return <ProgressFirstSvg />;
      case 2:
        return <ProgressSecondSvg />;
      case 3:
        return <ProgressThirdSvg />;
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderProgressBar()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // 가로 축에서 중앙 정렬
  },
});

export default ProgressBarComponent;
