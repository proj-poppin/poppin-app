import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeader__TitleText} from 'src/StyledComponents/Text';
import {H3} from 'src/StyledComponents/Text';
import CaretLeftIcon from 'src/Resource/svg/left-arrow-grey-icon.svg';
import CloseIcon from 'src/Resource/svg/close-icon.svg';
import {AppStackProps} from '../../Navigator/App.stack.navigator';

/**
 * 하나의 화면에서 여러 개의 스텝이 나뉘는 화면의 스크린 헤더입니다.
 * 좌측에는 뒤로가기(이전) 버튼, 우측에는 X 아이콘 닫기 버튼이 있습니다.
 *
 * ex. 프로젝트 업로드 페이지
 *
 * @param title 스크린 헤더 타이틀
 * @param onPressBack 뒤로 가기 버튼 클릭 시 실행될 함수
 * @param onPressClose X 아이콘 클릭 시 실행될 함수. 기본적으로 뒤로가기 기능을 수행합니다.
 *
 * @author 도형
 */
export const StepScreenHeader = ({
  title,
  onPressBack,
  onPressClose,
}: {
  title: string;
  onPressBack?: () => void;
  onPressClose?: () => void;
}) => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const close = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <Container>
      <BackButton__Container activeOpacity={1} onPress={onPressBack}>
        <CaretLeftIcon />
        <BackButton__Text>이전</BackButton__Text>
      </BackButton__Container>
      <TitleText__Container>
        <ScreenHeader__TitleText>{title}</ScreenHeader__TitleText>
      </TitleText__Container>
      <CloseButton__Container
        activeOpacity={1}
        onPress={onPressClose ? onPressClose : close}>
        <CloseIcon />
      </CloseButton__Container>
    </Container>
  );
};

const Container = styled(ScreenHeader__Container)`
  justify-content: space-between;
`;

const BackButton__Container = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const BackButton__Text = styled(H3)`
  font-weight: bold;
`;

const TitleText__Container = styled.View`
  flex-direction: row;
  flex: 3;
  justify-content: center;
`;

const CloseButton__Container = styled(BackButton__Container)`
  justify-content: flex-end;
`;
