// PressableGreyTextWord.js
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Text14M from '../styles/texts/body_medium/Text14M.ts';
import globalColors from '../styles/color/globalColors.ts';

interface PressableGreyTextWordProps {
  onPressed: () => void;
  text: string;
}

const PressableGreyTextWord: React.FC<PressableGreyTextWordProps> = ({
  onPressed,
  text,
}) => {
  return (
    <Pressable onPress={onPressed}>
      <Text style={[Text14M.text, styles.text]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: globalColors.font,
  },
});

export default PressableGreyTextWord;
