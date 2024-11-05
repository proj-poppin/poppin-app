// components/Header.tsx
import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from '../../Util';
import {SubmitButtonText} from './ReportStepTwo';

interface HeaderProps {
  stepNum: number;
  onBackPress: () => void;
}

export const StepHeader: React.FC<HeaderProps> = ({stepNum, onBackPress}) => {
  return (
    <>
      <ProgressContainer>
        <SubmitButtonText>이전 </SubmitButtonText>
        <ProgressBar step={stepNum} />
      </ProgressContainer>
    </>
  );
};

const ProgressContainer = styled.View`
  width: 100%;
  padding: ${moderateScale(16)}px;
  height: 3px;
  background-color: #ffffff;
`;

const ProgressBar = styled.View<{step: number}>`
  height: 3px;
  background-color: ${theme => theme.theme.color.blue.main};
  width: ${({step}) => `${(step / 3) * 100}%`};
`;

export default StepHeader;
