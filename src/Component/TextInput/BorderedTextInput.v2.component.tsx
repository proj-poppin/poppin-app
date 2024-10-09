import React, {ForwardedRef, forwardRef, useState} from 'react';
import {
  ActivityIndicator,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import {H2} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';

type TextInputColor = 'PURPLE' | 'BLUE' | 'BLACK';

type BorderedTextInputProps = {
  color: TextInputColor;
  style?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  props?: Partial<Omit<TextInputProps, 'style'>>;
  headerText?: string;
  RightComponent?: JSX.Element;
  active?: boolean;
  activeBorderColor?: string;
  loading?: boolean;
  loadingIndicatorSize?: number;
  loadingIndicatorColor?: string;
  error?: boolean;
  actionOnFocus?: () => void;
  radius?: number;
};

/**
 * 둥근 테두리가 존재하는 TextInput입니다.
 * @author 도형
 */
export const BorderedTextInputV2 = forwardRef<
  TextInput,
  BorderedTextInputProps
>(
  (
    {
      color,
      style,
      headerTextStyle,
      textStyle,
      props,
      headerText,
      RightComponent,
      active,
      activeBorderColor,
      loading,
      loadingIndicatorSize,
      loadingIndicatorColor,
      error,
      actionOnFocus,
      radius,
    }: BorderedTextInputProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [focused, setFocused] = useState<boolean>(false);
    const onFocus = () => {
      actionOnFocus?.();
      setFocused(true);
    };
    const onBlur = () => setFocused(false);

    const colors: {[C in TextInputColor]: string} = {
      BLACK: '#333333',
      BLUE: '',
      PURPLE: '#ABACFF',
    };

    let activeColor = '#333333';
    let borderColor = '#333333';

    if (activeBorderColor) {
      activeColor = activeBorderColor;
    } else {
      activeColor = colors[color];
    }

    if (active || focused) {
      borderColor = activeColor;
    } else if (error) {
      borderColor = '#FF6B6B';
    }

    return (
      <>
        {headerText && (
          <HeaderText style={headerTextStyle}>{headerText}</HeaderText>
        )}
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor,
              borderRadius: radius ?? 6,
            },
            style,
          ]}>
          <TextInput
            ref={ref}
            style={[{flex: 1, color: '#000000', padding: 0}, textStyle]}
            selectionColor={activeColor}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          />
          {RightComponent}
          {loading !== undefined && (
            <View
              style={{
                width: loadingIndicatorSize ?? moderateScale(20),
                marginLeft: moderateScale(8),
              }}>
              {loading && (
                <ActivityIndicator
                  size={loadingIndicatorSize ?? moderateScale(20)}
                  color={loadingIndicatorColor ?? activeColor}
                />
              )}
            </View>
          )}
        </View>
      </>
    );
  },
);

const HeaderText = styled(H2)`
  color: #383535;
  margin-bottom: ${moderateScale(10)}px;
`;
