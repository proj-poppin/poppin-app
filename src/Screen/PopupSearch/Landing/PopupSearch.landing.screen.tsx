import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailText} from '../../../StyledComponents/Text';
import {LandingBottomTabProps} from '../../../Navigator/Landing.bottomTab.navigator';
import {Screen} from '../../../Component/Screen/Screen.component';
import {SectionContainer} from '../../../Unit/View';

export type PopupSearchLandingScreenProps = {};

export const PopupSearchLandingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<
  LandingBottomTabProps,
  'PopupSearchLandingScreen'
>) => {
  return (
    <Screen
      fullScreen
      ScreenContent={
        <SectionContainer fullPage style={{position: 'relative'}}>
          <DetailText>PopupSearchLandingScreen</DetailText>
        </SectionContainer>
      }
    />
  );
};
