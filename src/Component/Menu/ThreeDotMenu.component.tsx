import React from 'react';
import {Dimensions, View, StyleProp, ViewStyle} from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import {MenuOptionRow, MenuOptionRowProps} from './MenuOptionRow.component';
import {moderateScale} from 'src/Util';
import {VerticalDots} from '../../Symbol/RNsvg/VerticalDots.symbol';
import {themeColors} from '../../Theme/theme';

/**
 * 3점 버튼 메뉴 컴포넌트입니다.
 * 메뉴 선택지들을 인자로 받아 3점 버튼을 누르면 메뉴가 나타납니다.
 *
 * @param menuOptions 메뉴 선택지들
 * @param triggerIcon 메뉴 열림 버튼 아이콘
 * @param triggerIconContainerStyle 메뉴 열림 버튼 컨테이너 스타일
 * @param optionsContainerStyle 메뉴 선택지 컨테이너 스타일
 * @param optionsContainerWidthRatio 메뉴 선택지 가로 크기 비율 (화면 너비의 n%) (기본값: 38)
 * @author 도형
 */

export const ThreeDotMenu = ({
  menuOptions,
  triggerIcon,
  triggerIconStyle,
  triggerIconContainerStyle,
  optionsContainerStyle,
  optionsContainerWidthRatio = 38,
}: {
  menuOptions: MenuOptionRowProps[];
  triggerIcon?: JSX.Element;
  triggerIconStyle?: {size?: number; color?: string};
  triggerIconContainerStyle?: StyleProp<ViewStyle>;
  optionsContainerStyle?: StyleProp<ViewStyle>;
  optionsContainerWidthRatio?: number;
}) => {
  const {width} = Dimensions.get('window');

  return (
    <Menu>
      <MenuTrigger>
        <View
          style={[
            {
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              width: moderateScale(24),
            },
            triggerIconContainerStyle,
          ]}>
          {triggerIcon ? (
            triggerIcon
          ) : (
            <VerticalDots
              size={triggerIconStyle?.size}
              color={triggerIconStyle?.color}
            />
          )}
        </View>
      </MenuTrigger>

      <MenuOptions
        optionsContainerStyle={[
          {
            width: Math.floor(width * (optionsContainerWidthRatio / 120)),
            backgroundColor: '#f5f5f5',
            marginTop: moderateScale(30),
            borderRadius: 12,
            overflow: 'hidden',
          },
          optionsContainerStyle,
        ]}>
        {menuOptions.map((optionRow, index) => (
          <View key={index}>
            <MenuOption onSelect={optionRow.onSelect}>
              <MenuOptionRow
                Icon={optionRow.Icon}
                text={optionRow.text}
                selected={optionRow.selected}
                onSelect={optionRow.onSelect}
                style={[optionRow.style]}
              />
            </MenuOption>
            {index !== menuOptions.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: themeColors().grey.mild,
                }}
              />
            )}
          </View>
        ))}
      </MenuOptions>
    </Menu>
  );
};
