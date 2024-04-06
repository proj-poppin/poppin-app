import {useState, useCallback} from 'react';
import emailVerification from '../apis/auth/emailVerification.ts';

const useEmailVerification = (email: string) => {
  const [authCode, setAuthCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const verifyEmail = useCallback(async () => {
    setError('');
    if (email) {
      try {
        const response = await emailVerification(email);
        if (response.success && response.data) {
          console.log('authcode:', response.data.authCode);
          setAuthCode(response.data.authCode);
          return Promise.resolve(response.data.authCode);
        } else {
          setError(
            response.error?.message || '이메일 인증 중 오류가 발생했습니다.',
          );
          return Promise.reject(response.error);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.error?.message ||
          '네트워크 오류로 인해 이메일 인증에 실패했습니다';
        setError(errorMessage);
        return Promise.reject(new Error(errorMessage));
      }
    }
  }, [email]);

  return {authCode, setAuthCode, error, verifyEmail}; // verifyEmail 반환
};

export default useEmailVerification;
