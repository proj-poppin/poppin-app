// useSignUpEmail.js
import {useState, useCallback, SetStateAction} from 'react';

const useSignUpEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = useCallback(email => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.)+(com|co\.kr|net|ac\.kr)$/i;
    return emailRegex.test(email);
  }, []);

  const handleEmailEndEditing = () => {
    if (!validateEmail(email)) {
      setEmailError('잘못된 이메일 형식입니다.');
    }
  };

  const handleChangeEmail = useCallback((text: SetStateAction<string>) => {
    setEmail(text);
    setEmailError('');
  }, []);

  const handleChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const handleChangePasswordConfirm = useCallback(text => {
    setPasswordConfirm(text);
  }, []);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setEmailError('');
  }, []);

  const isEmailValid = validateEmail(email);
  const isValidLength = password.length >= 8;
  const containsNumAndLetter = /(?=.*[A-Za-z])(?=.*\d)/.test(password);
  const containsSpecialChar = /(?=.*[@$!%*#?&])/.test(password);
  const isPasswordValid =
    isValidLength && containsNumAndLetter && containsSpecialChar;
  const isPasswordSame = password === passwordConfirm && isPasswordValid;

  const canGoNext = isEmailValid && isPasswordValid && isPasswordSame;

  return {
    email,
    password,
    passwordConfirm,
    emailError,
    handleChangeEmail,
    handleEmailEndEditing,
    handleChangePassword,
    handleChangePasswordConfirm,
    canGoNext,
    isValidLength,
    containsNumAndLetter,
    containsSpecialChar,
    isPasswordSame,
    resetForm, // Return resetForm function
  };
};

export default useSignUpEmail;
