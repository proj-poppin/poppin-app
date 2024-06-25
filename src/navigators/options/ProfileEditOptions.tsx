import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import GoBackSvg from '../../assets/icons/goBack.svg';
import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';
import BackSvg from '../../assets/icons/goBack.svg';

interface ProfileEditOptionsProps {
  navigation: NativeStackNavigationProp<AppNavigatorParamList, 'ProfileEdit'>;
}
const ProfileEditOptions = ({
  navigation,
}: ProfileEditOptionsProps): Partial<NativeStackNavigationOptions> => {
  return {
    title: '프로필 설정',
    headerLeft: () => (
      <Pressable onPress={() => navigation.goBack()} style={{padding: 10}}>
        <BackSvg />
      </Pressable>
    ),
  };
};

export default ProfileEditOptions;
