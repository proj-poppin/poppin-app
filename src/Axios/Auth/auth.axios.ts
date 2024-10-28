import messaging from '@react-native-firebase/messaging';
import {handleAxiosError} from 'src/Util/axios.util';
import customAxios, {AUTH, RESET_PASSWORD, USERS} from 'src/Axios/axios.core';
import {UserNotificationSettingSchema} from 'src/Schema/User/userNotificationSetting.schema';
import {PreferenceSchema} from 'src/Schema/Preference/preference.schema';
import {StateWrapper} from 'src/Axios/wrapper/state_wrapper';
import {UserSchema} from 'src/Schema/User/user.schema';
import {APP_VERSION} from '../../Constant/app.constant';
import {Platform} from 'react-native';
import {PopupScrapSchema} from 'src/Schema/Popup/popupScrap.schema';
import {
  SocialAccountType,
  TotalAccountType,
} from 'src/Object/Enum/account.type';
import {NotificationSchema} from 'src/Schema/User/notification.schema';
import {UserNoticeSchema} from 'src/Schema/User/userNotice.schema';
import {btoa, atob} from 'react-native-quick-base64';
export type LoginResponse = StateWrapper<UserInfo>;

export type UserActivities = {
  scrappedPopups: PopupScrapSchema[];
  notifications: {
    POPUP: NotificationSchema[];
    NOTICE: NotificationSchema[];
  };
};

type UserInfo = {
  user: UserSchema;
  userNotice: UserNoticeSchema;
  userActivities: UserActivities;
  userNotificationSetting: UserNotificationSettingSchema;
  userPreferenceSetting: PreferenceSchema;
  accessToken: string;
  refreshToken: string;
};

/**
 * 일반 회원가입시, 비밀번호 재설정시 이메일로 인증번호를 전송합니다.
 * 인증코드를 서버에서 검증받는 API도 개발해야하나 일단 보류합니다.
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
 * 카카오톡 계정으로 간편 로그인합니다.
 * @author 현웅
 */
export const axiosKakaoLogin = async (param: {email: string}) => {
  // 로그인 시 사용자 OS, 앱 버전, fcmToken 값을 추가로 전달합니다.
  const OS = Platform.OS;
  const version = APP_VERSION;
  const fcmToken = await messaging().getToken();

  return await customAxios
    .request<LoginResponse>({
      method: 'POST',
      url: `${AUTH}/kakao-login`,
      data: {...param, OS, version, fcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '로그인에 실패하였습니다'});
      return null;
    });
};

export const axiosAppleLogin = async (param: {appleUserId: string}) => {
  const OS = Platform.OS;
  const version = APP_VERSION;
  const fcmToken = await messaging().getToken();

  return await customAxios
    .request<LoginResponse>({
      method: 'POST',
      url: `${AUTH}/apple-login`,
      data: {...param, OS, version, fcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '로그인에 실패하였습니다'});
      return null;
    });
};

/**
 * 4종 소셜로그인으로 간편로그인합니다
 * @author 도형
 */
export const axiosSocialLogin = async (param: {
  type: SocialAccountType;
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

export const testFcmToken =
  'fpKiorjzKUyRnTLoaPMQxL:APA91bGofOxiZ0M-RzFZ7T-1rlKsiqjuDuPdYulvWwx3TFMFC7QAeG9oGrPMAx-_aMZ3u1PF3l9w9vp33-AWB6NUYXAt3sqWyEeE-EnDQcc8h3dM5hla-INJc4ClqfNuteMOMm7R6nwd';

/**
 * 이메일과 비밀번호를 이용해 로그인합니다(일반 로그인).
 * @author 도형
 */

export const axiosLoginWithEmailPassword = async (auth: {
  email: string;
  password: string;
}) => {
  // const fcmToken = await messaging().getToken();

  return await customAxios
    .request<LoginResponse>({
      method: 'POST',
      url: `v1/${AUTH}/sign-in`,
      headers: {
        Authorization: `Basic ${btoa(`${auth.email}:${auth.password}`)}`,
      },
      data: {testFcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log('error', error);
      handleAxiosError({error, errorMessage: '로그인에 실패했습니다'});
      return null;
    });
};

/**
 * JWT를 이용하여 자동 로그인합니다.
 * @author 도형
 */
export const axiosLoginWithAccessToken = async (jwt: string) => {
  // 로그인 시 사용자 OS, 앱 버전, fcmToken 값을 추가로 전달합니다.
  const OS = Platform.OS;
  const version = APP_VERSION;
  // const fcmToken = await messaging().getToken();
  const fcmToken = testFcmToken;
  return await customAxios
    .request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/${AUTH}/app/start`,
      headers: {Authorization: `Bearer ${jwt}`},
      data: {OS, version, testFcmToken},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '자동 로그인에 실패하였습니다\n다시 로그인 해 주세요',
      });
      return null;
    });
};

/**
 * 회원가입합니다.
 * 이메일을 이용한 회원가입, 카카오톡 계정을 이용한 간편 로그인을 모두 포괄합니다.
 * @author 도형
 */

export const axiosSignUp = async (param: {
  accountType: TotalAccountType;
  email: string;
  password?: string;
  passwordConfirm?: string;
  nickname: string;
  fcmToken: string;
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

// /**
//  * 일반 회원가입합니다.
//  * @author 도형
//  */
//
// export const axiosEmailSignUp = async (param: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
//   nickname: string;
//   agreedToPrivacyPolicy: boolean;
//   agreedToServiceTerms: boolean;
// }) => {
//   return await customAxios
//     .request<StateWrapper<UserInfo>>({
//       method: 'POST',
//       url: `v1/${USERS}`,
//       data: param,
//     })
//     .then(response => response.data)
//     .catch(error => {
//       handleAxiosError({error, errorMessage: '회원가입에 실패했습니다'});
//       return null;
//     });
// };
