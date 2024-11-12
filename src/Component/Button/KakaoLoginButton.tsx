import React from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {showBlackToast} from 'src/Util';
import {moderateScale} from 'src/Util';
import {FastImageContainer} from '../Image/FastImage.component';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {axiosGetKakaoAccountStatus} from '../../Axios/User/user.get.axios';
import styled from 'styled-components/native';

export function KakaoLoginButton({
  loggingIn,
  setLoggingIn,
  onLoginSucceed,
  onSignupRequired,
  style,
}: {
  loggingIn: boolean;
  setLoggingIn: (status: boolean) => void;
  onLoginSucceed: () => void;
  onSignupRequired: (param: {email: string}) => void;
  style?: StyleProp<ViewStyle>;
}) {
  /** Handle Kakao Login */
  async function handleKakaoLogin() {
    // 임시로 빈 함수로 두되, 나중에 카카오 로그인 로직 구현
    return;
  }

  /** Attempt to Login */
  async function tryKakaoLogin() {
    setLoggingIn(true);
    await handleKakaoLogin();
    setLoggingIn(false);
  }

  return (
    <TouchableContainer onPress={tryKakaoLogin} style={style}>
      {loggingIn ? (
        <ActivityIndicator color="yellow" />
      ) : (
        <FastImageContainer
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            marginHorizontal: moderateScale(5),
          }}
          source={require('src/Screen/Auth/Landing/Resource/login-kakao-button-circle.png')}
        />
      )}
    </TouchableContainer>
  );
}

const TouchableContainer = styled.TouchableOpacity<{pressed?: boolean}>`
  justify-content: center;
  align-items: center;
  opacity: ${({pressed}) => (pressed ? 0.8 : 1)};
`;
