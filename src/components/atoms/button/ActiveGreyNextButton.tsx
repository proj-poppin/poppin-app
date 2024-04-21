import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

interface ActiveGreyNextButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
}

const ActiveGreyNextButton: React.FC<ActiveGreyNextButtonProps> = ({
  onPress,
  title,
  style = {},
}) => (
  <Pressable
    style={[style, styles.button, {width: '85%'}, {height: 50}]}
    onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: globalColors.component,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default ActiveGreyNextButton;
