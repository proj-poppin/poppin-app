import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import useIsLoggedIn from '../hooks/useIsLoggedIn.tsx';

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

      console.log('refresh Start!!!!!!!!!:', originalRequest);
      const isLoggedIn = useIsLoggedIn();
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
          console.log('kiki');
          console.log(response);
          const {accessToken} = response.data.data.accessToken;
          const {refreshToken} = response.data.data.refreshToken;
          await EncryptedStorage.setItem('accessToken', accessToken);
          await EncryptedStorage.setItem('refreshToken', refreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
