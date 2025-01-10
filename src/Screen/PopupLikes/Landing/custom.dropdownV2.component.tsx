import React from 'react';
import {StyleProp, ViewStyle, TextStyle, View, Text} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import SortingIcon from 'src/Resource/svg/sorting-black-icon.svg';
import VButton from 'src/Resource/svg/down-arrow-black-icon.svg';
import {moderateScale} from 'src/Util';
import {EnumValueWithName} from '../../../Object/Type/enum.type';
import {themeColors} from '../../../Theme/theme';

export type CustomDropdownV2Props = {
  data: EnumValueWithName[];
  onSelect: (selectedItem: EnumValueWithName | any, index: number) => void;
  props?: Partial<SelectDropdownProps>;
  hideIcon?: boolean;
  buttonText?: string;

  //* 추가된 옵션
  isSortingIcon?: boolean; // SortingIcon을 표시할지 여부
  isDownArrowBlackIcon?: boolean; // DownArrowBlackIcon을 표시할지 여부
  isIconPositionLeft?: boolean; // 아이콘을 텍스트 왼쪽에 배치
  isIconPositionRight?: boolean; // 아이콘을 텍스트 오른쪽에 배치
  isAddionalDefaultPopupText?: boolean; // '인 팝업' 텍스트 추가 여부 (기본값 false)

  //* 이하 props 는 CustomDropdown 을 import 하여 변형하는 곳에서만 사용합니다.
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  rowTextStyle?: StyleProp<TextStyle>;
};

export function CustomDropdownV2Dropdown({
  data,
  onSelect,
  buttonText,
  hideIcon,
  isSortingIcon = false,
  isDownArrowBlackIcon = false,
  isIconPositionLeft = false,
  isIconPositionRight = true,
  isAddionalDefaultPopupText = false, // 디폴트값 false
  props,
}: CustomDropdownV2Props) {
  const renderDropdownIcon = () => {
    if (hideIcon) {
      return null;
    }

    return isSortingIcon ? (
      <SortingIcon style={{marginLeft: moderateScale(5)}} />
    ) : isDownArrowBlackIcon ? (
      <VButton style={{marginLeft: moderateScale(5)}} />
    ) : null;
  };

  const renderButtonContent = (selectedItem: EnumValueWithName) => {
    // 선택된 값이 없으면 기본값 표시
    const baseText = selectedItem
      ? selectedItem.displayName
      : data[1].displayName; // 초기값: '운영 중'

    // '인 팝업' 텍스트 추가 여부 결정
    const text = isAddionalDefaultPopupText ? `${baseText}인 팝업` : baseText;

    const content = (
      <Text
        style={{
          color: themeColors().grey.black,
          fontSize: moderateScale(14),
        }}>
        {text}
      </Text>
    );

    if (isIconPositionLeft && !isIconPositionRight) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {renderDropdownIcon()}
          {content}
        </View>
      );
    } else if (!isIconPositionLeft && isIconPositionRight) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {content}
          {renderDropdownIcon()}
        </View>
      );
    } else {
      return content;
    }
  };

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      rowTextForSelection={(item: EnumValueWithName) => item.displayName}
      renderCustomizedButtonChild={selectedItem =>
        renderButtonContent(selectedItem)
      }
      rowTextStyle={{color: themeColors().grey.main}}
      {...props}
    />
  );
}
