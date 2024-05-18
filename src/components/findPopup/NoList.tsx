import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FindPopupNoList from '../../assets/images/findPopupNoList.svg';
import globalColors from '../../styles/color/globalColors';
import NoListText from '../../assets/images/findPopupText.svg';

function NoList() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, marginBottom: 20}}>
        조건에 해당하는 팝업 이벤트가 없어요😥
      </Text>
      <FindPopupNoList width="300" height={200} />
      <NoListText width={250} height={80} />
      <View style={styles.textWrapper}>
        <Text style={{fontSize: 25, color: 'white'}}>제보하러 가기</Text>
      </View>
    </View>
  );
}

export default NoList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
  },
  textWrapper: {
    width: '90%',
    height: 80,
    backgroundColor: globalColors.blue,
    borderRadius: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
