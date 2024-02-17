// SignUpSucceedScreen.js
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../style/textStyles.ts';
import WelcomeSvg from '../../assets/icons/welcome.svg';
import CompleteButton from '../../components/CompleteButton.tsx';
import BlueDotsThreeSvg from '../../assets/icons/blueDotsThree.svg';
import primaryColors from '../../style/primaryColors.ts';
import NextButton from '../../components/NextButton.tsx';

import WatchSvg from '../../assets/icons/watch.svg';
import WatchFilledSvg from '../../assets/icons/watchFilled.svg';

function SignUpSucceedScreen({route, navigation}) {
  // route 파라미터 추가
  // route.params에서 nickname 추출
  const {nickname} = route.params;
  return (
    <View style={styles.container}>
      <WelcomeSvg />
      <Text style={[globalStyles.title, styles.nicknameText]}>
        {`${nickname}님`}
      </Text>
      <Text style={[globalStyles.title, styles.welcomeText]}>환영해요!</Text>
      <CompleteButton
        onPress={() => navigation.navigate('Preference')}
        title="취향 설정하러 가기"
        loading={false}
        disabled={false}
      />
      <BlueDotsThreeSvg style={styles.svgStyle} />
      <Text
        style={[
          globalStyles.labelSub,
          {color: primaryColors.blue, textAlign: 'center'},
        ]}>
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
