// ResendButton.tsx
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import RedoSvg from '../../../assets/icons/redo.svg';
import globalColors from '../../../styles/color/globalColors.ts';

interface ResendButtonProps {
  onPressed: () => void;
}

const ResendButton: React.FC<ResendButtonProps> = ({onPressed}) => {
  return (
    <Pressable onPress={onPressed} style={styles.resendButton}>
      <RedoSvg />
      <Text style={styles.resendText}>재전송하기</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    marginLeft: 10,
    color: globalColors.blue,
  },
});

export default ResendButton;
