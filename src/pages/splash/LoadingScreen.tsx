// src/components/LoadingScreen.js
import React, {useEffect, useRef} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';
import LoadingSvg from '../../assets/images/loading.svg';
import globalColors from '../../styles/color/globalColors.ts';

const LoadingScreen = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const opacityAnim = useRef(new Animated.Value(0.6)).current; // 시작 투명도를 0.6로 설정

  useEffect(() => {
    if (isLoading) {
      // 로딩 중일 때 배경 투명도 애니메이션 시작
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 1000,
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
    return null;
  }

  return (
    <Modal transparent={true} visible={isLoading} animationType="none">
      <View style={styles.container}>
        <Animated.View style={[styles.overlay, {opacity: opacityAnim}]} />
        <LoadingSvg />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // 컨테이너 배경 투명
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // overlay를 전체 화면으로 설정
    backgroundColor: globalColors.black, // 배경색 투명도 0.5로 고정
  },
});

export default LoadingScreen;
