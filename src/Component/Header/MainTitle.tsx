import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PoppinSvg from 'src/Resource/svg/default-app-logo-icon.svg';
import Text24B from '../../styles/texts/headline/Text24B.ts';
// Props 타입 정의
interface MainTitleProps {
  text1: string;
  text2: string;
  isPoppinLogo?: boolean;
  isNeedCenter?: boolean;
}

const MainTitle: React.FC<MainTitleProps> = ({
  text1,
  text2,
  isPoppinLogo = false,
  isNeedCenter = false, // 기본값은 false
}) => {
  return (
    <View style={[styles.container, isNeedCenter ? styles.centerContent : {}]}>
      {isPoppinLogo && <PoppinSvg />}
      <Text
        style={[
          Text24B.text,
          isNeedCenter ? styles.centerText : {},
          {marginTop: isPoppinLogo ? 5 : 20, marginBottom: 16},
        ]}>
        {text1}
        {'\n'}
        {text2}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 64,
  },
  centerContent: {
    flexDirection: 'row', // 가로로 나열
    justifyContent: 'center', // 가로축에서 중앙 정렬
    alignItems: 'center', // 세로축에서 중앙 정렬
  },
  centerText: {
    textAlign: 'center', // 텍스트 중앙 정렬
  },
});

export default MainTitle;
