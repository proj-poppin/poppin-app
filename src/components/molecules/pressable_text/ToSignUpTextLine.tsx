import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import RoundRightSvg from '../../../assets/icons/roundRight.svg';
import Text14R from '../../../styles/texts/body_medium/Text14R.ts';
import globalColors from '../../../styles/color/globalColors.ts';
import Text14B from '../../../styles/texts/body_medium/Text14B.ts';

// Props 타입 정의, 필요에 따라 추가적인 props를 정의할 수 있습니다
interface ToSignUpTextLineProps {
  onPress: () => void; // 클릭 시 실행될 함수
}

const ToSignUpTextLine: React.FC<ToSignUpTextLineProps> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={[Text14B.text, styles.text]}>
        아직 POPPIN회원이 아니신가요?
      </Text>
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
    marginRight: 10,
    color: globalColors.font,
  },
});

export default ToSignUpTextLine;
