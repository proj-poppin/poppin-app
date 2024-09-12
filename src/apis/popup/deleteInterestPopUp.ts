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
        data: {
          popupId: params.popupId,
          fcmToken: params.fcm_token,
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
