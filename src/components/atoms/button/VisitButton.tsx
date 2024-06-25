import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import Text18B from '../../../styles/texts/body_large/Text18B.ts';

interface VisitButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  buttonWidth?: number | string;
  backgroundColor: string;
  textColor: string;
}

const VisitButton: React.FC<VisitButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  alwaysActive = false,
  buttonWidth = '50%',
  backgroundColor,
  textColor,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor: textColor,
          borderWidth: 2,
          width: buttonWidth,
        },
        disabled && !alwaysActive ? styles.disabledButton : null,
      ]}
      onPress={onPress}
      disabled={disabled && !alwaysActive}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[Text18B.text, {color: textColor}]}>{title}</Text>
      )}
    </Pressable>
  );
};

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
  disabledButton: {
    backgroundColor: globalColors.blue,
  },
});

export default VisitButton;
