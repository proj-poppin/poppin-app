import {useState, useCallback} from 'react';
import basicLogin from '../../Axios/Auth/⭐\uFE0FbasicLogin.ts';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user.ts';
import {useNavigation} from '@react-navigation/native';

const useBasicLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // 이메일 유효성 검사
  const validateEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  // 이메일 변경 핸들러
  const handleChangeEmail = useCallback(
    (text: string) => {
      setEmail(text);
      setEmailError('');
      setPasswordError('');
      setIsLoginButtonEnabled(validateEmail(text) && password.length > 0);
    },
    [password.length, validateEmail],
  );

  // 패스워드 변경 핸들러
  const handleChangePassword = useCallback(
    (text: string) => {
      setPassword(text);
      setPasswordError('');
      setEmailError('');
      setIsLoginButtonEnabled(email.length > 0 && text.length > 0);
    },
    [email.length],
  );

  // 로그인 처리 함수
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 형식입니다.');
      return;
    }

    setLoading(true);
    try {
      const result = await basicLogin(email, password);
      if (result.success) {
        // 로그인 성공 시 accessToken을 Redux 스토어에 저장
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken: result.data!.accessToken,
            refreshToken: result.data!.refreshToken,
          }),
        );

        // 로그인 성공 시 필요한 처리 진행
        navigation.reset({routes: [{name: 'MainTabNavigator' as never}]});
      } else {
        // API에서 전달된 에러 코드에 따른 메시지 설정
        if (result.error?.code === '40400') {
          setEmailError('X 등록되지 않은 사용자에요');
        } else if (result.error?.code === '40019') {
          setPasswordError('X 잘못된 비밀번호에요');
        } else {
          // 기타 에러 메시지 처리
          setEmailError('X 등록되지 않은 사용자에요');
        }
      }
    } catch (error) {
      // 네트워크 에러 등 기타 에러 처리
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    isLoginButtonEnabled,
    handleChangeEmail,
    handleChangePassword,
    handleLogin,
    loading,
  };
};

export default useBasicLogin;
