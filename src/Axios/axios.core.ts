import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useUserStore} from '../Zustand/User/user.zustand';
import messaging from '@react-native-firebase/messaging';
import {StateWrapper} from './wrapper/state_wrapper';
import {axiosLogout, testFcmToken, UserInfo} from './Auth/auth.axios';
import {handleAxiosError} from '../Util';

/**
 * axios 요청에 공통적으로 사용되는 설정들을 지정해둔 axios 요청 인스턴스입니다.
 */
export interface CommonResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

const customAxios = axios.create({
  baseURL: `http://3.36.136.115/api/`,
  timeout: 5000,
});

// 요청 인터셉터: API 요청 전 로그 출력
customAxios.interceptors.request.use(config => {
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  console.log('Request Details:');
  console.log(`Endpoint: ${config.baseURL}${config.url}`);
  console.log(`Method: ${config.method?.toUpperCase()}`);
  console.log('Headers:', config.headers);
  if (config.method === 'get') {
    console.log('Params:', config.params);
  } else {
    console.log('Body:', config.data);
  }

  return config;
});

/**
 * refreshToken을 사용해 accessToken과 refreshToken을 재발급하며, 사용자 정보를 반환합니다.
 */
export const axiosAutoLogin = async (
  originalRefreshToken: string,
): Promise<StateWrapper<UserInfo> | null> => {
  try {
    const response = await customAxios.request<StateWrapper<UserInfo>>({
      method: 'POST',
      url: `v1/auth/refresh`,
      headers: {
        Authorization: `Bearer ${originalRefreshToken}`,
      },
      data: {
        fcmToken: testFcmToken,
      },
    });

    const {accessToken, refreshToken} = response.data.data.jwtToken;
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    return response.data;
  } catch (error) {
    handleAxiosError({
      error,
      errorMessage: '자동 로그인에 실패하였습니다\n다시 로그인 해 주세요',
    });
    return null;
  }
};
// 응답 인터셉터: 오류 발생 시 처리 로직
customAxios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (!originalRequest._retry) {
      const errorCode = error.response?.data?.error?.code;

      // 에러 코드별 처리
      if (errorCode === '40102') {
        handleAxiosError({
          error,
          errorMessage: '유효하지 않은 토큰입니다. 다시 로그인하세요.',
        });
        // 로그아웃 로직을 추가할 수 있습니다.
      } else if (errorCode === '403') {
        handleAxiosError({
          error,
          errorMessage: '권한이 없습니다. 접근이 제한됩니다.',
        });
      } else if (errorCode === '50000') {
        handleAxiosError({
          error,
          errorMessage: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        });
      }
    }

    return Promise.reject(error);
  },
);

export default customAxios;

//* 요청 경로 prefix
export const AUTH = 'auth';
export const INTEREST = 'interest';
export const POPUP = 'popup';
export const DETAIL = 'detail';
export const REPORTS = 'reports';
export const USERS = 'users';
export const NOTI = 'noti';
export const BLOCK = 'block';
export const ALARM = 'alarm';
export const KEYWORDS = 'keywords';
export const REVIEWS = 'reviews';
export const WRITE = 'w';
export const FINISH = 'finish';
export const IMAGE = 'image';
export const MANAGER_INFORM = 'manager-inform';
export const USER_INFORM = 'user-inform';
export const POPUP_TASTE = 'popup-taste';
export const RESET_PASSWORD = 'reset-password';
