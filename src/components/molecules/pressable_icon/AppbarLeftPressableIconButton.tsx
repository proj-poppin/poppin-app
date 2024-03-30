import React from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GoBackSvg from '../../../assets/icons/goBack.svg';

const AppBarLeftPressableIconButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
      })}>
      <GoBackSvg />
    </Pressable>
  );
};

export default AppBarLeftPressableIconButton;
