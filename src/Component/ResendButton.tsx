import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import RedoSvg from 'src/Resource/svg/resend-verification-icon.svg';
import {themeColors} from '../Theme/theme';

interface ResendButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

const ResendButton: React.FC<ResendButtonProps> = ({onPress, isLoading}) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.resendButton}
      disabled={isLoading}>
      <RedoSvg />
      <Text style={styles.resendText}>
        {isLoading ? '재전송 중입니다...' : '재전송하기'}
      </Text>
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
    color: themeColors().blue.main,
  },
});

export default ResendButton;
