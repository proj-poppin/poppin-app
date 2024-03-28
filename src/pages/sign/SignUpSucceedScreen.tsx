// SignUpSucceedScreen.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WelcomeSvg from '../../assets/icons/welcome.svg';
import CompleteButton from '../../components/CompleteButton.tsx';
import BlueDotsThreeSvg from '../../assets/icons/blueDotsThree.svg';
import globalColors from '../../styles/color/globalColors.ts';
import NextButton from '../../components/NextButton.tsx';

import Text13R from '../../styles/texts/label/Text12R.ts';
import Text20B from '../../styles/texts/title/Text20B.ts';

function SignUpSucceedScreen({route, navigation}) {
  const {nickname} = route.params;
  return (
    <View style={styles.container}>
      <WelcomeSvg />
      <Text style={[Text20B.text, styles.nicknameText]}>{`${nickname}님`}</Text>
      <Text style={[Text20B.text, styles.welcomeText]}>환영해요!</Text>
      <CompleteButton
        onPress={() => navigation.navigate('Preference')}
        title="취향 설정하러 가기"
        loading={false}
        disabled={false}
      />
      <BlueDotsThreeSvg style={styles.svgStyle} />
      <Text
        style={[Text13R.text, {color: globalColors.blue, textAlign: 'center'}]}>
        맞춤형 키워드를 설정하고{'\n'}취향에 꼭 맞는 팝업 스토어 추천을
        받아보세요.
      </Text>
      <NextButton
        onPress={() => navigation.navigate('Main')}
        title="다음에 하기"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  nicknameText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 5,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  svgStyle: {
    marginVertical: 20,
  },
});

export default SignUpSucceedScreen;
