import {useState} from 'react';
import socialSignUp from '../../Axios/Auth/⭐\uFE0FsocialSignUp.ts';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';

function useSocialSignUp() {
  const [signUpStatus, setSignUpStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  });
  const setTokens = useSetAccessTokenAndRefreshToken();

  const signUpWithSocial = async (provider: string, nickname: string) => {
    setSignUpStatus(prevStatus => ({...prevStatus, loading: true}));
    try {
      const response = await socialSignUp(provider, nickname);
      if (response.success) {
        const {accessToken, refreshToken} = response.data;
        // await EncryptedStorage.setItem('accessToken', accessToken);
        // await EncryptedStorage.setItem('refreshToken', refreshToken);

        await setTokens({accessToken, refreshToken});

        setSignUpStatus({loading: false, error: null, success: true});
      } else {
        setSignUpStatus({
          loading: false,
          error: response.error?.message || 'Unknown error',
          success: false,
        });
      }
    } catch (error) {
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
