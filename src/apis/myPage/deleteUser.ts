import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface GetUserInfoResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const deleteUser = async (): Promise<GetUserInfoResponse> => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/user/withdrawal`,
    );
    console.log('deleteUser response:', response.data);

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

export default deleteUser;
