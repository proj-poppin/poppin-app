import nonPublicApiInstance from '../../apis/apiInstance/NonPublicApiInstance';

export interface PatchUserSettingResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

const patchUserSetting = async (editValue: {
  nickname: string;
}): Promise<PatchUserSettingResponse> => {
  try {
    const response = await nonPublicApiInstance.put(
      '/api/v1/user/settings',
      editValue,
    );
    console.log('pachUserSetting response:', response.data);

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

export default patchUserSetting;
