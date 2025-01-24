import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Modal, Animated, Easing} from 'react-native';
import LoadingSvg from 'src/Resource/svg/splash-loading-image.svg';
import styled from 'styled-components/native';

type LoadingScreenProps = {
  isLoading: boolean; // 로딩 상태를 prop으로 받음
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({isLoading}) => {
  const opacityAnim = useRef(new Animated.Value(0.6)).current; // 시작 투명도를 0.6으로 설정

  useEffect(() => {
    if (isLoading) {
      // 로딩 중일 때 배경 투명도 애니메이션 시작
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 1200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // 로딩이 완료되면 애니메이션을 리셋
      opacityAnim.setValue(0.6);
    }
  }, [isLoading, opacityAnim]);

  if (!isLoading) {
    return null; // 로딩 중이 아닐 경우 아무것도 렌더링하지 않음
  }

  return (
    <Modal transparent={true} visible={isLoading} animationType="none">
      <StyledContainer>
        <StyledOverlay style={{opacity: opacityAnim}} />
        <LoadingSvg />
      </StyledContainer>
    </Modal>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const StyledOverlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`;

export default LoadingScreen;
