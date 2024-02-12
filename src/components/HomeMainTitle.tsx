import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PoppinSvg from '../assets/icons/poppin.svg';
import {globalStyles} from '../style/textStyles.ts';
import AlarmOnSvg from '../../assets/icons/alarmOn.svg';
import AlarmOffSvg from '../assets/icons/alarmOff.svg';
import NotLogginBox from './NotLogginBox.tsx';
// @ts-ignore
const HomeMainTitle = ({text1, text2}) => {
  const handlePress = () => {
    // 여기에 버튼 클릭 시 실행할 로직을 추가하세요.
    // 예: navigation.navigate('SomeScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <PoppinSvg />
        <AlarmOffSvg style={styles.alarmStyle} />
      </View>
      <Text style={[globalStyles.headline]}>
        {text1} {'\n'}
        {text2}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  ViewContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // 이 속성으로 모든 아이템을 세로 중앙에 배치합니다.
    marginBottom: 20,
    marginTop: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poppinStyle: {
    marginRight: 10, // PoppinSvg와 Text 사이의 간격을 조정합니다.
  },
  textStyle: {
    marginTop: 0, // marginTop을 조정하거나 제거합니다.
    paddingTop: 5,
  },
  alarmStyle: {
    // 필요에 따라 AlarmOffSvg 스타일을 조정합니다.
  },
});

export default HomeMainTitle;
