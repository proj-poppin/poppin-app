import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import globalColors from '../utils/color/globalColors.ts';

interface NextButtonProps {
  onPress: () => void;
  title: string;
  widthRatio?: string; // `?`를 사용하여 옵셔널 프로퍼티로 선언
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  title,
  widthRatio = '85%', // 디폴트 값을 '85%'로 설정
}) => (
  <Pressable style={[styles.button, {width: widthRatio}]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    height: 47,
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: globalColors.stroke,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default NextButton;
