import React, {useEffect, useRef, useState} from 'react';
import {ScrollViewPage} from '../../../../Component/Page';
import StepOne from '../../../../Component/MyPage/Report/ReportStepOne';
import StepTwo from '../../../../Component/MyPage/Report/ReportStepTwo';
import StepHeader from '../../../../Component/MyPage/Report/StepHeader';
import StepThree from '../../../../Component/MyPage/Report/ReportStepThree';
import {StyleProp, ViewStyle, Platform, Alert} from 'react-native';
import {useOperatorReportStore} from './Mypage.report.operator.zustand';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {AppStackProps} from '../../../../Navigator/App.stack.navigator';

export type MypageReportOperatorScreenProps = {};

export const MypageReportOperatorScreen: React.FC = () => {
  const navigation =
    useNavigation<
      NavigationProp<AppStackProps, 'MypageReportOperatorScreen'>
    >();
  const [currentStep, setCurrentStep] = useState(1);
  const {requestLoading, validate, requestOperatorReport} =
    useOperatorReportStore();
  const handleBackPress = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={() => setCurrentStep(2)} />;
      case 2:
        return (
          <StepTwo
            onNext={() => setCurrentStep(3)}
            onBackPress={handleBackPress}
          />
        );
      case 3:
        return (
          //TODO- [규진]- 제보하기 API 연동 기능 추가
          <StepThree
            onNext={() => handleSubmit()}
            onBackPress={handleBackPress}
          />
        );
      default:
        return undefined;
    }
  };

  const handleSubmit = async () => {
    try {
      // 유효성 검사
      if (!validate()) {
        return;
      }

      // 제보 요청
      const response = await requestOperatorReport();

      Alert.alert('알림', '제보가 성공적으로 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.dispatch(
              StackActions.replace('LandingBottomTabNavigator'),
            );
          },
        },
      ]);
    } catch (error) {
      console.error('제보 등록 실패:', error);
    }
  };

  return (
    <ScrollViewPage
      UpperPart={
        <StepHeader stepNum={currentStep} onBackPress={handleBackPress} />
      }
      PageContent={renderStepContent()}
      contentContainerStyle={contentContainerStyle}
    />
  );
};

const contentContainerStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  backgroundColor: '#ffffff',
  paddingHorizontal: 16,
  paddingBottom: Platform.OS === 'ios' ? 34 : 16, // iOS의 경우 하단 여백 추가
};
