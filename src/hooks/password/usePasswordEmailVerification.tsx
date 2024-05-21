import {useState, useCallback} from 'react';
import passwordEmailVerification from '../../apis/auth/passwordEmailVerification.ts';

const usePasswordEmailVerification = (email: string) => {
  const [authCode, setAuthCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const verifyEmail = useCallback(async () => {
    setError('');
    if (email) {
      try {
        const response = await passwordEmailVerification(email);
        if (response.success && response.data) {
          console.log('authcode:', response.data.authCode);
          setAuthCode(response.data.authCode);
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
        return Promise.reject(new Error(errorMessage)); // 에러를 throw할 때 메시지도 같이 넘김
      }
    }
  }, [email]);

  return {authCode, setAuthCode, error, verifyEmail}; // verifyEmail 반환
};

export default usePasswordEmailVerification;
