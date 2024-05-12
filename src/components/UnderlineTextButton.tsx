import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';

// Props 타입 정의
interface UnderlinedTextButtonProps {
  label: string;
  onClicked: () => void;
}

const UnderlinedTextButton: React.FC<UnderlinedTextButtonProps> = ({
  label,
  onClicked,
}) => {
  return (
    <Pressable onPress={onClicked}>
      <Text style={styles.link}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    color: globalColors.font, // Assuming you want the link color to be blue
    fontSize: 14,
    fontWeight: '400', // Standard weight for clickable text
    marginTop: 10,
  },
});

export default UnderlinedTextButton;
