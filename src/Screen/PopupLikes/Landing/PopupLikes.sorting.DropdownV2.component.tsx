import React from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {moderateScale} from 'src/Util';
import {CustomDropdownV2Dropdown} from './custom.dropdownV2.component';
import {CustomDropdownProps} from 'src/Component/Dropdown/CustomDropdown.component';
import {themeColors} from '../../../Theme/theme';

/**
 * 테두리, 배경색이 존재하지 않는 Dropdown 컴포넌트입니다.
 */
export function PopupLikesSortingDropdownV2({
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
    return style2 ? {...style1, ...style2} : style1;
  };

  return (
    <CustomDropdownV2Dropdown
      data={data}
      onSelect={onSelect}
      props={{
        buttonStyle: styleConcat(styles.buttonStyle, buttonStyle),
        buttonTextStyle: styleConcat(styles.buttonTextStyle, buttonTextStyle),
        dropdownStyle: styleConcat(styles.dropdownStyle, dropdownStyle),
        rowStyle: styleConcat(styles.rowStyle, dropdownRowStyle),
        rowTextStyle: styleConcat(styles.rowTextStyle, {
          color: themeColors().grey.main,
        }),
        defaultButtonText: data[0].displayName,
        ...props,
      }}
      isIconPositionRight={true}
      isSortingIcon={true}
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'white',
    height: moderateScale(24),
    justifyContent: 'center',
    flexDirection: 'row',
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
