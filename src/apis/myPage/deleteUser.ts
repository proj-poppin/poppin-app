import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface GetUserInfoResponse {
  success: boolean;
  data: string;
  error?: {
    code: string;
    message: string;
  };
}

const deleteUser = async (): Promise<GetUserInfoResponse> => {
  try {
    const response = await nonPublicApiInstance.delete(
      '/api/v1/user/withdrawal',
    );
    console.log('deleteUser response:', response.data);

    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        data: '회원탈퇴 실패',
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error fetching pop up detail:', error);
    return {
      success: false,
      data: '회원탈퇴 실패',
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default deleteUser;
