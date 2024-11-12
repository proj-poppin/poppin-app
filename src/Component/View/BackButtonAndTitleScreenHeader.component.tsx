import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeader__TitleText} from 'src/StyledComponents/Text';
import {ScreenHeaderBackButton} from './ScreenHeaderBackButton';

/**
 * 뒤로 가기 버튼과 스크린 제목이 포함된 스크린 헤더입니다.
 * 스크린 제목에는 기본적으로 문자열을 사용하지만, 컴포넌트를 사용할 수도 있습니다.
 * @author 도형
 */
export function BackButtonAndTitleScreenHeader({
  title,
  onPressBackButton,
}: {
  title: string | any;
  onPressBackButton?: () => void;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  function goBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  return (
    <Container>
      <BackButton__Container>
        <ScreenHeaderBackButton
          onPress={onPressBackButton ? onPressBackButton : goBack}
        />
      </BackButton__Container>

      <TitleText__Container>
        {typeof title === 'string' ? (
          <ScreenHeader__TitleText>{title}</ScreenHeader__TitleText>
        ) : (
          title
        )}
      </TitleText__Container>

      <BackButton__Container />
    </Container>
  );
}

const Container = styled(ScreenHeader__Container)`
  justify-content: center;
`;

const BackButton__Container = styled.View`
  flex: 1;
`;

const TitleText__Container = styled.View`
  flex-direction: row;
  flex: 3;
  justify-content: center;
`;
