import React from 'react';
import {Text, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import Text20M from '../../../styles/texts/title/Text20M.ts';

interface LabelText20BProps {
  text: string;
}

const LabelText20M: React.FC<LabelText20BProps> = ({text}) => {
  return <Text style={[styles.label, Text20M.text]}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    color: globalColors.black,
  },
});

export default LabelText20M;
