import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface AddRecommendReviewResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}
const addInterestPopup = async (popupId: number, fcmToken: string) => {
  try {
    const response = await nonPublicApiInstance.post(
      '/api/v1/interest/add-interest',
      null,
      {
        params: {
          popupId: popupId,
          fcm_token: 'fcmToken',
        },
      },
    );
    console.log('addInterestPopup response:', response.data);

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

export default addInterestPopup;
