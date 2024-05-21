import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';
export interface AddRecommendReviewResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}
const addInterestPopup = async (popupId: number) => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/interest/add-interest`,
      {popupId},
    );
    console.log('addbookmarkpopup response:', response.data);

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
