import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {globalStyles} from '../style/textStyles.ts';
import primaryColors from '../style/primaryColors.ts';

// Props 타입 정의
interface LabelAndInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  errorText?: string;
  labelText: string;
  isPassword?: boolean;
  isPasswordSetting?: boolean; // 비밀번호 설정 모드 여부
  isPasswordSameSetting?: boolean; // 비밀번호 일치 여부
  isPasswordSame?: boolean; // 비밀번호 일치 여부
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType = 'default',
  errorText,
  labelText,
  isPassword = false,
  isPasswordSetting = false, // 기본값은 false
  isPasswordSameSetting = false, // 기본값은 false
  isPasswordSame = false, // 기본값은 false
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  // 비밀번호 유효성 검사 상태
  const [isValidLength, setIsValidLength] = useState(false);
  const [containsNumAndLetter, setContainsNumAndLetter] = useState(false);
  const [containsSpecialChar, setContainsSpecialChar] = useState(false);

  // 변경된 비밀번호 유효성 검사 로직
  const handlePasswordValidation = (text: string) => {
    if (isPasswordSetting) {
      const isValidLength = text.length >= 8;
      // 영문자와 숫자가 각각 최소 1개 이상 포함되어 있는지 검사하는 정규식
      const containsNumAndLetter = /(?=.*[A-Za-z])(?=.*\d)/.test(text);
      const containsSpecialChar = /(?=.*[@$!%*#?&])/.test(text);

      setIsValidLength(isValidLength);
      setContainsNumAndLetter(containsNumAndLetter);
      setContainsSpecialChar(containsSpecialChar);
    }
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.title, {marginBottom: 8}]}>{labelText}</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            color: primaryColors.black,
          } as TextStyle,
        ]}
        onChangeText={
          isPasswordSetting ? handlePasswordValidation : onChangeText
        }
        placeholder={placeholder}
        placeholderTextColor={primaryColors.font}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={isPassword ? 'done' : 'next'} // Use "done" for password fields
      />
      {isPasswordSetting && (
        <View style={styles.validationContainer}>
          <Text
            style={{
              color: containsNumAndLetter
                ? primaryColors.blue
                : primaryColors.font,
              paddingLeft: 10,
              fontSize: 13,
            }}>
            ✓ 영문/숫자
          </Text>
          <Text
            style={{
              color: containsSpecialChar
                ? primaryColors.blue
                : primaryColors.font,
              paddingLeft: 10,
              fontSize: 13,
            }}>
            ✓ 특수문자
          </Text>
          <Text
            style={{
              color: isValidLength ? primaryColors.blue : primaryColors.font,
              paddingLeft: 10,
              fontSize: 13,
            }}>
            ✓ 8자 이상
          </Text>
        </View>
      )}
      {isPasswordSameSetting && (
        <Text
          style={[
            styles.validationText,
            {color: isPasswordSame ? primaryColors.blue : primaryColors.font},
          ]}>
          ✓ 비밀번호 일치
        </Text>
      )}
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: primaryColors.whiteGray,
    padding: 10,
    fontFamily: 'Pretandard-Regular',
    fontSize: 18,
    fontWeight: '400',
  },
  validationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  validationText: {
    marginTop: 5,
    fontSize: 13,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LabelAndInput;
