import messaging from '@react-native-firebase/messaging';
import {handleAxiosError} from 'src/Util/axios.Util';
import {UserJwtTokenSchema} from 'src/Schema/User/userJwtToken.schema';
import customAxios, {AUTH, RESET_PASSWORD, USERS} from 'src/Axios/axios.core';
import {UserNotificationSettingSchema} from 'src/Schema/User/userNotificationSetting.schema';
import {PreferenceSchema} from 'src/Schema/Preference/preference.schema';
import {StateWrapper} from 'src/Axios/wrapper/state_wrapper';
import {UserSchema} from 'src/Schema/User/user.schema';

type UserInfo = {
  user: UserSchema;
  userNotificationSetting: UserNotificationSettingSchema;
  userPreferenceSetting: PreferenceSchema;
  jwtToken: UserJwtTokenSchema;
};

/**
 * 일반 회원가입시, 비밀번호 재설정시 이메일로 인증번호를 전송합니다.
 * @author 도형
 */
export const axiosVerifyEmailAuthCode = async (param: {email: string}) => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${AUTH}/email/verification`,
      data: param,
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '인증번호 전송에 실패했습니다\n잠시 후 다시 시도해주세요',
      });
      return false;
    });
};

export const axiosPostConfirmPassword = async (password: string) => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${AUTH}/verification/password`,
      data: {password},
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '비밀번호 확인에 실패했습니다',
      });
    });
};

/**
 * 기존 비밀번호를 잊어버린 경우, 이메일 인증을 진행한 후 비밀번호를 재설정합니다.
 * @author 도형
 */
export const axiosResetPassword = async (param: {
  email: string;
  password: string;
  passwordConfirm: string;
}): Promise<boolean> => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${AUTH}/${RESET_PASSWORD}/no-auth`,
      data: param,
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage:
          '비밀번호 재설정에 실패했습니다\n잠시 후 다시 시도해주세요',
      });
      return false;
    });
};

/**
 * 일반 로그인한 사용자가 비밀번호를 변경합니다.
 * @author 도형
 */
export const axiosChangePassword = async (param: {
  password: string;
  passwordConfirm: string;
}): Promise<boolean> => {
  return await customAxios
    .request<void>({
      method: 'PUT',
      url: `v1/${AUTH}/${RESET_PASSWORD}`,
      data: param,
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '비밀번호 변경에 실패했습니다\n잠시 후 다시 시도해주세요',
      });
      return false;
    });
};

/**
 * 로그아웃합니다. 서버단 fcmToken 이 초기화되어, 푸시 알림이 전달되지 않습니다.
 * @author 도형
 */
export const axiosLogout = async () => {
  return await customAxios
    .request<void>({
      method: 'POST',
      url: `v1/${AUTH}/sign-out`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '로그아웃에 실패했습니다'});
      return null;
    });
};

/**
 * 4종 소셜로그인으로 간편로그인합니다
 * @author 도형
 */
export const axiosSocialLogin = async (param: {
  type: string;
  token: string;
}) => {
  const fcmToken = await messaging().getToken();

  return await customAxios
    .request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/${AUTH}/login/${param.type}`,
      headers: {
        Authorization: `Bearer ${param.token}`,
      },
      data: {fcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '로그인에 실패했습니다\n잠시 후 다시 시도해주세요',
      });
      return null;
    });
};

/**
 * 이메일과 비밀번호를 이용해 로그인합니다(일반 로그인).
 * @author 도형
 */
export const axiosEmailLogin = async (auth: {
  email: string;
  password: string;
}) => {
  const fcmToken = await messaging().getToken();

  return await customAxios
    .request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/${AUTH}/login`,
      headers: {
        Authorization: `Basic ${btoa(`${auth.email}:${auth.password}`)}`,
      },
      data: {fcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '로그인에 실패했습니다'});
      return null;
    });
};

/**
 * 회원가입합니다.
 * 이메일을 이용한 회원가입, 카카오톡 계정을 이용한 간편 로그인을 모두 포괄합니다.
 * @author 도형
 */

export const axiosSocialSignUp = async (param: {
  accountType: string;
  nickname: string;
}) => {
  return await customAxios
    .request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/${USERS}/social`,
      data: param,
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({error, errorMessage: '회원가입에 실패했습니다'});
      return null;
    });
};

/**
 * 일반 회원가입합니다.
 * @author 도형
 */

export const axiosEmailSignUp = async (param: {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  agreedToPrivacyPolicy: boolean;
  agreedToServiceTerms: boolean;
}) => {
  return await customAxios
    .request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/${USERS}`,
      data: param,
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({error, errorMessage: '회원가입에 실패했습니다'});
      return null;
    });
};
