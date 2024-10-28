import React from 'react';
import {StyleProp, ViewStyle, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/** 랜딩 페이지에서만 사용되는 스크린 헤더입니다. */
export const LandingScreenHeader = ({
  style,
  title,
  LeftComponents,
  RightComponents,
  onRightPress, // 추가된 onPress 함수
}: {
  style?: StyleProp<ViewStyle>;
  title?: string;
  LeftComponents?: JSX.Element;
  RightComponents?: JSX.Element;
  onRightPress?: () => void; // 추가된 onPress 타입 정의
}) => {
  return (
    <Container style={[{backgroundColor: '#ffffff'}, style]}>
      {LeftComponents ? LeftComponents : <TitleText>{title}</TitleText>}
      {RightComponents && (
        <Pressable onPress={onRightPress}>{RightComponents}</Pressable>
      )}
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
