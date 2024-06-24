import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

const getUserSetting = async (): Promise<CommonResponse<any>> => {
  try {
    const response = await nonPublicApiInstance.get('/api/v1/user/settings');
    console.log('getUserSetting response:', response.data);

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

export default getUserSetting;
