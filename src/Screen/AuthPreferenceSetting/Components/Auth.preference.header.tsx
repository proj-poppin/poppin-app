import React from 'react';
import {ScreenHeader} from 'src/Component/View';
import {ProgressBarStepComponentHeader} from 'src/Component/Image/ProgressBarComponent';
import styled from 'styled-components/native';

interface PreferenceProgressHeaderProps {
  currentStep: number;
  onSkip: () => void;
}

const PreferenceProgressHeader: React.FC<PreferenceProgressHeaderProps> = ({
  currentStep,
  onSkip,
}) => {
  return (
    <>
      <ScreenHeader
        title="나의 취향 설정하기"
        onPressRightComponent={onSkip}
        RightStyle={{paddingLeft: 36}}
        RightComponents={<SkipText>건너뛰기</SkipText>}
      />
      <ProgressBarStepComponentHeader
        step={currentStep}
        style={{width: '90%', alignItems: 'center'}}
      />
    </>
  );
};

const SkipText = styled.Text`
  color: ${({theme}) => theme.color.grey.main};
  font-weight: 500;
`;

export default PreferenceProgressHeader;
