import React from 'react';
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {moderateScale} from 'src/Util';

/**
 * TextInput 에 넘겨줄 속성들입니다.
 * @author 도형
 */
export type BaseTextInputParams = {
  style?: StyleProp<TextStyle>;
  props?: Partial<Omit<TextInputProps, 'style'>>;
  type?: 'PASSWORD';
};

/**
 * 앱에서 사용하는 TextInput 의 기본 설정을 지정한 컴포넌트입니다.
 * 활용형인 BorderedTextInput, LinedTextInput 등은 모두 이 컴포넌트를 기반으로 만듭니다.
 * @author 도형
 */
export const BaseTextInput = ({style, props, type}: BaseTextInputParams) => {
  const ios = Platform.OS === 'ios';

  return (
    <TextInput
      style={[
        {
          color: 'black',
          fontSize: moderateScale(13),
          paddingVertical: ios ? 8 : 4,
          paddingHorizontal: moderateScale(12),
          // value가 없는 경우 = placeholder 를 보여주는 경우 기울임체 적용
          fontStyle: props?.value ? 'normal' : 'italic',
        },
        style,
      ]}
      selectionColor="black"
      textContentType={type === 'PASSWORD' ? 'password' : undefined}
      secureTextEntry={type === 'PASSWORD'}
      placeholderTextColor={'#D3D4D4'}
      {...props}
    />
  );
};
