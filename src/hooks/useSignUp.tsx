import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import basicSignUp from '../apis/auth/basicSignUp.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from '../redux/stores';
import userSlice from '../redux/slices/user.ts';
import {RootState} from '../redux/stores/reducer.ts';
import setAccessTokenAndRefreshToken from '../utils/function/setAccessTokenAndRefreshToken.ts';

const useSignUp = () => {
  const user = useSelector((state: RootState) => state.user);
  const [signUpStatus, setSignUpStatus] = useState({
    success: false,
    error: null,
    newUser: false,
  });
  const dispatch = useAppDispatch();

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
        const {accessToken, refreshToken} = signUpResult.data; // Ensuring data exists before destructuring
        setAccessTokenAndRefreshToken({
          accessToken,
          refreshToken,
        });

        // await EncryptedStorage.setItem('accessToken', accessToken);
        // await EncryptedStorage.setItem('refreshToken', refreshToken);
        // dispatch(userSlice.actions.setAccessToken(accessToken));
        setSignUpStatus({
          ...signUpStatus,
          success: true,
          error: null,
        });
        console.log('SignUp successful:', signUpResult.data);
      } else {
        console.log('SignUp failed:', signUpResult.error);
        // Update the state with the encountered error
        setSignUpStatus({
          ...signUpStatus,
          success: false,
        });
      }
    } catch (error) {
      console.log('SignUp error:', error);
      setSignUpStatus({
        ...signUpStatus,
        success: false,
      });
    }
  }, [user, dispatch, signUpStatus]);
  return {
    handleSignUp,
    signUpStatus,
  };
};

export default useSignUp;
