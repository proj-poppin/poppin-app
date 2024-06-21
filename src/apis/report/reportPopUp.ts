import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const reportPopup = async (
  popupId: number,
  content: string,
): Promise<CommonResponse<any>> => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/reports/popup/${popupId}`,
      {content},
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
    console.log('Error reporting popup:', error);
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default reportPopup;
