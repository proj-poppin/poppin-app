import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

export const blockUser = async (
  blockUserId: number,
): Promise<CommonResponse<any>> => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/user/block/${blockUserId.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.data.success) {
      return response.data;
    } else {
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Error blocking user:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};
