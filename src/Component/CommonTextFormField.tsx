import React, {useState} from 'react';
import {TextInput, KeyboardTypeOptions, Pressable} from 'react-native';
import styled from 'styled-components/native';
import PasswordWatchSvg from '../Resource/svg/password-watch-gray-icon.svg';
import PasswordWatchFilledSvg from '../Resource/svg/password-watch-blue-icon.svg';
import {themeColors} from '../Theme/theme';
import {moderateScale} from 'src/Util';

// Props 타입 정의
interface CommonTextFormFieldProps {
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errorText?: string;
  isPasswordType?: boolean; // 비밀번호 토글 버튼 필요 여부
}

const CommonTextFormField: React.FC<CommonTextFormFieldProps> = ({
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  errorText,
  isPasswordType = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry); // 비밀번호 보기 상태
  const toggleSecureEntry = () => setIsSecure(!isSecure);

  return (
    <Container>
      <StyledTextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
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
