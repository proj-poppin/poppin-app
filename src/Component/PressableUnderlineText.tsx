import React from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {themeColors} from '../Theme/theme';
import {BodyMediumText} from '../StyledComponents/Text/bodyMedium.component';
import {moderateScale} from '../Util';

// Props 타입 정의
interface TermsAndPrivacyPolicyAgreementProps {
  onPrivacyPolicyPress: () => void;
  onTermsOfServicePress: () => void;
}

const TermsAndPrivacyPolicyAgreement: React.FC<
  TermsAndPrivacyPolicyAgreementProps
> = ({onPrivacyPolicyPress, onTermsOfServicePress}) => {
  return (
    <Container>
      <InfoText>
        회원가입을 완료할 시,{' '}
        <Pressable onPress={onPrivacyPolicyPress}>
          <TextWithUnderline>위치 정보 및 개인정보 처리방침</TextWithUnderline>
        </Pressable>
        <Pressable onPress={onTermsOfServicePress}>
          <TextWithUnderline>서비스 이용약관</TextWithUnderline>
        </Pressable>
        <InfoText>에 동의하게 됩니다.</InfoText>
      </InfoText>
    </Container>
  );
};

const Container = styled.View`
  margin-top: 20px;
  align-items: center;
  padding-horizontal: 16px;
`;

const InfoText = styled(BodyMediumText)`
  text-align: center;
  color: ${themeColors().grey.main};
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(20)}px;
  font-weight: 200;
`;

const TextWithUnderline = styled(BodyMediumText)`
  color: ${themeColors().grey.main};
  font-size: ${moderateScale(12)}px;
  font-weight: 200;
  text-decoration: underline;
  text-decoration-color: ${themeColors().grey.main};
`;

export default TermsAndPrivacyPolicyAgreement;
