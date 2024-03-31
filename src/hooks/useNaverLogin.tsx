// useNaverLogin.js
import {useState} from 'react';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import loginSocial from '../apis/auth/login/loginSocial.ts';
const consumerKey = Config.NAVER_CONSUMER_KEY;
const consumerSecret = Config.NAVER_SECRECT_KEY;
const appName = '팝핀';
const serviceUrlScheme = Config.NAVER_URL;
export const useNaverLogin = () => {
  const [success, setSuccessResponse] = useState(null);
  const [failure, setFailureResponse] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const {failureResponse, successResponse} = await NaverLogin.login({
        appName,
        consumerKey,
        consumerSecret,
        serviceUrlScheme,
      });
      // 토큰 확인 디버깅 코드
      console.log('successResponse', successResponse);
      console.log('failureResponse', failureResponse);
      setSuccessResponse(successResponse);
      setFailureResponse(failureResponse);

      await loginSocial('naver', successResponse.accessToken);
    } catch (error) {
      console.error('Failed to login with Naver:', error);
      setError(error.message);
      setFailureResponse(error);
    }
  };

  return {login, success, failure, profile, error};
};
