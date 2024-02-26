// ShadowedBox.js
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import Colors from '../style/primaryColors.ts';

const NotLogginBox = ({text1, text2, buttonText, onPress}) => {
  return (
    <View style={styles.shadowedBox}>
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
    backgroundColor: primaryColors.white,
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
    marginBottom: 20, // Adjust as needed
  },
  contentContainer: {
    alignItems: 'center', // Center the content
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Pretandard-Semibold',
    fontWeight: '300',
    marginBottom: 20, // Adjust as needed
  },
  button: {
    backgroundColor: primaryColors.blue, // A nice shade of blue
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: primaryColors.white,
    fontSize: 16,
  },
});

export default NotLogginBox;
