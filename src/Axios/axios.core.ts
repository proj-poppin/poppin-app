import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useUserStore} from '../Zustand/User/user.zustand';

/**
 * axios 요청에 공통적으로 사용되는 설정들을 지정해둔 axios 요청 인스턴스입니다.
 * @author 도형
 */

export interface CommonResponse<T> {
  success: boolean;
  data?: T; // `data` 필드를 선택적으로 만듦
  error?: {
    // `error` 필드를 선택적으로 만듦
    code: string;
    message: string;
  };
}

const customAxios = axios.create({
  baseURL: `http://13.209.155.81/api/`,
  timeout: 5000,
});

// JSON 데이터 예쁘게 출력하는 함수
const prettyPrintJson = (json: any) => JSON.stringify(json, null, 2);

// 요청 인터셉터: API 요청 전 로그 출력
customAxios.interceptors.request.use(config => {
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken !== '') {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // 요청 경로 및 데이터 로그 출력
  console.log('Making request to:', config.baseURL + config.url);
  if (config.method === 'get') {
    console.log('Request Params:', prettyPrintJson(config.params));
  } else if (config.data) {
    console.log('Request Body:', prettyPrintJson(config.data));
  }

  return config;
});

// 응답 인터셉터: API 응답 후 로그 출력
customAxios.interceptors.response.use(
  response => {
    // 응답 로그 출력
    console.log(
      'Response from:',
      response.config.baseURL + response.config.url,
    );
    console.log('Response Data:', prettyPrintJson(response.data));
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 에러 응답 로그 출력
    // console.error(
    //   'Error Response from:',
    //   originalRequest.baseURL + originalRequest.url,
    // );
    if (error.response?.data) {
      // console.error(
      //   'Error Response Data:',
      //   prettyPrintJson(error.response.data),
      // );
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const originalRefreshToken = await EncryptedStorage.getItem(
          'refreshToken',
        );
        const response = await axios.post(
          `${Config.API_URL}/api/v1/auth/refresh`,
          {},
          {
            headers: {Authorization: `Bearer ${originalRefreshToken}`},
          },
        );

        if (response.data.success) {
          const {accessToken, refreshToken} = response.data.data;
          await EncryptedStorage.setItem('accessToken', accessToken);
          await EncryptedStorage.setItem('refreshToken', refreshToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } else {
          // await performLogout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // await performLogout();
        return Promise.reject(refreshError);
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
