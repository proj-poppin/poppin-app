import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import basicSignUp from '../../apis/auth/basicSignUp.ts';
import {RootState} from '../../redux/stores/reducer.ts';
import useSetAccessTokenAndRefreshToken from '../auth/useSetAccessTokenAndRefreshToken.ts';
import {Alert} from 'react-native'; // Import Alert

const useSignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const [signUpStatus, setSignUpStatus] = useState({
    success: false,
    error: null,
    newUser: false,
    loading: false,
  });
  const setTokens = useSetAccessTokenAndRefreshToken();

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
      loading: true,
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

        setSignUpStatus({
          success: true,
          error: null,
          newUser: true,
          loading: false,
        });
      } else {
        setSignUpStatus({
          success: false,
          error: signUpResult.error,
          newUser: false,
          loading: false,
        });

        if (signUpResult.error?.errorFields?.birthDate) {
          Alert.alert('안내', signUpResult.error.errorFields.birthDate);
        }
      }
    } catch (error) {
      console.error('SignUp error:', error);
      setSignUpStatus({
        success: false,
        error: error.toString(),
        newUser: false,
        loading: false,
      });
    }
  }, [user, setTokens]);

  return {
    handleSignUp,
    signUpStatus,
  };
};

export default useSignUp;
