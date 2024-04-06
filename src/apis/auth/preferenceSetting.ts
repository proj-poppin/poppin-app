// 사용자 선호도 데이터 타입 정의
import apiInstance from '../axios.ts';
import {PreferenceData} from '../../types/PreferenceData.ts';

const preferenceSetting = async (preferences: PreferenceData) => {
  try {
    const response = await apiInstance.post(
      '/api/v1/user/popup-taste',
      preferences,
    );

    console.log('Preference setting request:', preferences);

    if (response.data.success) {
      console.log('Preference setting response:', response.data.data);
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      console.log('Preference setting failed:', response.data.error);
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

export default preferenceSetting;
