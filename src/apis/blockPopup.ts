import nonPublicApiInstance from './apiInstance/NonPublicApiInstance.ts';

const blockPopup = async (popupId: number): Promise<CommonResponse<any>> => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/popup/block/${popupId.toString()}`,
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
    console.log('Error blocking popup:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default blockPopup;
