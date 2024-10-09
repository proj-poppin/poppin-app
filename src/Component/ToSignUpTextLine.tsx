import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import RoundRightSvg from 'src/Resource/svg/right-arrow-circle-icon.svg';
import globalColors from '../styles/color/globalColors.ts';
import Text14M from '../styles/texts/body_medium/Text14M.ts';

// Props 타입 정의, 필요에 따라 추가적인 props를 정의할 수 있습니다
interface ToSignUpTextLineProps {
  titleText: string; // 텍스트 내용
  onPress: () => void; // 클릭 시 실행될 함수
}

const ToSignUpTextLine: React.FC<ToSignUpTextLineProps> = ({
  titleText,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[Text14M.text, styles.text]}>{titleText}</Text>
      <Pressable onPress={onPress} style={{padding: 10}}>
        <RoundRightSvg />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginRight: 5,
    alignSelf: 'center',
  },
  text: {
    color: globalColors.font,
  },
});

export default ToSignUpTextLine;
