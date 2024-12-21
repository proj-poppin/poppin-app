import React from 'react';
import {Platform, View, Pressable} from 'react-native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {showBlackToast} from 'src/Util';
import {axiosGetAppleAccountStatus} from '../../Axios/User/user.get.axios';
import {useUserStore} from 'src/Zustand/User/user.zustand';
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
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        //애플 로그인 최초 사용
        if (appleAuthRequestResponse.email) {
          const appleAccountStatus = await axiosGetAppleAccountStatus({
            email: appleAuthRequestResponse.email,
          });
          console.log('appleUserID!: ', appleAuthRequestResponse.user);

          if (appleAccountStatus === null) {
            return showBlackToast({text1: '애플 계정 조회에 실패했습니다.'});
          } else if (appleAccountStatus.accountStatus === 'LOGIN') {
            //이전에 애플 간편 로그인을 진행했던 경우
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
          } else if (appleAccountStatus.accountStatus === 'SIGNUP') {
            console.log('debug Hello World');
            // 애플 간편 회원가입을 진행했던 경우
            onSignupRequired({
              email: appleAuthRequestResponse.email,
              appleUserId: appleAuthRequestResponse.user,
            });
          } else if (appleAccountStatus.accountStatus === 'UNAVAILABLE') {
            // 애플 계정으로 카카오 혹은 이메일 회원가입을 진행했던 경우
            showBlackToast({text1: appleAccountStatus.errorMessage});
          }
        } else if (appleAuthRequestResponse.user) {
          console.log('appleUserID@: ', appleAuthRequestResponse.user);
          console.log('email@: ', appleAuthRequestResponse.email);
          //애플 로그인 2번째
          const appleAccountStatus = await axiosGetAppleAccountStatus({
            appleUserId: appleAuthRequestResponse.user,
          });

          console.log('appleAccountStatus@: ', appleAccountStatus);
          if (appleAccountStatus?.accountStatus) {
            if (appleAccountStatus === null) {
              return showBlackToast({text1: '애플 계정 조회에 실패했습니다.'});
            }

            if (appleAccountStatus.accountStatus === 'LOGIN') {
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
            } else if (appleAccountStatus.accountStatus === 'SIGNUP') {
              console.log('debug Hello World@@@@@@@@');
              onSignupRequired({
                email: '',
                appleUserId: appleAuthRequestResponse.user,
              });
            }
          } else {
            showBlackToast({text1: '애플 계정 정보를 가져오지 못했습니다.'});
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
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
