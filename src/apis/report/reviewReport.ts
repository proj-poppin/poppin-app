import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const reportReview = async (
  reviewId: string,
  content: string,
): Promise<CommonResponse<any>> => {
  try {
    const response = await nonPublicApiInstance.post(
      `/api/v1/reports/review/${reviewId}`,
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
    return {
      success: false,
      error: {
        code: 'Network',
        message: 'Network error',
      },
    };
  }
};

export default reportReview;
