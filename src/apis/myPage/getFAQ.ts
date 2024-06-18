import PublicApiInstance from '../../apis/apiInstance/PublicApiInstance';
import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface GetFAQInfoResponse {
  success: boolean;
  data?:any,
  error?: {
    code: string;
    message: string;
  };
}

const getFAQ = async (): Promise<GetFAQInfoResponse> => {
  try {
    const response = await PublicApiInstance.get(
      `/api/v1/user/support/faqs`,
    );
    console.log('faqapi response:', response.data);

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

export default getFAQ;
