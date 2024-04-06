import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  Pressable,
} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';
import PasswordWatchSvg from '../../../assets/icons/watch.svg';
import PasswordWatchFilledSvg from '../../../assets/icons/watchFilled.svg';
// Props 타입 정의
interface CommonTextFormFieldProps {
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errorText?: string;
  isWatchNeed?: boolean; // 비밀번호 토글 버튼 필요 여부
}

const CommonTextFormField: React.FC<CommonTextFormFieldProps> = ({
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  errorText,
  isWatchNeed = false, // 기본값을 false로 설정
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry); // 비밀번호 보기 상태

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, isWatchNeed && {paddingRight: 40}]} // isWatchNeed가 true일 경우, 아이콘에 맞춰 텍스트 필드 오른쪽 패딩 조정
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
        placeholderTextColor={globalColors.font}
        keyboardType={keyboardType}
        secureTextEntry={isSecure} // 상태에 따라 변경
        returnKeyType="next"
      />
      {isWatchNeed && (
        <Pressable onPress={toggleSecureEntry} style={styles.icon}>
          {isSecure ? <PasswordWatchSvg /> : <PasswordWatchFilledSvg />}
        </Pressable>
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
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10, // 아이콘 위치 조정이 필요할 수 있습니다
    zIndex: 1000,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

export default CommonTextFormField;
