import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
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
      <Pressable
        onPress={() =>
          navigation.navigate('MainTabNavigator', {screen: 'MyPage'})
        }
        style={{padding: 10}}>
        <BackSvg />
      </Pressable>
    ),
  };
};

export default ProfileEditOptions;
