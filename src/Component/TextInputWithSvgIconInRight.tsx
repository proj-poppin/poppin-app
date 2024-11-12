import React, {useState, ReactElement} from 'react';
import {StyleSheet, View, TextInput, Pressable, Text} from 'react-native';
import globalColors from '../styles/color/globalColors';
import RequiredTextLabel from './RequiredTextLabel';

interface TextInputWithSvgIconInRightProps {
  label?: string;
  value: string;
  onIconPress?: () => void;
  IconComponent: ReactElement;
  isRequired?: boolean;
  isClickableTextInput?: boolean; // Allows the entire TextInput area to be clickable
}

const TextInputWithSvgIconInRight: React.FC<
  TextInputWithSvgIconInRightProps
> = ({
  label = '',
  value = '',
  onIconPress = () => {},
  IconComponent,
  isRequired = false,
  isClickableTextInput = false,
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
        onPress={onIconPress} // Applies the onIconPress action to the whole container
        disabled={!isClickableTextInput}>
        <TextInput
          style={styles.input}
          value={value}
          editable={false} // Disables keyboard input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          pointerEvents="none" // Disables text input focus
        />
        <View style={styles.iconContainer}>{IconComponent}</View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
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
    padding: 8, // Ensures padding inside the input for better text display
  },
  iconContainer: {
    padding: 10, // Ensures padding around the icon for better touch response
  },
});

export default TextInputWithSvgIconInRight;
