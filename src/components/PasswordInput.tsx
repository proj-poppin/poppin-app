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
import PasswordWatchSvg from '../assets/icons/watch.svg';
import PasswordWatchFilledSvg from '../assets/icons/watchFilled.svg';

// Props 타입 정의
interface PasswordInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  errorText?: string;
  labelText: string;
  isPassword?: boolean;
  isPasswordSetting?: boolean; // 비밀번호 설정 모드 여부
  isPasswordSameSetting?: boolean; // 비밀번호 일치 여부
  isPasswordSame?: boolean; // 비밀번호 일치 여부
  containerStyle?: object;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType = 'default',
  errorText,
  labelText,
  isPassword = false,
  isPasswordSetting = false, // 기본값은 false
  isPasswordSameSetting = false, // 기본값은 false
  isPasswordSame = false, // 기본값은 false
  containerStyle,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);
  // 비밀번호 유효성 검사 상태
  const [isValidLength, setIsValidLength] = useState(false);
  const [containsNumAndLetter, setContainsNumAndLetter] = useState(false);
  const [containsSpecialChar, setContainsSpecialChar] = useState(false);

  const [password, setPassword] = useState(''); // 비밀번호 상태 추가
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태 추가
  // 비밀번호 유효성 검사 및 상태 업데이트 로직에 변경 사항 적용
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(''); // 사용자가 입력을 시작하면 에러 메시지를 지웁니다.
    if (isPasswordSameSetting && confirmPassword && text !== confirmPassword) {
      setPasswordError('X 비밀번호 불일치');
    } else {
      setPasswordError('');
    }
    onChangeText(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordError(''); // 사용자가 입력을 시작하면 에러 메시지를 지웁니다.
    if (isPasswordSameSetting && password && password !== text) {
      setPasswordError('X 비밀번호 불일치');
    } else {
      setPasswordError('');
    }
  };
  // 아이콘 활성화 조건 추가
  const renderIcon = () => {
    if (password) {
      // 텍스트가 있을 때만 아이콘 활성화
      return secureTextEntry ? (
        <PasswordWatchSvg />
      ) : (
        <PasswordWatchFilledSvg />
      );
    }
    return null; // 텍스트가 없으면 아이콘 비활성화
  };

  // 가시성 토글 로직
  const toggleSecureEntry = () => {
    // 비밀번호 입력란에 1글자 이상 있을 경우에만 실행
    console.log(password);
    if (password.length > 0) {
      setSecureTextEntry(!secureTextEntry);
    }
  };

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
    setPassword(text);
    onChangeText(text);
  };

  return (
    <View style={(styles.container, containerStyle)}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: primaryColors.black,
            } as TextStyle,
          ]}
          onChangeText={
            isPasswordSetting ? handlePasswordValidation : handlePasswordChange
          }
          placeholder={placeholder}
          placeholderTextColor={primaryColors.font}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          returnKeyType={isPassword ? 'done' : 'next'} // Use "done" for password fields
        />
        <Pressable onPress={toggleSecureEntry} style={styles.icon}>
          {secureTextEntry ? <PasswordWatchSvg /> : <PasswordWatchFilledSvg />}
        </Pressable>
      </View>
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
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: primaryColors.warmGray,
  },
  icon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: primaryColors.warmGray,
    padding: 10,
    paddingRight: 40,
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

export default PasswordInput;
