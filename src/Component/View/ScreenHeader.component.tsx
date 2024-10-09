import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {H1} from 'src/StyledComponents/Text';
import CaretLeftIcon from 'src/Resource/svg/left-arrow-grey-icon.svg';
import CloseIcon from 'src/Resource/svg/close-icon.svg';
import {moderateScale} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {BodyMediumText} from '../../StyledComponents/Text/bodyMedium.component';
import {BodyLargeText} from '../../StyledComponents/Text/bodyLarge.component';

/**
 *
 * @author 도형
 */
export const ScreenHeader = ({
  title,
  LeftComponents,
  onPressLeftComponent,
  RightComponents,
  onPressRightComponent,
  RelativePositionComponent,
  style,
}: {
  title?: string;
  LeftComponents?: 'BACK_BUTTON' | JSX.Element;
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
    switch (LeftComponents) {
      case undefined:
        return null;
      case 'BACK_BUTTON':
        return (
          <FunctionButton__Container
            onPress={onPressLeftComponent ? onPressLeftComponent : goBack}>
            <CaretLeftIcon />
          </FunctionButton__Container>
        );
      default:
        return LeftComponents;
    }
  };

  const RightPart = () => {
    switch (RightComponents) {
      case undefined:
        return null;
      case 'CLOSE_BUTTON':
        return (
          <FunctionButton__Container
            onPress={onPressRightComponent ? onPressRightComponent : goBack}>
            <CloseIcon />
          </FunctionButton__Container>
        );
      default:
        return RightComponents;
    }
  };

  const RelativePositionPart = () => {
    if (RelativePositionComponent) return RelativePositionComponent;
    return null;
  };

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

const SectionContainer = styled.View`
  flex-direction: row;
`;

const FunctionButton__Container = styled.TouchableOpacity`
  justify-content: center;
  width: ${moderateScale(45)}px;
  height: 100%;
`;
