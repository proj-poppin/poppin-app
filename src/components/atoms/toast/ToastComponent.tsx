import React, {useState, useEffect, useRef} from 'react';
import {Text, Animated, StyleSheet, ViewStyle} from 'react-native';

interface ToastComponentProps {
  message: string;
  height?: number;
  onClose: () => void;
  duration?: number;
  fadeDuration?: number;
}

const ToastComponent: React.FC<ToastComponentProps> = ({
  message,
  height = 50,
  onClose,
  duration = 4000,
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
      marginTop: 160,
      marginLeft: 16,
      marginRight: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      opacity: 10.0,
    } as ViewStyle,
    toastText: {
      width: '100%',
      height: height,
      fontSize: 15,
      marginTop: 10,
      marginLeft: 10,
      fontWeight: 'normal',
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
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

export default ToastComponent;
