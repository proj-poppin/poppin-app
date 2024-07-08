import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import LeftArrow from '../../assets/icons/leftArrow.svg';

function PolicyScreen({navigation}) {
  const handlePress = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() =>
          handlePress(
            'https://translucent-saver-b25.notion.site/2-13ver-fffbe3f598b14e2e9723486c33b38128?pvs=74',
          )
        }>
        <Text>서비스 이용약관</Text>
        <LeftArrow />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() =>
          handlePress(
            'https://translucent-saver-b25.notion.site/2-21ver-7f7b0bf6605748c388f2c0484f093808',
          )
        }>
        <Text>개인정보 처리 방침</Text>
        <LeftArrow />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() =>
          handlePress(
            'https://translucent-saver-b25.notion.site/592d1e8dbf5749b4abaa93619aa9880f?pvs=258',
          )
        }>
        <Text>위치 기반 서비스 이용약관</Text>
        <LeftArrow />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  itemWrapper: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PolicyScreen;
