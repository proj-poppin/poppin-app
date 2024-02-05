import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import primaryColors from '../style/primaryColors.ts';
import {globalStyles} from '../style/textStyles.ts';

interface NextButtonProps {
  onPress: () => void;
  title: string;
}

const NextButton: React.FC<NextButtonProps> = ({onPress, title}) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    width: '85%',
    height: 47,
    borderRadius: 25,
    marginTop: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: primaryColors.stroke,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default NextButton;
