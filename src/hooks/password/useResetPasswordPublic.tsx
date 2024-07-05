import {useState} from 'react';
import resetPasswordPublic from '../../apis/auth/resetPasswordPublic.ts';

const useResetPasswordPublic = () => {
  const [resetPasswordStatus, setResetPasswordStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  });

  const resetUserPasswordPublic = async (
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {
    try {
      const response = await resetPasswordPublic(
        email,
        password,
        passwordConfirm,
      );
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
      console.log('Password reset error:', error);
      setResetPasswordStatus({
        ...resetPasswordStatus,
        success: false,
        error: 'An unexpected error occurred',
      });
    }
  };
  return {
    resetUserPasswordPublic: resetUserPasswordPublic,
    resetPasswordStatus,
  };
};

export default useResetPasswordPublic;
