import React, {useState, ReactElement} from 'react';
import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import globalColors from '../styles/color/globalColors';
import RequiredTextLabel from './RequiredTextLabel';

interface TextInputWithSvgIconInRightProps {
  label?: string;
  value: string;
  onIconPress?: () => void;
  IconComponent: ReactElement;
  isRequired?: boolean;
}

const TextInputWithSvgIconInRight: React.FC<
  TextInputWithSvgIconInRightProps
> = ({
  label = '',
  value = '',
  onIconPress = () => {},
  IconComponent,
  isRequired = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <RequiredTextLabel label={label} isRequired={isRequired} />
      <Pressable
        style={[
          styles.inputContainer,
          isFocused
            ? {borderColor: globalColors.blue}
            : {borderColor: globalColors.warmGray},
        ]}
        onPress={onIconPress} // Trigger the icon press when the whole container is pressed
      >
        <TextInput
          style={styles.input}
          value={value}
          editable={false} // 텍스트 입력 비활성화 (필요에 따라 조정)
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <View style={styles.iconButton}>{IconComponent}</View>
      </Pressable>
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
