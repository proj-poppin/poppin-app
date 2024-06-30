import React, {useEffect, useRef} from 'react';
import {Text, Animated, StyleSheet, ViewStyle} from 'react-native';
import Text14B from '../../../styles/texts/body_medium/Text14B';

interface ToastComponentProps {
  message: string;
  height?: number;
  onClose: () => void;
  duration?: number;
  fadeDuration?: number;
  bottom?: string | number; // Add bottom prop
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  message,
  height = 35,
  onClose,
  duration = 1500,
  fadeDuration = 500,
  bottom = '40%', // Default value for bottom
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start(() => {
        onClose();
      });
    }, duration);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();

    return () => clearTimeout(timer);
  }, [duration, fadeDuration, onClose, fadeAnim]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: typeof bottom === 'string' ? bottom : `${bottom}%`, // Apply bottom prop
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: 368,
      height: height,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 2,
    } as ViewStyle,
    toastText: {
      width: '100%',
      height: height,
      lineHeight: 20,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#ffffff',
    },
  });

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Text style={[styles.toastText, Text14B.text, {color: 'white'}]}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default ToastComponent;
