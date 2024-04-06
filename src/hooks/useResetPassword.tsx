import {useState} from 'react';
import resetPassword from '../apis/auth/resetPassword.ts';

const useResetPassword = () => {
  const [resetPasswordStatus, setResetPasswordStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  });

  const resetUserPassword = async (
    password: string,
    passwordConfirm: string,
  ) => {
    try {
      const response = await resetPassword(password, passwordConfirm);
      if (response.success) {
        console.log('Password reset successful:', response.data);
        setResetPasswordStatus({
          ...resetPasswordStatus,
          success: true,
          error: null,
        });
      } else {
        setResetPasswordStatus({
          ...resetPasswordStatus,
          success: false,
          error: response.error?.message || 'Unknown error',
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setResetPasswordStatus({
        ...resetPasswordStatus,
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  };
  return {
    resetUserPassword,
    resetPasswordStatus,
  };
};

export default useResetPassword;
