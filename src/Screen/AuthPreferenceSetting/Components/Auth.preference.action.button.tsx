import React from 'react';
import styled from 'styled-components/native';
import CommonCompleteButton from 'src/Components/Common/common.complete.button';
import { moderateScale } from 'src/Util';

interface PreferenceActionButtonsProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  isStepValid: (step: number) => boolean;
}

const PreferenceActionButtons: React.FC<PreferenceActionButtonsProps> = ({
  currentStep,
  onPrevious,
  onNext,
  isStepValid,
}) => {
  return currentStep === 1 ? (
    <CommonCompleteButton
      onPress={onNext}
      isDisabled={!isStepValid(currentStep)}
      title="다음"
    />
  ) : (
    <RowButtonContainer>
      <CommonCompleteButton
        isPreviousButton
        style={{width: '48%'}}
        onPress={onPrevious}
        isDisabled={false}
        title="이전"
      />
      <CommonCompleteButton
        style={{width: '48%'}}
        onPress={onNext}
        isDisabled={!isStepValid(currentStep)}
        title={currentStep === 3 ? '완료' : '다음'}
      />
    </RowButtonContainer>
  );
};

const RowButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${moderateScale(12)}px;
  justify-content: space-between;
`;

export default PreferenceActionButtons;
