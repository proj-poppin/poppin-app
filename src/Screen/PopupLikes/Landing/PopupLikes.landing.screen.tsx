import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LandingBottomTabProps} from 'src/Navigator/Landing.bottomTab.navigator';
import {DetailText} from '../../../StyledComponents/Text';
import {Screen} from '../../../Component/Screen/Screen.component';
import {SectionContainer} from '../../../Unit/View';
import React from 'react';

export type PopupLikesLandingScreenProps = {};

export const PopupLikesLandingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<
  LandingBottomTabProps,
  'PopupLikesLandingScreen'
>) => {
  return (
    <Screen
      fullScreen
      ScreenContent={
        <SectionContainer fullPage style={{position: 'relative'}} />
      }
    />
  );
};
