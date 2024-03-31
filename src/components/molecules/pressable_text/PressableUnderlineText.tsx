import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

// Props 타입 정의
interface TermsAndPrivacyPolicyAgreementProps {
  onPrivacyPolicyPress: () => void;
  onTermsOfServicePress: () => void;
}

const TermsAndPrivacyPolicyAgreement: React.FC<
  TermsAndPrivacyPolicyAgreementProps
> = ({onPrivacyPolicyPress, onTermsOfServicePress}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.infoText]}>
        회원가입을 완료할 시,{' '}
        <Pressable onPress={onPrivacyPolicyPress}>
          <Text style={styles.link}>위치 정보 및 개인정보 처리방침</Text>
        </Pressable>{' '}
        <Pressable onPress={onTermsOfServicePress}>
          <Text style={styles.link}>서비스 이용약관</Text>
        </Pressable>
        에 동의하게 됩니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoText: {
    textAlign: 'center',
    color: globalColors.font,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '200',
  },
  link: {
    textDecorationLine: 'underline',
    color: globalColors.font,
    fontSize: 14,
    fontWeight: '200',
  },
});

export default TermsAndPrivacyPolicyAgreement;
