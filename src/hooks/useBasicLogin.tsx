// useLogin.js
import {useState, useCallback} from 'react';

const useBasicLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoginButtonEnabled, setIsLoginButtonEnabled] = useState(false);

  const validateEmail = useCallback(email => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleChangeEmail = useCallback(
    text => {
      setEmail(text);
      setEmailError('');
      // Update login button state based on both inputs
      setIsLoginButtonEnabled(validateEmail(text) && password.length > 0);
    },
    [password.length, validateEmail],
  );

  const handleChangePassword = useCallback(
    text => {
      setPassword(text);
      setPasswordError('');
      // Update login button state based on both inputs
      setIsLoginButtonEnabled(email.length > 0 && text.length > 0);
    },
    [email.length],
  );

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError('X 잘못된 이메일 형식입니다.');
      return;
    }

    // Mock API call
    setTimeout(() => {
      const mockApiResponse = {success: true, message: 'Invalid password'}; // Mock response
      if (!mockApiResponse.success) {
        if (mockApiResponse.message === 'Invalid email') {
          setEmailError('X 등록되지 않은 아이디입니다.');
        } else if (mockApiResponse.message === 'Invalid password') {
          setPasswordError('X 잘못된 비밀번호입니다.');
        }
      } else {
        // Navigate or show success message
        console.log('Login successful');
      }
    }, 1000);
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
  };
};

export default useBasicLogin;
