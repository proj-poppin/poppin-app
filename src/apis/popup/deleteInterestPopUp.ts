import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const deleteInterestPopUp = async (popupId: number) => {
  try {
    const response = await nonPublicApiInstance.delete(
      '/api/v1/interest/remove-interest',
      {
        params: {popupId: popupId},
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

export default deleteInterestPopUp;
