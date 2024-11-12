import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeaderBackButton} from './ScreenHeaderBackButton';

/**
 * @deprecated ScreenHeader 가 대체합니다.
 *
 * 뒤로 가기 버튼과 우측 기능이 포함된 스크린 헤더입니다.
 * @author 도형
 */
export function BackButtonAndFunctionScreenHeader({
  rightComponents,
  onPressBackIcon,
}: {
  rightComponents: any;
  onPressBackIcon?: () => void;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  function goBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  return (
    <Container>
      <ScreenHeaderBackButton
        onPress={onPressBackIcon ? onPressBackIcon : goBack}
      />
      <HeaderFunction__Container>{rightComponents}</HeaderFunction__Container>
    </Container>
  );
}

const Container = styled(ScreenHeader__Container)`
  justify-content: space-between;
`;

const HeaderFunction__Container = styled.View``;
