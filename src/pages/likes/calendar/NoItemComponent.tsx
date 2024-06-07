import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StarOnSvg from '../../../assets/icons/starOn.svg';

const NoItemComponent: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <StarOnSvg width={40} height={40} />
      <Text style={[styles.textStyle, {paddingTop: 7.5}]}>
        저장한 팝업이 없어요!🫤
      </Text>
      <Text style={[styles.textStyle, {paddingTop: 3}]}>관심 있는 팝업을 저장해 보세요.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NoItemComponent;
