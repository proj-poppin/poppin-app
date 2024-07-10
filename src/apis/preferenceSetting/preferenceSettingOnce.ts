// 사용자 선호도 데이터 타입 정의
import nonPublicApiInstance from '../apiInstance/NonPublicApiInstance.ts';
// apis/types.ts
export interface PreferenceSettingResponse {
  success: boolean;
  data: {
    isPreferenceSettingCreated: boolean;
  } | null;
  error: {
    code: string;
    message: string;
  } | null;
}
const getPreferenceSettingOnce =
  async (): Promise<PreferenceSettingResponse> => {
    try {
      const response = await nonPublicApiInstance.get(
        '/api/v1/user/preference-setting',
      );
      return response.data;
    } catch (error) {
      console.log('Preference setting error:', error);
      return {
        success: false,
        data: null,
        error: {code: 'Network', message: 'Network error'},
      };
    }
  };

export default getPreferenceSettingOnce;
