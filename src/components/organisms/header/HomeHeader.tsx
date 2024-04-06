import React from 'react';
import {View, StyleSheet} from 'react-native';
import PoppinSvg from '../../../assets/icons/poppin.svg';
import AlarmOffSvg from '../../../assets/icons/alarmOff.svg';

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <PoppinSvg />
      <AlarmOffSvg style={styles.alarmStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  alarmStyle: {
    // 필요에 따라 AlarmOffSvg 스타일을 조정합니다.
  },
});

export default HomeHeader;
