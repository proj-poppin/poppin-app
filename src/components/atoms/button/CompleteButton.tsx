import React, {useMemo} from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';
import throttle from 'lodash/throttle';

interface CompleteButtonProps {
  onPress: () => void;
  onDisabledPress?: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  buttonWidth?: number | string; // 너비 조절을 위한 옵셔널 프로퍼티
  style?: ViewStyle; // 추가된 스타일 속성
}

const CompleteButton: React.FC<CompleteButtonProps> = ({
  onPress,
  onDisabledPress,
  title,
  loading,
  disabled,
  alwaysActive = false,
  buttonWidth = '100%', // 기본값 '100%'
  style, // 추가된 스타일 속성
}) => {
  const throttledOnPress = useMemo(
    () =>
      throttle(() => {
        if (!disabled || alwaysActive) {
          onPress();
        } else {
          onDisabledPress?.();
        }
      }, 2000),
    [onPress, onDisabledPress, disabled, alwaysActive],
  );

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: pressed
            ? globalColors.buttonPressed
            : disabled && !alwaysActive
            ? globalColors.component
            : globalColors.blue,
          width: buttonWidth, // 너비를 동적으로 조절
        },
        disabled && !alwaysActive && styles.disabledButton,
        style, // 추가된 스타일 적용
      ]}
      onPress={throttledOnPress}>
      {loading ? (
        <ActivityIndicator color={globalColors.blue} />
      ) : (
        <Text
          style={[
            Text18B.text,
            {
              color:
                disabled && !alwaysActive
                  ? globalColors.font
                  : globalColors.white,
            },
            loading && {color: globalColors.blue},
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: globalColors.component,
  },
});

export default CompleteButton;
