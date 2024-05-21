import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import useIsLoggedIn from '../../hooks/auth/useIsLoggedIn.tsx';

const nonPublicApiInstance = axios.create({
  baseURL: Config.API_URL,
});

nonPublicApiInstance.interceptors.request.use(
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

nonPublicApiInstance.interceptors.response.use(
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
        const response = await axios.post(
          `${Config.API_URL}/api/v1/auth/refresh`,
          {},
          {
            headers: {Authorization: `Bearer ${originalRefreshToken}`},
          },
        );
        console.log('🤨🤨🤨🤨🤨🤨🤨🤨🤨');

        if (response.data.success) {
          const {accessToken, refreshToken} = response.data.data;
          await EncryptedStorage.setItem('accessToken', accessToken);
          await EncryptedStorage.setItem('refreshToken', refreshToken);
          console.log('🎨🎨🎨🎨🎨🎨accessToken:', accessToken);
          console.log('🎨🎨🎨🎨🎨🎨refreshToken:', refreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {}
    }

    return Promise.reject(error);
  },
);

export default nonPublicApiInstance;
