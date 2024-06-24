import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import globalColors from '../../styles/color/globalColors.ts';
import GoBackSvg from '../../assets/icons/goBack.svg';
import {
  NativeStackNavigationProp,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {AppNavigatorParamList} from '../../types/AppNavigatorParamList.ts';

interface ProfileEditOptionsProps {
  navigation: NativeStackNavigationProp<AppNavigatorParamList, 'ProfileEdit'>;
  handleSubmit: () => void;
}

const ProfileEditOptions = ({
  navigation,
  handleSubmit,
}: ProfileEditOptionsProps): Partial<NativeStackNavigationOptions> => {
  return {
    title: '프로필 설정',
    headerRight: () => (
      <Text
        onPress={handleSubmit}
        style={{color: globalColors.blue, marginRight: 10}}>
        완료
      </Text>
    ),
    headerLeft: () => (
      <Pressable
        onPress={() => navigation.goBack()}
        style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
        <GoBackSvg />
      </Pressable>
    ),
  };
};

export default ProfileEditOptions;
