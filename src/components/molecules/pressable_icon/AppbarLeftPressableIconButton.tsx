import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GoBackSvg from '../../../assets/icons/goBack.svg';

const AppBarLeftPressableIconButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({pressed}) => [
        styles.button,
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}>
      <GoBackSvg />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10, // Add padding to increase touchable area
  },
});

export default AppBarLeftPressableIconButton;
