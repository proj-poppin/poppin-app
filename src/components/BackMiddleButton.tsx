import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface BackMiddleButtonProps {
  onPress: () => void;
  title: string;
}

const BackMiddleButton: React.FC<BackMiddleButtonProps> = ({
  onPress,
  title,
}) => (
  <Pressable
    style={({pressed}) => [
      styles.button,
      pressed ? styles.buttonPressed : styles.buttonNormal,
    ]}
    onPress={onPress}>
    <Text style={[globalStyles.bodyLargePrimary, styles.buttonText]}>
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
    borderWidth: 1,
    borderColor: primaryColors.blue, // 테두리 색상
  },
  buttonNormal: {
    backgroundColor: 'white', // 기본 배경색
  },
  buttonPressed: {
    backgroundColor: `${primaryColors.blue}1A`, // 투명도 10% 적용
    // borderColor 변경을 위해 외부 라이브러리 사용 필요
  },
  buttonText: {
    color: primaryColors.blue, // 텍스트 색상
  },
});

export default BackMiddleButton;
