import customAxios, {AUTH, USERS} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.util';
import {UserSchema} from '../../Schema/User/user.schema';
import {NotificationSchema} from '../../Schema/User/notification.schema';
import {getUrlQueryString} from '../../Util';
import {PreferenceSchema} from '../../Schema/Preference/preference.schema';
import {StateWrapper} from '../wrapper/state_wrapper';
import {ScrapResponseData} from '../Popup/popup.patch.axios';
import {PopupSchema} from '../../Schema/Popup/popup.schema';
import {PopupScrapSchema} from '../../Schema/Popup/popupScrap.schema';

/**
 * 유저 기본 정보와 특성 정보를 가져옵니다.
 * @author 도형
 */
export const axiosGetSelfInfo = async () => {
  return await customAxios
    .request<{
      user: UserSchema;
      userPreferenceSetting: PreferenceSchema;
    }>({
      method: 'GET',
      url: `${USERS}`,
    })
    .then(({data}) => data)
    .catch(error => {
      return null;
    });
};

/**
 * 카테고리별로 20개씩 사용자의 가장 최근 알림을 가져옵니다.
 * @author 도형
 */
export const axiosGetRecentNotifications = async () => {
  return await customAxios
    .request<{
      POPUP: NotificationSchema[];
      NOTICE: NotificationSchema[];
    }>({
      method: 'GET',
      url: `v1/${USERS}/notifications`,
    })
    .then(({data}) => data)
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '알림을 받아오지 못했습니다',
      });
      return null;
    });
};

/**
 * 더 과거의 알림을 가져옵니다.
 * @author 도형
 */
export const axiosGetOlderNotifications = async (
  notificationId: string,
  category: string,
) => {
  return await customAxios
    .request<NotificationSchema[]>({
      method: 'GET',
      url: `${USERS}/notifications/older?notificationId=${notificationId}&category=${category}`,
    })
    .then(({data}) => {
      return data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '알림을 받아오지 못했습니다',
      });
      return null;
    });
};

/**
 * 특별히, Axios GET요청에는 Body가 없으므로, POST 요청을 사용합니다.
 * @reference https://velog.io/@mingji408/Axios-HTTP-GET-요청-시-body에-데이터를-담아-보낼-수-없다
 * @author 도형
 */
export async function axiosGetSocialAccountStatus(param: {email: string}) {
  return await customAxios
    .request<StateWrapper<AccountStatusResponseData>>({
      method: 'POST',
      url: `v1/${AUTH}/account/status`,
      data: param,
    })
    .then(({data}) => data.data)
    .catch(error => {
      console.log('error', error);
      return null;
    });
}

type AccountStatus = 'LOGIN' | 'SIGNUP' | 'UNAVAILABLE';

export interface AccountStatusResponseData {
  accountStatus: AccountStatus;
  errorMessage?: string;
}

export async function axiosGetAppleAccountStatus(param: {
  email?: string;
  appleUserId?: string;
}) {
  return await customAxios
    .request<StateWrapper<AccountStatusResponseData>>({
      method: 'POST',
      url: `v1/${AUTH}/account/status/apple`,
      data: param,
    })
    .then(({data}) => data.data)
    .catch(error => {
      console.log('error', error);
      return null;
    });
}

/**
 * 주어진 이메일의 kakao 계정 상태를 반환합니다.
 * @author 도형
 */
export async function axiosGetKakaoAccountStatus(param: {email: string}) {
  return await customAxios
    .request<{
      action: 'LOGIN' | 'SIGNUP' | 'UNAVAILABLE';
      errorMessage?: string;
    }>({
      method: 'GET',
      url: `${USERS}/kakao${getUrlQueryString(param)}`,
    })
    .then(({data}) => data)
    .catch(error => {
      return null;
    });
}

// /**
//  * 주어진 이메일의 apple 계정 상태를 반환합니다.
//  * @author 도형
//  */
// export async function axiosGetAppleAccountStatus(param: {
//   email?: string;
//   appleUserId?: string;
// }) {
//   return await customAxios
//     .request<{
//       action: 'LOGIN' | 'SIGNUP' | 'UNAVAILABLE';
//       errorMessage?: string;
//     }>({
//       method: 'GET',
//       url: `${USERS}/apple${getUrlQueryString(param)}`,
//     })
//     .then(({data}) => data)
//     .catch(error => {
//       return null;
//     });
// }

/**
 * 주어진 이메일의 google 계정 상태를 반환합니다.
 * @author 도형
 */
export async function axiosGetGoogleAccountStatus(param: {email: string}) {
  return await customAxios
    .request<{
      action: 'LOGIN' | 'SIGNUP' | 'UNAVAILABLE';
      errorMessage?: string;
    }>({
      method: 'GET',
      url: `${USERS}/google${getUrlQueryString(param)}`,
    })
    .then(({data}) => data)
    .catch(error => {
      return null;
    });
}

/**
 * 주어진 이메일의 naver 계정 상태를 반환합니다.
 * @author 도형
 */
export async function axiosGetNaverAccountStatus(param: {email: string}) {
  return await customAxios
    .request<{
      action: 'LOGIN' | 'SIGNUP' | 'UNAVAILABLE';
      errorMessage?: string;
    }>({
      method: 'GET',
      url: `${USERS}/naver${getUrlQueryString(param)}`,
    })
    .then(({data}) => data)
    .catch(error => {
      return null;
    });
}

/**
 * 회원가입시 랜덤 닉네임을 생성합니다.
 * @author 도형
 */

export interface RandomNicknameResponse {
  randomNickname: string;
}

export const axiosGetRandomNickname = async () => {
  return await customAxios
    .request<StateWrapper<RandomNicknameResponse>>({
      method: 'GET',
      url: `v1/${USERS}/random-nickname`,
    })
    .then(response => {
      console.log('response: ', response.data);
      return response.data.data;
    })
    .catch(error => {
      console.log('error: ', error);
      handleAxiosError({
        error,
        errorMessage: '랜덤 닉네임 생성에 실패했습니다',
      });
      return null;
    });
};
