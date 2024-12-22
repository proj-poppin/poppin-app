import React, {useState, useEffect} from 'react';
import {TextInput, KeyboardTypeOptions, Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import PasswordWatchSvg from '../Resource/svg/password-watch-gray-icon.svg';
import PasswordWatchFilledSvg from '../Resource/svg/password-watch-blue-icon.svg';
import {themeColors} from '../Theme/theme';
import {moderateScale} from 'src/Util';

interface CommonTextFormFieldProps {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errorText?: string;
  isPasswordType?: boolean;
  isAuthCodeForm?: boolean;
  countdown?: number;
  isLoading?: boolean; // Prop to show "재전송 중입니다..."
}

const CommonTextFormField: React.FC<CommonTextFormFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  errorText,
  isPasswordType = false,
  isAuthCodeForm = false,
  countdown = 180,
  isLoading = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [timeLeft, setTimeLeft] = useState(countdown);

  const toggleSecureEntry = () => setIsSecure(!isSecure);

  useEffect(() => {
    if (isAuthCodeForm && timeLeft > 0 && !isLoading) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isAuthCodeForm, timeLeft, isLoading]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${`0${remainingSeconds}`.slice(-2)} 초 남음`;
  };

  return (
    <Container>
      {isAuthCodeForm && (
        <TimerContainer>
          <TimerText>
            {isLoading ? '재전송 중입니다...' : formatTime(timeLeft)}
          </TimerText>
        </TimerContainer>
      )}
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={themeColors().grey.main}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
        isWatchNeed={isPasswordType}
      />
      {isPasswordType && (
        <IconButton onPress={toggleSecureEntry}>
          {isSecure ? <PasswordWatchSvg /> : <PasswordWatchFilledSvg />}
        </IconButton>
      )}
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

export default CommonTextFormField;

// Styled components
const Container = styled.View`
  margin-bottom: ${moderateScale(20)}px;
`;

const StyledTextInput = styled.TextInput<{isWatchNeed: boolean}>`
  border-bottom-width: ${moderateScale(1)}px;
  border-color: ${themeColors().grey.mild};
  padding: ${moderateScale(10)}px;
  color: black;
  font-size: ${moderateScale(16)}px;
  ${({isWatchNeed}) => isWatchNeed && `padding-right: ${moderateScale(40)}px;`}
`;

const IconButton = styled(Pressable)`
  position: absolute;
  right: ${moderateScale(10)}px;
  top: ${moderateScale(10)}px;
  z-index: 1000;
`;

const ErrorText = styled.Text`
  color: red;
  margin-top: ${moderateScale(5)}px;
  font-size: ${moderateScale(14)}px;
`;

const TimerContainer = styled.View`
  position: absolute;
  right: 0;
  top: -20px;
`;

const TimerText = styled.Text`
  color: ${themeColors().blue.main};
  font-size: ${moderateScale(14)}px;
`;
