import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

const NotLogginBox = ({
  text1,
  text2,
  buttonText,
  onPress,
  isNeedBox = true,
}) => {
  return (
    <View style={isNeedBox ? styles.shadowedBox : styles.boxWithoutShadow}>
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

export default NotLogginBox;
