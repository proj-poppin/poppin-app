import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface PatchUserSettingResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const getPreferenceSetting = async (): Promise<PatchUserSettingResponse> => {
 
  try {
    const response = await nonPublicApiInstance.get(
      `/api/v1/user/popup-taste`,
      
    );
    console.log('preferenceGet response:', response.data);

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

export default getPreferenceSetting;
