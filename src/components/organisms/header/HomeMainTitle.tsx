import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Text24B from '../../../styles/texts/headline/Text24B.ts';

interface HomeMainTitleProps {
  text1: string;
  text2: string;
}

const HomeMainTitle: React.FC<HomeMainTitleProps> = ({text1, text2}) => {
  return (
    <Text style={[Text24B.text, styles.textStyle]}>
      {text1} {'\n'}
      {text2}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    // 텍스트 스타일 조정
    marginTop: 0, // marginTop을 조정하거나 제거합니다.
    paddingTop: 5,
  },
});

export default HomeMainTitle;
