import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

type AbbBarRightPressableTextButtonProps = {
  onPress: () => void;
  text?: string;
  color?: string;
};

const HeaderRightPressableTextButton: React.FC<
  AbbBarRightPressableTextButtonProps
> = ({onPress, text = '완료', color = globalColors.blue}) => (
  <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
    <Text style={[styles.text, {color}]}>{text}</Text>
  </Pressable>
);

// StyleSheet를 사용하여 스타일 정의
const styles = StyleSheet.create({
  text: {
    marginRight: 10,
    // 여기에 필요한 텍스트 스타일을 추가할 수 있습니다.
  },
  pressed: {
    opacity: 0.5,
  },
});

export default HeaderRightPressableTextButton;
