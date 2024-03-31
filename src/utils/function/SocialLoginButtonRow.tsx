import React from 'react';
import {View, Image, StyleSheet, Pressable, Platform} from 'react-native';
import PngPressableImageButton from '../../components/atoms/button/PngPressableImageButton.tsx';
import NaverLoginButtonImg from '../../assets/icons/social_login/naverLoginButton.png';
import GoogleLoginButtonImg from '../../assets/icons/social_login/googleLoginButton.png';
import AppleLoginButtonImg from '../../assets/icons/social_login/appleLoginButton.png';

const SocialLoginButtonRow = ({onPressNaver, onPressGoogle, onPressApple}) => {
  return (
    <View style={styles.snsIconsContainer}>
      <PngPressableImageButton
        source={NaverLoginButtonImg}
        onPress={onPressNaver}
      />
      <PngPressableImageButton
        source={GoogleLoginButtonImg}
        onPress={onPressGoogle}
      />
      {Platform.OS === 'ios' && (
        <PngPressableImageButton
          source={AppleLoginButtonImg}
          onPress={onPressApple}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  snsIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 100,
    marginBottom: 20,
  },
  snsIcon: {
    width: 40,
    height: 40,
  },
  hide: {
    display: 'none',
  },
});

export default SocialLoginButtonRow;
