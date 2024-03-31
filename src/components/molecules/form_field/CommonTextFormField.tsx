import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import globalColors from '../../../styles/color/globalColors.ts';

// Props 타입 정의
interface CommonTextFormFieldProps {
  onChangeText: (text: string) => void;
  onEndEditing?: () => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  errorText?: string;
}

const CommonTextFormField: React.FC<CommonTextFormFieldProps> = ({
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType = 'default',
  errorText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
        placeholderTextColor={globalColors.font}
        keyboardType={keyboardType}
        returnKeyType="next"
      />
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
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

export default CommonTextFormField;
