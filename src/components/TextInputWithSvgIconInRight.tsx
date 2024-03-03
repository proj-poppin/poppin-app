import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// DownSvg import 구문 제거
import primaryColors from '../style/primaryColors.ts';
import RequiredTextLabel from './RequiredTextLabel.tsx';

// IconComponent prop 추가
const TextInputWithSvgIconInRight = ({
  label,
  value,
  onIconPress,
  IconComponent,
  isRequired = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <RequiredTextLabel label={label} isRequired={isRequired} />
      <View
        style={[
          styles.inputContainer,
          isFocused
            ? {borderColor: primaryColors.blue}
            : {borderColor: primaryColors.warmGray},
        ]}>
        <TextInput
          style={styles.input}
          value={value}
          editable={false} // 텍스트 입력 비활성화 (필요에 따라 조정)
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity style={styles.iconButton} onPress={onIconPress}>
          {/* IconComponent를 사용하여 동적으로 아이콘 표시 */}
          {IconComponent}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    paddingRight: 10,
  },
});

export default TextInputWithSvgIconInRight;
