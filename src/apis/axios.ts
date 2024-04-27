import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import setAccessTokenAndRefreshToken from '../utils/function/setAccessTokenAndRefreshToken';

const apiInstance = axios.create({
  baseURL: Config.API_URL,
});

apiInstance.interceptors.request.use(
  async config => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // Check for both 401 and 403 status codes
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const originalRefreshToken = await EncryptedStorage.getItem(
          'refreshToken',
        );
        console.log('refresh Start:', originalRefreshToken);
        const response = await axios.post(
          `${Config.API_URL}/api/v1/auth/refresh`,
          {},
          {
            headers: {Authorization: `Bearer ${originalRefreshToken}`},
          },
        );
        if (response.data.success) {
          const {accessToken, refreshToken} = response.data.data;

          // await EncryptedStorage.setItem('refreshToken', refreshToken);
          // await EncryptedStorage.setItem('accessToken', accessToken);
          // EncryptedStorage : 실제 사용하는 토큰 값
          // Redux userSlice 의 token : 로그인 상태 판별을 위해 client 에서 관리해야 하는 state
          // 따로 설정하면 human error의 여지가 많아서 util function 으로 하나로 묶어서 관리
          setAccessTokenAndRefreshToken({
            accessToken,
            refreshToken,
          });

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
