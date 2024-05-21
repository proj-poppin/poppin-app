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
  isInstagram: boolean;
}

const VisitButton: React.FC<VisitButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  alwaysActive = false,
  buttonWidth = '50%',
  isInstagram,
}) => {
  const isVisitComplete = title === '방문완료';

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: isVisitComplete
            ? globalColors.blue
            : isInstagram
            ? pressed
              ? globalColors.buttonPressed
              : globalColors.blue
            : globalColors.white,
          borderColor:
            isInstagram || isVisitComplete ? 'transparent' : globalColors.blue,
          borderWidth: isInstagram || isVisitComplete ? 0 : 2,
          width: buttonWidth,
        },
        (disabled && !alwaysActive) || isVisitComplete
          ? styles.disabledButton
          : null,
      ]}
      onPress={onPress}
      disabled={(disabled && !alwaysActive) || isVisitComplete}>
      {loading ? (
        <ActivityIndicator
          color={isInstagram ? globalColors.white : globalColors.blue}
        />
      ) : (
        <Text
          style={[
            Text18B.text,
            {
              color:
                isVisitComplete || isInstagram
                  ? globalColors.white
                  : globalColors.blue,
            },
          ]}>
          {title}
        </Text>
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
