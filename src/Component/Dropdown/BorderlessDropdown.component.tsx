import React from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {CustomDropdown, CustomDropdownProps} from './CustomDropdown.component';
import {moderateScale} from 'src/Util';

/**
 * 테두리가 존재하지 않는 Dropdown 컴포넌트입니다.
 * 대신 기본적인 배경색이 존재하고, borderRadius 가 적용되어 있습니다.
 * @author 도형
 */
export function BorderlessDropdown({
  data,
  onSelect,
  props,
  buttonStyle,
  buttonTextStyle,
  dropdownStyle,
  rowStyle: dropdownRowStyle,
  rowTextStyle: dropdownRowTextStyle,
}: CustomDropdownProps) {
  //* 인자로 전달된 추가 스타일을 기본으로 지정된 스타일과 합쳐줍니다
  const styleConcat = (
    style1: StyleProp<any>,
    style2?: StyleProp<any>,
  ): StyleProp<any> => {
    if (!style2) return style1;
    return {...style1, ...style2};
  };

  return (
    <CustomDropdown
      data={data}
      onSelect={onSelect}
      props={{
        buttonStyle: styleConcat(styles.buttonStyle, buttonStyle),
        buttonTextStyle: styleConcat(styles.buttonTextStyle, buttonTextStyle),
        dropdownStyle: styleConcat(styles.dropdownStyle, dropdownStyle),
        rowStyle: styleConcat(styles.rowStyle, dropdownRowStyle),
        rowTextStyle: styleConcat(styles.rowTextStyle, dropdownRowTextStyle),
        ...props,
      }}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },

  buttonTextStyle: {
    fontSize: moderateScale(14),
    marginLeft: moderateScale(16),
    textAlign: 'left',
  },

  dropdownStyle: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(3),
    borderRadius: 10,
  },

  rowStyle: {},

  rowTextStyle: {
    fontSize: moderateScale(14),
  },
});
