import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

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
  baseURL: `${Config.API_URL}/api/`,
  timeout: 5000,
});

customAxios.interceptors.request.use(config => {
  const accessToken = EncryptedStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  printRequestLog(config);
  return config;
});

customAxios.interceptors.response.use(
  response => {
    // printResponseLog(response);
    return response;
  },
  async error => {
    const originalRequest = error.config;
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

export function printRequestLog(config: InternalAxiosRequestConfig) {
  console.log('\n=====');
  console.log('%cRequest', 'color: blue; font-weight: bold;');
  console.log('Header: ', config.headers);
  console.log('Method: ', config.method);
  console.log('URL: ', config.url);
  console.log('Params: ', config.params);
  console.log('[Request Body]');
  console.log(prettyPrintJson(config.data));
  console.log('=====\n');
}

export function printResponseLog(response: AxiosResponse) {
  console.log('\n=====');
  console.log('%cResponse', 'color: blue; font-weight: bold;');
  console.log('URL: ', response.config.url);
  console.log('Header: ', response.config.headers);
  console.log('Method: ', response.config.method);
  console.log('Code: ', response.status);
  console.log('[Response Body]');
  console.log(prettyPrintJson(response.data));
  console.log('=====\n');
}

const prettyPrintJson = (json: any) => JSON.stringify(json, null, 2);
