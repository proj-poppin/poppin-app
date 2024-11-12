import React from 'react';
import styled from 'styled-components/native';
import {H4} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';

/**
 * 화면 하단에 나타나는 검은색 토스트 메시지 디자인입니다.
 * @author 도형
 */
export function BottomBlackToast({text1}: {text1?: string}) {
  return (
    <BlackToast__Container>
      <BlackToast__Text>{text1}</BlackToast__Text>
    </BlackToast__Container>
  );
}

const BlackToast__Container = styled.View`
  flex-direction: row;
  width: 92%;
  justify-content: center;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: rgba(51, 51, 51, 0.95);
  border-radius: 12px;
`;

const BlackToast__Text = styled(H4)`
  color: ${({theme}) => theme.color.grey.white};
  font-weight: bold;
  text-align: center;
`;
