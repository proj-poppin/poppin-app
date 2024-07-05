import React, {useCallback, useEffect, useRef} from 'react';
import {
  Text,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import Text16M from '../../../styles/texts/body_medium_large/Text16M.ts';

interface ToastComponentProps {
  message: string;
  height?: number;
  onClose: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  message,
  height = 50,
  onClose,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-height * 2)).current;
  const fadeInDuration = 1000;
  const visibleDuration = 3000; // 지속 시간을 3초로 변경
  const fadeOutDuration = 1000;

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeOutDuration,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -height * 2,
        duration: fadeOutDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [fadeOutDuration, fadeAnim, translateYAnim, height, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast();
    }, visibleDuration);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeInDuration,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: fadeInDuration,
        useNativeDriver: true,
      }),
    ]).start();
    return () => clearTimeout(timer);
  }, [
    visibleDuration,
    fadeOutDuration,
    onClose,
    fadeAnim,
    translateYAnim,
    height,
    hideToast,
  ]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: height,
      backgroundColor: globalColors.subBlack,
      zIndex: 2,
      paddingHorizontal: 10,
    } as ViewStyle,
  });

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={hideToast}>
      <Animated.View
        style={[
          styles.container,
          {opacity: fadeAnim, transform: [{translateY: translateYAnim}]},
        ]}>
        <Text style={[Text16M.text, {color: globalColors.white}]}>
          {message}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default ToastComponent;
