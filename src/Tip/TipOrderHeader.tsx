import React from 'react';
import {View, StyleSheet} from 'react-native';
import Index1CircleOn from '../Resource/svg/circle-index-1-active.svg';
import Index1CircleOff from '../Resource/svg/circle-index-1-inactive.svg';
import Index2CircleOn from '../Resource/svg/circle-index-2-active.svg';
import Index2CircleOff from '../Resource/svg/circle-index-2-inactive.svg';
import Index3CircleOn from '../Resource/svg/circle-index-3-active.svg';
import Index3CircleOff from '../Resource/svg/circle-index-3-inactive.svg';
import Index4CircleOn from '../Resource/svg/circle-index-4-active.svg';
import Index4CircleOff from '../Resource/svg/circle-index-4-inactive.svg';


// Props 타입 정의
interface SignUpOrderHeaderProps {
  currentStep: 'TipIndex1' | 'TipIndex2' | 'TipIndex3' | 'TipIndex4';
}

const TipOrderHeader: React.FC<SignUpOrderHeaderProps> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      {currentStep === 'TipIndex1' ? <Index1CircleOn /> : <Index1CircleOff />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex2' ? <Index2CircleOn /> : <Index2CircleOff />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex3' ? <Index3CircleOn /> : <Index3CircleOff />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex4' ? <Index4CircleOn /> : <Index4CircleOff />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding: {
    width: 5,
  },
});

export default TipOrderHeader;
