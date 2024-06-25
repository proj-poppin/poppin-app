import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import LoadingLoopSvg from '../assets/likes/loadingLoop.svg';

type NotLogginBoxProps = {
  text1: string;
  text2: string;
  buttonText: string;
  onPress: () => void;
  isNeedBox?: boolean;
  isNeedSvg?: boolean;
};

const ForLoginBox = ({
  text1,
  text2,
  buttonText,
  onPress,
  isNeedBox = true,
  isNeedSvg = true,
}: NotLogginBoxProps) => {
  return (
    <View
      style={[
        styles.container,
        isNeedBox ? styles.shadowedBox : styles.boxWithoutShadow,
      ]}>
      {isNeedSvg && <LoadingLoopSvg style={{alignItems: 'center'}} />}
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          {text1} {'\n'}
          {text2}
        </Text>
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  shadowedBox: {
    backgroundColor: globalColors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  boxWithoutShadow: {
    backgroundColor: globalColors.white,
    padding: 20,
    marginBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Pretandard-Semibold',
    fontWeight: '400',
    marginBottom: 20,
  },
  button: {
    backgroundColor: globalColors.blue,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: globalColors.white,
    fontSize: 16,
  },
});

export default ForLoginBox;
