import axios from 'axios';
import Config from 'react-native-config';
import {printRequestLog, printResponseLog} from './logUtils.ts';

const PublicApiInstance = axios.create({
  baseURL: Config.API_URL,
});

// 요청 인터셉터에서 토큰 관련 로직 제거
PublicApiInstance.interceptors.request.use(
  config => {
    // printRequestLog(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터에서 토큰 관련 로직 제거
PublicApiInstance.interceptors.response.use(
  response => {
    // printResponseLog(response);
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default PublicApiInstance;
