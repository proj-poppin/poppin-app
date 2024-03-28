import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import OnboardingSvg1 from '../../assets/images/onboarding1.svg';
import OnboardingSvg2 from '../../assets/images/onboarding2.svg';
import OnboardingSvg3 from '../../assets/images/onboarding3.svg';

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onboardingItems = [
    {
      svg: OnboardingSvg1,
      text: '팝핀이 재미있는 팝업을 찾고 있어요',
    },
    {
      svg: OnboardingSvg2,
      text: '관심사를 알려주세요\n팝핀이 딱맞는 팝업을 추천해드려요',
    },
    {
      svg: OnboardingSvg3,
      text: '방문하기 버튼을 누르면\n혼잡도를 알 수 있어요',
    },
  ];

  const handleScreenTouch = () => {
    console.log('currentIndex:', currentIndex);
    if (currentIndex < onboardingItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // TODO 온보딩 완료 처리 필요. AsyncStorage 등을 사용하여 온보딩 완료 여부를 저장하고 조회하는 로직을 구현.
      // navigation.navigate('SignInEmail'); // 마지막 온보딩 화면에서는 로그인 화면으로 이동
    }
  };

  const {svg: SvgComponent, text} = onboardingItems[currentIndex];
  // Pressable 대신 TouchableOpacity를 사용하니까 흰색으로 번지는 에러
  return (
    <Pressable style={styles.container} onPress={handleScreenTouch}>
      <View style={styles.svgContainer}>
        <SvgComponent />
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 검은색 배경 투명도 60%
  },
  svgContainer: {
    marginBottom: 20, // SVG와 텍스트 사이의 간격
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default OnboardingScreen;
