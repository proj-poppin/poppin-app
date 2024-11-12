import React, {useRef, useEffect} from 'react';
import {Dimensions, Animated, Easing} from 'react-native';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import {useResearchUploadScreenStore} from './research.upload.zustand';
import {moderateScale} from 'src/Util';

/**
 * 프로젝트 업로드 페이지 상단 진행률 표시 바입니다. 완료 페이지에서는 무조건 100% 로 표시됩니다.
 * TODO: 컴포넌트화 시킵니다.
 * @author 현웅
 */
export const AuthPreferenceProgressBar = () => {
  const deviceWidth = Math.floor(Dimensions.get('window').width);
  const {allResearchUploadSteps, researchUploadStep} =
    useResearchUploadScreenStore(
      state => ({
        allResearchUploadSteps: state.allResearchUploadSteps,
        researchUploadStep: state.researchUploadStep,
      }),
      shallow,
    );
  const progressBarXOffset = useRef(
    new Animated.Value(-1 * deviceWidth),
  ).current;

  const barWidthRatio =
    researchUploadStep === 'COMPLETE'
      ? 1
      : (allResearchUploadSteps.indexOf(researchUploadStep) + 1) /
        allResearchUploadSteps.length;

  useEffect(() => {
    Animated.timing(progressBarXOffset, {
      toValue: -1 * deviceWidth + Math.floor(deviceWidth * barWidthRatio),
      duration: 500,
      easing: Easing.bezier(0.93, 0.02, 0.41, 0.82),
      useNativeDriver: true,
    }).start();
  }, [researchUploadStep]);

  return (
    <Container>
      <Bar style={{transform: [{translateX: progressBarXOffset}]}} />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const Bar = styled(Animated.View)`
  width: 100%;
  height: ${moderateScale(3)}px;
  background-color: ${({theme}) => theme.color.blue.main};
  border-radius: 4px;
`;
