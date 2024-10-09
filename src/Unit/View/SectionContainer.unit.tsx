import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';

/**
 * ~.section.tsx 파일의 최외곽을 감싸는 View 컨테이너입니다.
 *
 * 아래의 스타일을 기본으로 갖습니다:
 *  - paddingHorizonal: moderateScale(16)
 *
 * @param fullPage 섹션 하나가 전체 화면을 차지해야 하는 경우 true 로 설정합니다.
 * @param alignCenter 섹션의 내용을 가운데 정렬해야 하는 경우 true 로 설정합니다.
 * @author 도형
 */
export function SectionContainer({
  children,
  style,
  fullPage = false,
  alignCenter = false,
}: {
  children?: any;
  style?: StyleProp<ViewStyle>;
  fullPage?: boolean;
  alignCenter?: boolean;
}) {
  return (
    <View
      style={[
        {
          flex: fullPage ? 1 : undefined,
          paddingHorizontal: fullPage ? 0 : 16,
          justifyContent: alignCenter ? 'center' : undefined,
          alignItems: alignCenter ? 'center' : undefined,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
