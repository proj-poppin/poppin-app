import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
export interface AddRecommendReviewResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}
const addRecommendReview = async (popupId: number, reviewId: number) => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/review/add-recommend?popupId=${popupId}&reviewId=${reviewId}`,
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

export default addRecommendReview;
