import React from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import SortingIcon from 'src/Resource/svg/sorting-icon.svg';
import {moderateScale} from 'src/Util';
import {EnumValueWithName} from '../../Object/Type/enum.type';
import {themeColors} from '../../Theme/theme';

export type CustomDropdownProps = {
  data: EnumValueWithName[];
  onSelect: (selectedItem: EnumValueWithName | any, index: number) => void;
  props?: Partial<SelectDropdownProps>;
  hideIcon?: boolean;
  buttonText?: () => string;

  //* 이하 props 는 CustomDropdown 을 import 하여 변형하는 곳에서만 사용합니다.
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  rowTextStyle?: StyleProp<TextStyle>;
};

/**
 * 커스텀된 Dropdown 컴포넌트의 원본 컴포넌트입니다.
 * @author 도형
 */
export function CustomDropdown({
  data,
  onSelect,
  buttonText,
  hideIcon,
  props,
}: CustomDropdownProps) {
  const rowTextForSelection = (item: EnumValueWithName) => {
    return item.displayName;
  };
  const buttonTextAfterSelection = buttonText
    ? buttonText
    : (selectedItem: EnumValueWithName) => {
        return selectedItem.displayName;
      };
  const renderDropdownIcon = () => {
    return <SortingIcon style={{marginLeft: moderateScale(5)}} />;
  };

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      //? 드롭다운 각 선택지에 보여질 문자열을 지정합니다.
      rowTextForSelection={rowTextForSelection}
      //? 아이템이 선택됐을 때 보여질 문자열을 지정합니다.
      buttonTextAfterSelection={buttonTextAfterSelection}
      renderDropdownIcon={hideIcon === true ? undefined : renderDropdownIcon}
      dropdownIconPosition={'right'}
      rowTextStyle={{color: themeColors().grey.main}}
      {...props}
    />
  );
}
