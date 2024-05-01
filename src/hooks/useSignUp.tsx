import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import basicSignUp from '../apis/auth/basicSignUp';
import {RootState} from '../redux/stores/reducer';
import useSetAccessTokenAndRefreshToken from './useSetAccessTokenAndRefreshToken.ts';

const useSignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const [signUpStatus, setSignUpStatus] = useState({
    success: false,
    error: null,
    newUser: false,
  });
  const setTokens = useSetAccessTokenAndRefreshToken(); // 커스텀 훅 호출

  const handleSignUp = useCallback(async () => {
    const {
      email,
      password,
      passwordConfirm,
      nickname,
      birthDate,
      agreedToPrivacyPolicy,
      agreedToServiceTerms,
    } = user;

    try {
      const signUpResult = await basicSignUp(
        email,
        password,
        passwordConfirm,
        nickname,
        birthDate,
        agreedToPrivacyPolicy,
        agreedToServiceTerms,
      );

      if (signUpResult.success && signUpResult.data) {
        const {accessToken, refreshToken} = signUpResult.data;
        await setTokens({accessToken, refreshToken});

        setSignUpStatus(prevState => ({
          ...prevState,
          success: true,
          error: null,
        }));
        console.log('SignUp successful:', signUpResult.data);
      } else {
        console.log('SignUp failed:', signUpResult.error);
        setSignUpStatus(prevState => ({
          ...prevState,
          success: false,
        }));
      }
    } catch (error) {
      console.log('SignUp error:', error);
      setSignUpStatus(prevState => ({
        ...prevState,
        success: false,
      }));
    }
  }, [user, setTokens]);

  return {
    handleSignUp,
    signUpStatus,
  };
};

export default useSignUp;
