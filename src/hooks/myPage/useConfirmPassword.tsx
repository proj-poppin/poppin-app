import {useState, } from 'react';
import postConfirmPasswordApi from '../../apis/myPage/postConfirmPassword.ts';


interface IConfirmPasswordState {
 loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const useConfirmPassword= () => {
  const [confirmPasswordState, setConfirmPasswordState] = useState<IConfirmPasswordState>({
    loading: false,
    error: null,
    success: null,
  });

  const confirmPassword = async (password: any) => {
    setConfirmPasswordState({loading: true, error: null, success: null});
    try {
      const response = await postConfirmPasswordApi(password);
      
      
      if (response.success) {
        setConfirmPasswordState({loading: false, error: null, success: true});
      } else {
        throw new Error(response.error?.message || 'Failed to add interest');
      }
    } catch (error) {
      
      setConfirmPasswordState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        success: false,
      });
    }
  };

  return {...confirmPasswordState, confirmPassword: confirmPassword};
};



export default useConfirmPassword;
