import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeader__TitleText} from 'src/StyledComponents/Text';
import {ScreenHeaderBackButton} from './ScreenHeaderBackButton';

/**
 * 뒤로 가기 버튼, 스크린 헤더 타이틀, 우측 추가 기능들을 보여주는 스크린 헤더입니다.
 * @param title 스크린 헤더 타이틀
 * @param rightComponents 우측 추가 기능들
 * @author 도형
 */
export function FullOptionScreenHeader({
  title,
  rightComponents,
}: {
  title: string;
  rightComponents: any;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  function goBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  return (
    <Container>
      <BackButton__Container>
        <ScreenHeaderBackButton onPress={goBack} />
      </BackButton__Container>
      <TitleText__Container>
        <ScreenHeader__TitleText>{title}</ScreenHeader__TitleText>
      </TitleText__Container>
      <RightComponents__Container style={{position: 'absolute', right: 10}}>
        {rightComponents}
      </RightComponents__Container>
    </Container>
  );
}

const Container = styled(ScreenHeader__Container)`
  justify-content: space-between;
`;

const BackButton__Container = styled.View`
  flex: 1;
`;

const TitleText__Container = styled.View`
  flex-direction: row;
  flex: 3;
  justify-content: center;
`;

const RightComponents__Container = styled(BackButton__Container)``;
