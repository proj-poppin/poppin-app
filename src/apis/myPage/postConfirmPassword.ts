import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface PostConfirmPasswordResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const postConfirmPassword = async (password: string): Promise<PostConfirmPasswordResponse> => {
  console.log("pss",password)
  
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/auth/verification/password`,
      {password:password}
    );
    console.log('postConfirm response:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error fetching pop up detail:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default postConfirmPassword;
