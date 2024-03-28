import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import globalColors from '../../utils/color/globalColors.ts';
import HomeMainTitle from '../../components/HomeMainTitle.tsx';
import DividerLine from '../../components/DividerLine.tsx';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import QuestionSvg from '../../assets/icons/question.svg';
import DownSvg from '../../assets/icons/down.svg';
import RightSvg from '../../assets/icons/smallright.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text18B from '../../components/texts/body_large/Text18B.ts';
import Text12R from '../../components/texts/label/Text12R.ts';

function HomeScreen({navigation}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handlePressQuestion = () => {
    setIsTooltipVisible(true);
  };

  const handleHideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const handlePress = () => {
    navigation.replace('SignInEmail');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: globalColors.white}}>
      <View style={styles.container}>
        <HomeMainTitle text1="어서오세요, OO님" />
        {/*<NaverMapView />*/}
        <NotLogginBox
          text1={'로그인하고'}
          text2={'팝업 추천을 받아보세요!'}
          buttonText={'로그인 하러 가기'}
          onPress={handlePress}
        />
      </View>
      <DividerLine />
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <View style={styles.textAndQuestionContainer}>
            <Text style={Text18B.text}>인기 TOP 5</Text>
            <QuestionSvg style={{paddingLeft: 40}} />
          </View>
          <DownSvg />
        </View>
        <View style={styles.middleContainer}>
          <Text style={Text18B.text}>새로 오픈</Text>
          <View style={styles.textAndQuestionContainer}>
            <Text style={[Text12R.text, {color: globalColors.stroke}]}>
              전체 보기
            </Text>
            <RightSvg style={{paddingLeft: 20}} />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={Text18B.text}>종료 임박</Text>
          <View style={styles.textAndQuestionContainer}>
            <Text style={[Text12R.text, {color: globalColors.stroke}]}>
              전체 보기
            </Text>
            <RightSvg style={{paddingLeft: 20}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  textAndQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default HomeScreen;
