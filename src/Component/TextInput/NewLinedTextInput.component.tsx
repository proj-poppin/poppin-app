import React, {useState} from 'react';
import {BaseTextInput, BaseTextInputParams} from './BaseTextInput.component';
import {themeColors} from 'src/Theme/theme';

type LinedTextInputParams = BaseTextInputParams & {
  active?: boolean; // 활성화 여부
  activeBorderColor?: string; // 활성화 시 테두리 색상
};

/**
 * 밑줄이 쳐져 있는 TextInput입니다.
 * @author 도형
 */
export const NewLinedTextInput = ({
  style,
  props,
  type,
  active = false,
  activeBorderColor = themeColors().purple.main,
}: LinedTextInputParams) => {
  const [focused, setFocused] = useState<boolean>(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <BaseTextInput
      style={[
        {
          borderBottomColor: active || focused ? activeBorderColor : '#999999',
          borderBottomWidth: 1.5,
        },
        style,
      ]}
      type={type}
      props={{
        onFocus: onFocus,
        onBlur: onBlur,
        ...props,
      }}
    />
  );
};
