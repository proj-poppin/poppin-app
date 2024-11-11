import React, {useEffect, useRef, useState} from 'react';
import {ScrollViewPage} from '../../../../Component/Page';
import StepOne from '../../../../Component/MyPage/Report/ReportStepOne';
import StepTwo from '../../../../Component/MyPage/Report/ReportStepTwo';
import StepHeader from '../../../../Component/MyPage/Report/StepHeader';
import StepThree from '../../../../Component/MyPage/Report/ReportStepThree';
import {StyleProp, ViewStyle, Platform} from 'react-native';
import {axiosMyPageOperatorReport} from '../../../../Axios/Mypage/mypage.post.axios';
import {useReportStore} from './Mypage.report.operator.zustand';

export const MyPageReportOperatorScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const param = useReportStore();
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
            onNext={() => axiosMyPageOperatorReport(param)}
            onBackPress={handleBackPress}
          />
        );
      default:
        return undefined;
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

export default MyPageReportOperatorScreen;