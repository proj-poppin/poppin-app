import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface NextMiddleButtonProps {
  onPress: () => void;
  title: string;
}

const NextMiddleButton: React.FC<NextMiddleButtonProps> = ({
  onPress,
  title,
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      {
        backgroundColor: pressed
          ? primaryColors.buttonPressed
          : primaryColors.blue,
      },
    ]}
    onPress={onPress}>
    <Text
      style={[
        globalStyles.bodyLargePrimaryBlack,
        {color: primaryColors.white},
      ]}>
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 57,
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: primaryColors.blue, // 기본 배경 색상 설정
  },
});

export default NextMiddleButton;
