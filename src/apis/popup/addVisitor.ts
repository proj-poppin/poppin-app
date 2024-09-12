import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface AddVisitorResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const addVisitor = async (
  popupId: number,
  fcmToken: string,
): Promise<AddVisitorResponse> => {
  try {
    const response = await nonPublicApiInstance.post(
      '/api/v1/rtvisit/add-visitors',
      {
        popupId,
        fcmToken,
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

export default addVisitor;
