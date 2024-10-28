import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import CaretLeftIcon from 'src/Resource/svg/left-arrow-grey-icon.svg';
import CloseIcon from 'src/Resource/svg/close-bold-icon.svg';
import SearchIcon from 'src/Resource/svg/search-icon.svg';
import {moderateScale} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {BodyLargeText} from '../../StyledComponents/Text/bodyLarge.component';
import {themeColors} from '../../Theme/theme';

/**
 *
 * @description A header component for screens with customizable left, title, and right elements.
 */
export const ScreenHeader = ({
  title,
  LeftComponents,
  leftText,
  onPressLeftComponent,
  RightComponents,
  onPressRightComponent,
  RelativePositionComponent,
  style,
}: {
  title?: string;
  LeftComponents?: 'CLOSE_BUTTON' | 'BACK_BUTTON' | JSX.Element;
  leftText?: string; // leftIcon adjacent text (e.g., "View as guest")
  onPressLeftComponent?: () => void;
  RightComponents?: 'CLOSE_BUTTON' | JSX.Element;
  onPressRightComponent?: () => void;
  RelativePositionComponent?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const LeftPart = () => {
    if (!LeftComponents) return null;

    const LeftButton = () => {
      switch (LeftComponents) {
        case 'BACK_BUTTON':
          return (
            <FunctionButton__Container
              hasText={!!leftText}
              onPress={onPressLeftComponent || goBack}>
              <CaretLeftIcon />
            </FunctionButton__Container>
          );
        case 'CLOSE_BUTTON':
          return (
            <FunctionButton__Container
              hasText={!!leftText}
              onPress={onPressLeftComponent || goBack}>
              <CloseIcon />
            </FunctionButton__Container>
          );
        default:
          return LeftComponents;
      }
    };

    return (
      <LeftPartContainer>
        <LeftButton />
        {leftText && <LeftText>{leftText}</LeftText>}
      </LeftPartContainer>
    );
  };

  const RightPart = () => {
    switch (RightComponents) {
      case undefined:
        return null;
      case 'SEARCH_BUTTON':
        return (
          <FunctionButton__Container onPress={onPressRightComponent || goBack}>
            <SearchIcon />
          </FunctionButton__Container>
        );
      case 'CLOSE_BUTTON':
        return (
          <FunctionButton__Container onPress={onPressRightComponent || goBack}>
            <CloseIcon />
          </FunctionButton__Container>
        );
      default:
        return RightComponents;
    }
  };

  const RelativePositionPart = () => RelativePositionComponent || null;

  return (
    <Container style={style}>
      <SectionContainer style={{flex: 2}}>
        <LeftPart />
      </SectionContainer>

      <SectionContainer
        style={{flex: 7, justifyContent: 'center', alignItems: 'center'}}>
        <TitleText>{title}</TitleText>
      </SectionContainer>

      <SectionContainer style={{flex: 2}}>
        <RightPart />
      </SectionContainer>

      <RelativePositionPart />
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 100;
  height: ${moderateScale(45)}px;
  background-color: ${({theme}) => theme.color.grey.white};
  padding: ${moderateScale(10)}px ${moderateScale(15)}px;
`;

const TitleText = styled(BodyLargeText)`
  font-weight: bold;
`;

const LeftPartContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LeftText = styled.Text`
  color: ${themeColors().grey.main};
  font-weight: 500;
  font-size: ${moderateScale(15)}px;
`;

const SectionContainer = styled.View`
  flex-direction: row;
`;

/**
 * leftIcon 옆 텍스트가 있는 경우에만, 아이콘 차지 넓이를 줄여줍니다
 */
const FunctionButton__Container = styled.TouchableOpacity<{hasText: boolean}>`
  justify-content: center;
  width: ${({hasText}) => (hasText ? moderateScale(30) : moderateScale(45))}px;
  height: 100%;
`;
