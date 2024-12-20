// components/StepOne.tsx
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../../Util';
import {useOperatorReportStore} from '../../../Screen/MyPage/Request/Operator/Mypage.report.operator.zustand';
import {Alert} from 'react-native';
import {RequiredMark} from './ReportStepTwo';
import CommonCompleteButton from '../../../Screen/Popup/Landing/common.complete.button';

export interface StepProps {
  onNext: () => void;
  onBackPress?: () => void;
}

const ReportStepOne: React.FC<StepProps> = ({onNext}) => {
  const [informerCompanyLength, setInformerCompanyLength] = useState(0);
  const [informerEmailLength, setInformerEmailLength] = useState(0);

  const {informerCompany, informerEmail, setInformerCompany, setInformerEmail} =
    useOperatorReportStore();

  const handleinformerCompanyChange = (text: string) => {
    if (text.length <= 30) {
      setInformerCompany(text);
      setInformerCompanyLength(text.length);
    }
  };

  const handleEmailChange = (text: string) => {
    if (text.length <= 50) {
      setInformerEmail(text);
      setInformerEmailLength(text.length);
    }
  };

  const handleNext = () => {
    if (!informerCompany.trim()) {
      Alert.alert('알림', '소속(업체명)을 입력해주세요.');
      return;
    }
    if (!informerEmail.trim()) {
      Alert.alert('알림', '이메일을 입력해주세요.');
      return;
    }
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(informerEmail)) {
      Alert.alert('알림', '올바른 이메일 형식을 입력해주세요.');
      return;
    }
    onNext();
  };

  return (
    <Container>
      <InputWrapper>
        <TitleText>POPPIN에 등록하기 위한{'\n'}정보가 필요해요</TitleText>
        <Label>
          소속(업체명)<RequiredMark>*</RequiredMark>
        </Label>
        <StyledInput
          placeholder="소속(업체명)"
          placeholderTextColor={'#9F9F9F'}
          value={informerCompany}
          onChangeText={handleinformerCompanyChange}
          maxLength={30}
        />
        <CountText>{informerCompanyLength}/30</CountText>
      </InputWrapper>
      <InputWrapper>
        <Label>
          이메일<RequiredMark>*</RequiredMark>
        </Label>
        <StyledInput
          placeholder="이메일"
          placeholderTextColor={'#9F9F9F'}
          value={informerEmail}
          onChangeText={handleEmailChange}
          maxLength={50}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CountText>{informerEmailLength}/50</CountText>
      </InputWrapper>
      <InfoText>
        *제공해주신 이메일로 정보확인차 연락을 드릴 예정이니,{'\n'}
        이메일 정보가 정확한지 확인하여 주시기 바랍니다.
      </InfoText>
      <CommonCompleteButton
        style={[{marginTop: 250}, {width: '100%'}]}
        title={'다음'}
        onPress={handleNext}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 0 ${moderateScale(10)}px;
  background-color: #ffffff;
`;

const InputWrapper = styled.View`
  margin-top: ${moderateScale(20)}px;

  &:first-child {
    margin-top: ${moderateScale(10)}px;
  }
`;

const Label = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
  margin-bottom: ${moderateScale(8)}px;
`;

const StyledInput = styled.TextInput`
  border: 1px solid ${props => props.theme.color.grey.main};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(12)}px;
  font-size: ${moderateScale(14)}px;
  color: ${props => props.theme.color.grey.black};
`;

const CountText = styled.Text`
  align-self: flex-end;
  color: ${props => props.theme.color.grey.black};
  font-size: ${moderateScale(12)}px;
  margin-top: ${moderateScale(4)}px;
`;

const InfoText = styled.Text`
  color: ${props => props.theme.color.grey.main};
  text-align: center;
  padding-top: ${moderateScale(20)}px;
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(18)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(20)}px;
  font-weight: 600;
  margin-bottom: ${moderateScale(32)}px;
  line-height: ${moderateScale(24)}px;
`;

export default ReportStepOne;
