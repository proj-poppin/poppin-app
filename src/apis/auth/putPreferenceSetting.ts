// 사용자 선호도 데이터 타입 정의
import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';

const putPreferenceSetting = async (selectedTags: any) => {
  try {
    const response = await nonPublicApiInstance.put(
      '/api/v1/user/popup-taste',
      selectedTags,
    );
    if (response.data.success) {
      console.log('getPreference setting response:', response.data.data);
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      console.log('getPreference setting failed:', response.data.error);
      return {
        success: false,
        error: response.data.error,
      };
    }
  } catch (error) {
    console.log('Preference setting error:', error);
    return {
      success: false,
      error: {code: 'Network', message: 'Network error'},
    };
  }
};

export default putPreferenceSetting;
