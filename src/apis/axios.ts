import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

const apiInstance = axios.create({
  baseURL: Config.API_URL,
});

apiInstance.interceptors.request.use(
  async config => {
    // Retrieve the access token from storage
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        const response = await axios.post(
          `${Config.API_URL}/refresh`,
          {},
          {
            headers: {Authorization: `Bearer ${refreshToken}`},
          },
        );

        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          // Store the new token
          await EncryptedStorage.setItem('accessToken', newAccessToken);
          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // Retry the original request with the new token
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
