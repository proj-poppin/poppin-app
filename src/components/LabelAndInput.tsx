import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';
import globalColors from '../styles/color/globalColors.ts';
import Text20B from '../styles/texts/title/Text20B.ts';

interface LabelAndInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  errorText?: string;
  labelText: string;
  isPassword?: boolean;
  isPasswordSetting?: boolean;
  isPasswordSameSetting?: boolean;
  isPasswordSame?: boolean;
  value: string; // Add value prop here
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType = 'default',
  errorText,
  labelText,
  isPassword = false,
  isPasswordSetting = false,
  isPasswordSameSetting = false,
  isPasswordSame = false,
  value, // Use value prop here
}) => {
  const [secureTextEntry] = useState(isPassword);
  const [isValidLength, setIsValidLength] = useState(false);
  const [containsNumAndLetter, setContainsNumAndLetter] = useState(false);
  const [containsSpecialChar, setContainsSpecialChar] = useState(false);

  const handlePasswordValidation = (text: string) => {
    if (isPasswordSetting) {
      const isValidLength = text.length >= 8;
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
      <Text style={[Text20B.text, {marginBottom: 8}]}>{labelText}</Text>
      <TextInput
        style={[
          styles.textInput,
          {
            color: globalColors.black,
          } as TextStyle,
        ]}
        onChangeText={
          isPasswordSetting ? handlePasswordValidation : onChangeText
        }
        placeholder={placeholder}
        placeholderTextColor={globalColors.font}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        returnKeyType={isPassword ? 'done' : 'next'}
        value={value} // Use the value prop here
      />
      {isPasswordSetting && (
        <View style={styles.validationContainer}>
          <Text
            style={{
              color: containsNumAndLetter
                ? globalColors.blue
                : globalColors.font,
              paddingLeft: 10,
              fontSize: 13,
            }}>
            ✓ 영문/숫자
          </Text>
          <Text
            style={{
              color: containsSpecialChar
                ? globalColors.blue
                : globalColors.font,
              paddingLeft: 10,
              fontSize: 13,
            }}>
            ✓ 특수문자
          </Text>
          <Text
            style={{
              color: isValidLength ? globalColors.blue : globalColors.font,
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
            {color: isPasswordSame ? globalColors.blue : globalColors.font},
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
    borderColor: globalColors.warmGray,
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
