import {useState} from 'react';
import socialSignUp from '../apis/auth/socialSignUp.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

function useSocialSignUp() {
  const [signUpStatus, setSignUpStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  });

  const signUpWithSocial = async (
    provider: string,
    nickname: string,
    birthDate: string,
  ) => {
    setSignUpStatus(prevStatus => ({...prevStatus, loading: true}));
    try {
      const response = await socialSignUp(provider, nickname, birthDate);
      if (response.success) {
        const {accessToken, refreshToken} = response.data;
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        console.log('SignUp successful with social account!!!:', response.data);
        setSignUpStatus({loading: false, error: null, success: true});
      } else {
        setSignUpStatus({
          loading: false,
          error: response.error?.message || 'Unknown error',
          success: false,
        });
      }
    } catch (error) {
      console.log('SignUp error with social account:', error);
      setSignUpStatus({
        loading: false,
        error: 'An unexpected error occurred',
        success: false,
      });
    }
  };

  return {
    signUpWithSocial,
    signUpStatus,
  };
}

export default useSocialSignUp;
