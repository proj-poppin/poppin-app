import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

interface AddInterestPopupParams {
  popupId: number;
  fcm_token: string;
}

const deleteInterestPopUp = async (params: AddInterestPopupParams) => {
  try {
    const response = await nonPublicApiInstance.delete(
      '/api/v1/interest/remove-interest',
      {
        data: null,
        params: params,
      },
    );

    console.log(response.data);

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
