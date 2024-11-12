import React from 'react';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeader__TitleText} from 'src/StyledComponents/Text';
import CloseIcon from 'src/Resource/svg/close-icon.svg';
import {moderateScale} from 'src/Util';

/**
 * 스크린 제목과 닫기 버튼이 포함된 스크린 헤더입니다.
 * @author 도형
 */
export function TitleAndCloseIconScreenHeader({
  title,
  onPressClose,
}: {
  title: string;
  onPressClose?: () => void;
}) {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  function goBack() {
    if (navigation.canGoBack()) navigation.goBack();
  }

  return (
    <Container>
      <CloseButton__Container />
      <TitleText__Container>
        <ScreenHeader__TitleText>{title}</ScreenHeader__TitleText>
      </TitleText__Container>
      <CloseButton__Container>
        <CloseIconContainer
          activeOpacity={1}
          onPress={onPressClose ? onPressClose : goBack}>
          <CloseIcon />
        </CloseIconContainer>
      </CloseButton__Container>
    </Container>
  );
}

const Container = styled(ScreenHeader__Container)`
  justify-content: center;
`;

const CloseButton__Container = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const CloseIconContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: flex-end;
  width: ${moderateScale(45)}px;
  height: 100%;
`;

const TitleText__Container = styled.View`
  flex-direction: row;
  flex: 5;
  justify-content: center;
`;
