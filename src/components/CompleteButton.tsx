import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface CompleteButtonProps {
  onPress: () => void;
  onDisabledPress?: () => void; // 옵셔널 프로퍼티로 변경
  title: string;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
}

const CompleteButton: React.FC<CompleteButtonProps> = ({
  onPress,
  onDisabledPress, // 옵셔널 프로퍼티
  title,
  loading,
  disabled,
  alwaysActive = false,
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
      },
      disabled && !alwaysActive && styles.disabledButton,
    ]}
    onPress={() => {
      if (!disabled || alwaysActive) {
        onPress();
      } else {
        // 옵셔널 체이닝을 사용하여 존재할 때만 onDisabledPress 호출
        onDisabledPress?.();
      }
    }}>
    {loading ? (
      <ActivityIndicator color={primaryColors.white} />
    ) : (
      <Text
        style={[
          globalStyles.bodyLargePrimary,
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
    width: '85%',
    height: 57,
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
