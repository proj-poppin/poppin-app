import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {globalStyles} from '../style/textStyles.ts';
import primaryColors from '../style/primaryColors.ts';

// Props 타입 정의
interface LabelAndInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  errorText?: string; // 에러 메시지를 위한 옵셔널 prop 추가
  labelText: string;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({
  onChangeText,
  placeholder,
  keyboardType = 'default',
  errorText,
  labelText,
}) => {
  return (
    <View>
      <Text style={[globalStyles.title, {marginBottom: 8}]}>{labelText}</Text>
      <TextInput
        style={[styles.textInput, {color: primaryColors.black} as TextStyle]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={primaryColors.font}
        keyboardType={keyboardType}
      />
      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: primaryColors.whiteGray, // 이 부분은 primaryColors에서 해당 색상값을 정확히 가져와야 함
    padding: 10,
    fontFamily: 'Pretandard-Regular',
    fontSize: 18,
    fontWeight: '400',
  },
  errorText: {
    color: 'red', // 에러 메시지 색상
    marginTop: 5, // 텍스트 입력 필드와의 간격
  },
});

export default LabelAndInput;
