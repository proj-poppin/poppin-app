import React from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {moderateScale} from 'src/Util';
import {CustomDropdown, CustomDropdownProps} from './CustomDropdown.component';
import {themeColors} from '../../Theme/theme';

/**
 * 테두리, 배경색이 존재하지 않는 Dropdown 컴포넌트입니다.
 * @author 도형
 */
export function BlankDropdown({
  data,
  onSelect,
  props,
  buttonStyle,
  buttonTextStyle,
  dropdownStyle,
  rowStyle: dropdownRowStyle,
  rowTextStyle: dropdownRowTextStyle,
}: CustomDropdownProps) {
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
        rowTextStyle: styleConcat(
          styles.rowTextStyle,
          {color: themeColors().grey.main}, // 텍스트 색 설정
        ),
        defaultButtonText: data[0].displayName,
        ...props,
      }}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white', // 버튼 배경색을 흰색으로 설정
    height: moderateScale(24),
    justifyContent: 'center',
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배치
    alignItems: 'center',
  },

  buttonTextStyle: {
    fontSize: moderateScale(13),
    textAlign: 'left',
  },

  dropdownStyle: {
    marginTop: moderateScale(3),
  },

  rowStyle: {
    justifyContent: 'flex-start',
  },

  rowTextStyle: {
    fontSize: moderateScale(13),
  },
});
