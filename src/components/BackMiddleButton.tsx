import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';
import Text18B from './texts/body_large/Text18B.ts';

interface BackMiddleButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string; // 선택적 속성으로 텍스트 색상 추가
  buttonWidth?: number | string; // 너비 조절을 위한 옵셔널 프로퍼티
}

const BackMiddleButton: React.FC<BackMiddleButtonProps> = ({
  onPress,
  title,
  textColor, // 텍스트 색상을 props로 받음
  buttonWidth = '50%', // 기본값 '55%'
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      pressed ? styles.buttonPressed : styles.buttonNormal,
      {width: buttonWidth},
    ]}
    onPress={onPress}>
    <Text style={[Text18B.text, {color: textColor || globalColors.font}]}>
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
    borderWidth: 1,
    borderColor: globalColors.blue, // 테두리 색상
  },
  buttonNormal: {
    backgroundColor: 'white', // 기본 배경색
  },
  buttonPressed: {
    backgroundColor: `${globalColors.blue}1A`, // 투명도 10% 적용
  },
});

export default BackMiddleButton;
