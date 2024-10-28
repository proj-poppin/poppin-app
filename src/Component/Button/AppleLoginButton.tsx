import React from 'react';
import {Platform, View, Pressable} from 'react-native';
import {moderateScale} from 'src/Util';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {showBlackToast} from 'src/Util';
import {axiosGetAppleAccountStatus} from '../../Axios/User/user.get.axios';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import AppleLoginIcon from 'src/Screen/Auth/Landing/Resource/login-apple-button-row.svg';
import LoginAppleButtonIcon from 'src/Screen/Auth/Landing/Resource/login-apple-button-icon.svg';
import CommonCompleteButton from '../../Screen/Popup/Landing/common.complete.button';
import {themeColors} from '../../Theme/theme';

export function AppleLoginButton({
  isSignIn = false,
  onSignupRequired,
  onLoginSucceed,
}: {
  isSignIn?: boolean;
  onSignupRequired: (param: {email: string; appleUserId: string}) => void;
  onLoginSucceed: () => void;
}) {
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (appleAuthRequestResponse.email) {
          const appleAccountStatus = await axiosGetAppleAccountStatus({
            email: appleAuthRequestResponse.email,
            appleUserId: appleAuthRequestResponse.user,
          });
          console.log('appleUserID!: ', appleAuthRequestResponse.user);

          if (appleAccountStatus === null) {
            return showBlackToast({text1: '애플 계정 조회에 실패했습니다.'});
          } else if (appleAccountStatus.action === 'LOGIN') {
            const loginResult = await useUserStore.getState().appleLogin({
              appleUserId: appleAuthRequestResponse.user,
            });
            console.log('appleUserID@: ', appleAuthRequestResponse.user);
            if (loginResult.success) {
              showBlackToast({text1: '애플 간편 로그인 되었습니다.'});
              onLoginSucceed();
            } else {
              showBlackToast({
                text1: '애플 로그인 정보를 가져오지 못했습니다.',
              });
            }
          } else if (appleAccountStatus.action === 'SIGNUP') {
            onSignupRequired({
              email: appleAuthRequestResponse.email,
              appleUserId: appleAuthRequestResponse.user,
            });
          } else if (appleAccountStatus.action === 'UNAVAILABLE') {
            showBlackToast({text1: appleAccountStatus.errorMessage});
          }
        } else if (appleAuthRequestResponse.user) {
          const appleAccountStatus = await axiosGetAppleAccountStatus({
            appleUserId: appleAuthRequestResponse.user,
          });

          if (appleAccountStatus === null) {
            return showBlackToast({text1: '애플 계정 조회에 실패했습니다.'});
          }

          if (appleAccountStatus.action === 'LOGIN') {
            const loginResult = await useUserStore.getState().appleLogin({
              appleUserId: appleAuthRequestResponse.user,
            });
            if (loginResult.success) {
              showBlackToast({text1: '애플 간편 로그인 되었습니다.'});
              onLoginSucceed();
            } else {
              showBlackToast({
                text1: '애플 로그인 정보를 가져오지 못했습니다.',
              });
            }
          }
        } else {
          showBlackToast({text1: '애플 계정 정보를 가져오지 못했습니다.'});
        }
      }
    } catch (error) {
      showBlackToast({text1: '애플 로그인에 실패했습니다.'});
    }
  };

  return appleAuthAndroid.isSupported || Platform.OS === 'ios' ? (
    <CommonCompleteButton
      style={[
        {
          backgroundColor: themeColors().grey.black,
          width: '95%',
        },
      ]}
      textStyle={[{fontSize: 18}, {fontWeight: 'bold'}]}
      title={'Apple로 로그인'}
      onPress={onAppleButtonPress}
      extraIcon={LoginAppleButtonIcon}
    />
  ) : null;
}
