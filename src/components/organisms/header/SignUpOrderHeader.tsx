import React from 'react';
import {View, StyleSheet} from 'react-native';
import SignUpIndex1Off from '../../../assets/icons/sign/signUpIndex1Off.svg';
import SignUpIndex1On from '../../../assets/icons/sign/signUpIndex1On.svg';
import SignUpIndex2Off from '../../../assets/icons/sign/signUpIndex2Off.svg';
import SignUpIndex2On from '../../../assets/icons/sign/signUpIndex2On.svg';
import SignUpIndex3Off from '../../../assets/icons/sign/signUpIndex3Off.svg';
import SignUpIndex3On from '../../../assets/icons/sign/signUpIndex3On.svg';

// Props 타입 정의
interface SignUpOrderHeaderProps {
  currentStep: 'SignUpEmail' | 'SignUpAuthCode' | 'SignUpNickName';
}

const SignUpOrderHeader: React.FC<SignUpOrderHeaderProps> = ({currentStep}) => {
  return (
    <View style={styles.container}>
      {currentStep === 'SignUpEmail' ? <SignUpIndex1On /> : <SignUpIndex1Off />}
      <View style={styles.padding} />
      {currentStep === 'SignUpAuthCode' ? (
        <SignUpIndex2On />
      ) : (
        <SignUpIndex2Off />
      )}
      <View style={styles.padding} />
      {currentStep === 'SignUpNickName' ? (
        <SignUpIndex3On />
      ) : (
        <SignUpIndex3Off />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  padding: {
    width: 5,
  },
});

export default SignUpOrderHeader;
