import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import basicSignUp from '../../apis/auth/basicSignUp.ts';
import {RootState} from '../../redux/stores/reducer.ts';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';

const useSignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const [signUpStatus, setSignUpStatus] = useState({
    success: false,
    error: null,
    newUser: false,
    loading: false, // Add loading state
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

    setSignUpStatus(prevState => ({
      ...prevState,
      loading: true, // Set loading to true when sign up starts
    }));

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
          loading: false, // Set loading to false when sign up is successful
        }));
      } else {
        console.log('SignUp failed:', signUpResult.error);
        setSignUpStatus(prevState => ({
          ...prevState,
          success: false,
          loading: false, // Set loading to false when sign up fails
        }));
      }
    } catch (error) {
      console.log('SignUp error:', error);
      setSignUpStatus(prevState => ({
        ...prevState,
        success: false,
        loading: false, // Set loading to false when there is an error
      }));
    }
  }, [user, setTokens]);

  return {
    handleSignUp,
    signUpStatus,
  };
};

export default useSignUp;
