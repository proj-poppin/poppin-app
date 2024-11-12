import React from 'react';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import {moderateScale} from 'src/Util';

/**
 * 모달 콘텐츠를 감싸는 모서리가 둥근 흰색 배경입니다.
 * View 로 설정하면 배경을 눌러도 모달이 닫히기 때문에 TouchableOpacity 로 설정되어 있습니다.
 *
 * 아래 스타일을 기본적으로 갖습니다:
 *  - width: '80%',
 *  - backgroundColor: '#FFFFFF',
 *  - padding: moderateScale(20),
 *  - paddingBottom: moderateScale(10),
 *  - borderRadius: 12,
 * @author 도형
 */
export function ModalContentContainer({
  children,
  style,
}: {
  children: any;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        {
          width: '80%',
          backgroundColor: '#FFFFFF',
          padding: moderateScale(20),
          paddingBottom: moderateScale(10),
          borderRadius: 12,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
}
