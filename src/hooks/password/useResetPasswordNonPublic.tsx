import {useState} from 'react';
import resetPasswordNonPublic from '../../apis/auth/resetPasswordNonPublic.ts';

const useResetPasswordNonPublic = () => {
  const [resetPasswordStatus, setResetPasswordStatus] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  });

  const resetUserPasswordNonPublic = async (
    password: string,
    passwordConfirm: string,
  ) => {
    try {
      const response = await resetPasswordNonPublic(password, passwordConfirm);
      if (response.success) {
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
    resetUserPasswordNonPublic: resetUserPasswordNonPublic,
    resetPasswordStatus,
  };
};

export default useResetPasswordNonPublic;
