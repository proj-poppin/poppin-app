import React, {useState, useEffect, useRef} from 'react';
import {Text, Animated, StyleSheet, ViewStyle} from 'react-native';
import Text14B from '../../../styles/texts/body_medium/Text14B.ts';
import Text12B from '../../../styles/texts/label/Text12B.ts';

interface ToastComponentProps {
  message: string;
  height?: number;
  onClose: () => void;
  duration?: number;
  fadeDuration?: number;
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  message,
  height = 40,
  onClose,
  duration = 3000,
  fadeDuration = 500,
}) => {
  const [isToastVisible, setIsToastVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToastVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isToastVisible ? 1 : 0,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start();
  }, [isToastVisible, fadeDuration, fadeAnim]);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 368,
      height: height,
      borderRadius: 14,
      marginTop: 110,
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 1,
    } as ViewStyle,
    toastText: {
      width: '100%',
      height: height,
      marginTop: 10,
      marginLeft: 10,
      lineHeight: 20,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#ffffff',
    },
  });

  if (!isToastVisible) {
    return null;
  }

  return (
    <Animated.View style={styles.container}>
      <Text style={[styles.toastText, Text14B.text, {color: 'white'}]}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default ToastComponent;
