import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/** 랜딩 페이지에서만 사용되는 스크린 헤더입니다. */
export const LandingScreenHeader = ({
  style,
  title,
  LeftComponents,
  RightComponents,
}: {
  style?: StyleProp<ViewStyle>;
  title?: string;
  LeftComponents?: JSX.Element;
  RightComponents?: JSX.Element;
}) => {
  return (
    <Container style={[{backgroundColor: '#ffffff'}, style]}>
      {LeftComponents ? LeftComponents : <TitleText>{title}</TitleText>}
      {RightComponents}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${moderateScale(56)}px;
  padding: ${moderateScale(0)}px ${moderateScale(20)}px;
`;

const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(20)}px;
  font-weight: bold;
`;
