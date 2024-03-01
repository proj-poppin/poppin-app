import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface NextMiddleButtonProps {
  onPress: () => void;
  title: string;
  buttonWidth?: number | string; // 너비 조절을 위한 옵셔널 프로퍼티
}

const NextMiddleButton: React.FC<NextMiddleButtonProps> = ({
  onPress,
  title,
  buttonWidth = '50%', // 기본값 '55%'
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      {
        backgroundColor: pressed
          ? primaryColors.buttonPressed
          : primaryColors.blue,
        width: buttonWidth, // 너비를 동적으로 조절
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
    width: '55%',
    height: 52,
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
