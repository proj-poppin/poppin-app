import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/**
 * 페이지별 헤더 컴포넌트입니다.
 * @author 도형
 */
export const PageHeader = ({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <PageHeaderContainer style={style}>
      <PageHeaderText>{text}</PageHeaderText>
    </PageHeaderContainer>
  );
};

const PageHeaderContainer = styled.View`
  background-color: ${({theme}) => theme.color.blue.mild};
  padding: ${moderateScale(12)}px ${moderateScale(16)}px;
`;

const PageHeaderText = styled.Text`
  color: ${({theme}) => theme.color.blue.main};
  font-size: ${moderateScale(16)}px;
  font-weight: bold;
`;
