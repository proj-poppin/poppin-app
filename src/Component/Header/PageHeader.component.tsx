import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/**
 * 페이지별 헤더 컴포넌트입니다.
 * @description This component displays a header with a required `text1` and an optional `text2`.
 * @param text1 - Main text displayed in the header.
 * @param text2 - Optional secondary text displayed below the main text.
 * @param style - Optional styling for the header container.
 * @returns JSX.Element
 * @author 도형
 * <PageHeader text1="Main Title" text2="Subtitle" />
 */
export const PageHeader = ({
  text1,
  text2,
  style,
}: {
  text1: string;
  text2?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <PageHeaderContainer style={style}>
      <PageHeaderText>{text1}</PageHeaderText>
      {text2 && <PageHeaderSubText>{text2}</PageHeaderSubText>}
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

const PageHeaderSubText = styled.Text`
  color: ${({theme}) => theme.color.blue.dark};
  font-size: ${moderateScale(14)}px;
  margin-top: ${moderateScale(4)}px;
`;
