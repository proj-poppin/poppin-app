import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface CompleteButtonProps {
  onPress: () => void;
  onDisabledPress?: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  buttonWidth?: number | string; // 너비 조절을 위한 옵셔널 프로퍼티
}

const CompleteButton: React.FC<CompleteButtonProps> = ({
  onPress,
  onDisabledPress,
  title,
  loading,
  disabled,
  alwaysActive = false,
  buttonWidth = '100%', // 기본값 '100%'
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      {
        backgroundColor: pressed
          ? primaryColors.buttonPressed
          : disabled && !alwaysActive
          ? primaryColors.component
          : primaryColors.blue,
        width: buttonWidth, // 너비를 동적으로 조절
      },
      disabled && !alwaysActive && styles.disabledButton,
    ]}
    onPress={() => {
      if (!disabled || alwaysActive) {
        onPress();
      } else {
        onDisabledPress?.();
      }
    }}>
    {loading ? (
      <ActivityIndicator color={primaryColors.white} />
    ) : (
      <Text
        style={[
          globalStyles.bodyLargePrimaryBlack,
          {
            color:
              disabled && !alwaysActive
                ? primaryColors.font
                : primaryColors.white,
          },
        ]}>
        {title}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: primaryColors.component,
  },
});

export default CompleteButton;
