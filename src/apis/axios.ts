import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import useSetAccessToken, {AccessToken} from '../hooks/useSetAccessToken.ts';

const apiInstance = axios.create({
  baseURL: Config.API_URL,
});

apiInstance.interceptors.request.use(
  async config => {
    const setAccessToken = useSetAccessToken();
    const accessToken = await EncryptedStorage.getItem('accessToken');
    await setAccessToken(<AccessToken>{accessToken}); // 일단 이렇게 accessToken 저장
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
          const {accessToken} = response.data.data;

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
