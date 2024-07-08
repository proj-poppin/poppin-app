import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import PasswordWatchSvg from '../../../assets/icons/watch.svg';
import PasswordWatchFilledSvg from '../../../assets/icons/watchFilled.svg';
import Text16M from '../../../styles/texts/body_medium_large/Text16M.ts';

interface PasswordInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  // 유효성 검사 결과
  isValidLength: boolean;
  containsNumAndLetter: boolean;
  containsSpecialChar: boolean;
  // 비밀번호 일치 여부
  isPasswordSame?: boolean;
  isPasswordSetting?: boolean;
}

const PasswordCheckTextFormField: React.FC<PasswordInputProps> = ({
  onChangeText,
  placeholder,
  isValidLength,
  containsNumAndLetter,
  containsSpecialChar,
  isPasswordSame = false,
  isPasswordSetting = false,
}) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[Text16M.text, styles.textInput]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={globalColors.font}
        secureTextEntry={secureTextEntry}
      />
      <Pressable onPress={toggleSecureEntry} style={styles.icon}>
        {secureTextEntry ? <PasswordWatchSvg /> : <PasswordWatchFilledSvg />}
      </Pressable>
      {!isPasswordSetting ? (
        <View style={styles.validationContainer}>
          <ValidationText isValid={isValidLength} text="✓ 8자 이상" />
          <ValidationText isValid={containsNumAndLetter} text="✓ 영문/숫자" />
          <ValidationText isValid={containsSpecialChar} text="✓ 특수문자" />
        </View>
      ) : (
        <ValidationText isValid={isPasswordSame} text="✓ 비밀번호 일치" />
      )}
    </View>
  );
};

interface ValidationTextProps {
  isValid: boolean;
  text: string;
}

const ValidationText: React.FC<ValidationTextProps> = ({isValid, text}) => (
  <Text
    style={[
      styles.validationText,
      {color: isValid ? globalColors.blue : globalColors.font},
    ]}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    padding: 10,
    paddingRight: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: globalColors.warmGray,
  },
  icon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  validationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  validationText: {
    paddingLeft: 10,
    fontSize: 13,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default PasswordCheckTextFormField;
