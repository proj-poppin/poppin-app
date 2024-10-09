import React from 'react';
import {View, StyleSheet} from 'react-native';
import TipIndex1Off from '../../../assets/icons/sign/customIndex1Off.svg';
import TipIndex1On from '../../../assets/icons/sign/customIndex1On.svg';
import TipIndex2Off from '../../../assets/icons/sign/customIndex2Off.svg';
import TipIndex2On from '../../../assets/icons/sign/customIndex2On.svg';
import TipIndex3Off from '../../../assets/icons/sign/customIndex3Off.svg';
import TipIndex3On from '../../../assets/icons/sign/customIndex3On.svg';
import TipIndex4Off from '../../../assets/icons/sign/customIndex4Off.svg';
import TipIndex4On from '../../../assets/icons/sign/customIndex4On.svg';

// Props 타입 정의
interface SignUpOrderHeaderProps {
  currentStep: 'TipIndex1' | 'TipIndex2' | 'TipIndex3' | 'TipIndex4';
}

const TipOrderHeader: React.FC<SignUpOrderHeaderProps> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      {currentStep === 'TipIndex1' ? <TipIndex1On /> : <TipIndex1Off />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex2' ? <TipIndex2On /> : <TipIndex2Off />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex3' ? <TipIndex3On /> : <TipIndex3Off />}
      <View style={styles.padding} />
      {currentStep === 'TipIndex4' ? <TipIndex4On /> : <TipIndex4Off />}
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
