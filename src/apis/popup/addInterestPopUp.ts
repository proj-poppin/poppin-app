import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface AddRecommendReviewResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

interface AddInterestPopupParams {
  popupId: number;
  fcm_token: string;
}

const addInterestPopup = async (params: AddInterestPopupParams) => {
  try {
    const response = await nonPublicApiInstance.post(
      '/api/v1/interest/add-interest',
      {
        popupId: params.popupId,
        fcmToken: params.fcm_token,
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

export default addInterestPopup;
