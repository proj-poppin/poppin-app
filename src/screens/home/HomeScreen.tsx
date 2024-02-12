import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import primaryColors from '../../style/primaryColors.ts';
import MainTitle from '../../components/MainTitle.tsx';
import {globalStyles} from '../../style/textStyles.ts';
import RoundRightSvg from '../../assets/icons/roundRight.svg';
import HomeMainTitle from '../../components/HomeMainTitle.tsx';
import AlarmOnSvg from '../../assets/icons/alarmOn.svg';
import AlarmOffSvg from '../../assets/icons/alarmOff.svg';
import DividerLine from '../../components/DividerLine.tsx';
import NotLogginBox from '../../components/NotLogginBox.tsx';
import QuestionSvg from '../../assets/icons/question.svg';
import DownSvg from '../../assets/icons/down.svg';
import RightSvg from '../../assets/icons/smallright.svg';
function HomeScreen() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handlePressQuestion = () => {
    setIsTooltipVisible(true);
  };

  const handleHideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const handlePress = () => {
    // 예: navigation.navigate('SomeScreen');
  };

  return (
    <View>
      <View style={styles.container}>
        <HomeMainTitle text1="어서오세요, OO님" />
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
            <Text style={globalStyles.bodyLargePrimary}>인기 TOP 5</Text>
            <QuestionSvg style={{paddingLeft: 40}} />
          </View>
          <DownSvg />
        </View>
        <View style={styles.middleContainer}>
          <Text style={globalStyles.bodyLargePrimary}>새로 오픈</Text>
          <View style={styles.textAndQuestionContainer}>
            <Text style={globalStyles.labelSubStroke}>전체 보기</Text>
            <RightSvg style={{paddingLeft: 20}} />
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={globalStyles.bodyLargePrimary}>종료 임박</Text>
          <View style={styles.textAndQuestionContainer}>
            <Text style={globalStyles.labelSubStroke}>전체 보기</Text>
            <RightSvg style={{paddingLeft: 20}} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    alignItems: 'center', // 이 속성으로 "인기 TOP 5" 텍스트와 QuestionSvg를 세로 중앙에 배치합니다.
  },
});
export default HomeScreen;
