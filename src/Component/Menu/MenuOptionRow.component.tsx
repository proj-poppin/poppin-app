import React from 'react';
import {View} from 'react-native';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {BodyText} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';
import {BodyLargeText} from '../../StyledComponents/Text/bodyLarge.component';
import {BodyMediumText} from '../../StyledComponents/Text/bodyMedium.component';
import {themeColors} from '../../Theme/theme';

/**
 * 메뉴 선택지 한 줄이 가지는 속성
 * (onSelect 는 MenuOptionRow 에서 직접 사용하지는 않습니다.)
 * @author 도형
 *
 */
export type MenuOptionRowProps = {
  text: string;
  Icon?: JSX.Element;
  selected?: boolean;
  onSelect: (param?: any) => any;
  style?: StyleProp<ViewStyle>;
};

/**
 * 메뉴 선택지 한 줄 컴포넌트입니다.
 *
 * @param text 내용
 * @param Icon 좌측 아이콘 컴포넌트
 * @param selected 해당 메뉴가 선택된 상탠지 여부
 * @param style 추가 스타일
 * @author 도형
 */
export function MenuOptionRow({
  text,
  Icon,
  selected,
  style,
}: MenuOptionRowProps) {
  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //TODO: #DESIGN-SYSTEM
    backgroundColor: selected ? themeColors().grey.white : 'none',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: 6,
  };

  const iconContainerStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(16),
    marginRight: moderateScale(12),
  };

  return (
    <View style={[containerStyle, style]}>
      {Icon && <View style={iconContainerStyle}>{Icon}</View>}
      <ContentText>{text}</ContentText>
    </View>
  );
}

const ContentText = styled(BodyMediumText)`
  color: ${({theme}) => theme.color.grey.main};
`;
