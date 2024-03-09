import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface NextMiddleButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  buttonWidth?: number | string;
}

const NextMiddleButton: React.FC<NextMiddleButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  alwaysActive = false,
  buttonWidth = '50%',
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
        width: buttonWidth,
      },
      disabled && !alwaysActive && styles.disabledButton,
    ]}
    onPress={() => {
      if (!disabled || alwaysActive) {
        onPress();
      }
    }}
    disabled={disabled && !alwaysActive}>
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
    width: '55%',
    height: 52,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 10,
  },
  text: {
    // 이제 이 스타일은 필요 없으므로 제거합니다.
  },
  disabledButton: {
    backgroundColor: primaryColors.component,
  },
});

export default NextMiddleButton;
