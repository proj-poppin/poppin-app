import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import Text12R from '../../../styles/texts/label/Text12R.ts';

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
      <Text style={[styles.text]}>
        회원가입을 완료할 시,{' '}
        <Pressable onPress={onPrivacyPolicyPress}>
          <Text style={styles.link}>위치 정보 및 개인정보 처리방침</Text>
        </Pressable>
        {'\n'} 및{' '}
        <Pressable onPress={onTermsOfServicePress}>
          <Text style={styles.link}>서비스 이용약관</Text>
        </Pressable>{' '}
        에 동의하게 됩니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: globalColors.font,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
  link: {
    textAlign: 'center',
    color: globalColors.font,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    textDecorationLine: 'underline',
  },
});

export default TermsAndPrivacyPolicyAgreement;
