import React from 'react';
import styled from 'styled-components/native';
import {StyleProp, ViewStyle} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeaderBackButton} from './ScreenHeaderBackButton';
import {AppStackProps} from '../../Navigator/App.stack.navigator';

/**
 * @deprecated
 * ScreenHeader 를 사용하세요.
 *
 * 뒤로 가기 버튼만 포함된 스크린 헤더입니다.
 * @author 도형
 */
export function BackButtonScreenHeader({
  style,
  onPressBackIcon,
}: {
  style?: StyleProp<ViewStyle>;
  onPressBackIcon?: () => void;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container style={style}>
      <ScreenHeaderBackButton
        onPress={onPressBackIcon ? onPressBackIcon : goBack}
      />
    </Container>
  );
}

const Container = styled(ScreenHeader__Container)`
  justify-content: flex-start;
`;
