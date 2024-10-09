import React from 'react';
import styled from 'styled-components/native';
import CaretLeftIcon from 'src/Resource/svg/left-arrow-grey-icon.svg';
import {moderateScale} from 'src/Util';

/**
 * 스크린 헤더에서 사용하는 뒤로가기 버튼입니다.
 * 누르기 편하게 크기가 넉넉하게 잡혀있습니다.
 * @author 도형
 */
export function ScreenHeaderBackButton({onPress}: {onPress?: () => void}) {
  return (
    <CaretLeftIconContainer activeOpacity={1} onPress={onPress}>
      <CaretLeftIcon />
    </CaretLeftIconContainer>
  );
}

const CaretLeftIconContainer = styled.TouchableOpacity`
  justify-content: center;
  width: ${moderateScale(45)}px;
  height: 100%;
`;
