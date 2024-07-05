import {useState} from 'react';
import putPreferenceSetting from '../../apis/auth/putPreferenceSetting.ts';
import {transformData} from '../../utile/updattePopUpTypesWithServerData.ts';

interface IPreferenceState {
  loading: boolean;
  error: Error | null;
  success: boolean;
  response: CommonResponse<any> | null;
}

const usePutPreferenceSetting = () => {
  const [preference, setPreference] = useState<IPreferenceState>({
    loading: false,
    error: null,
    success: false,
    response: null,
  });

  const putPreference = async (
    selectedTags: any,
  ): Promise<CommonResponse<any>> => {
    const transformedData = transformData(selectedTags);

    setPreference({loading: true, error: null, success: false, response: null});
    try {
      const response = await putPreferenceSetting(transformedData);
      if (response.success) {
        console.log('Preference setting response:', response.data);
        setPreference({loading: false, error: null, success: true, response});
      } else {
        throw new Error(response.error?.message || 'Failed to add interest');
      }
      return response;
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');
      setPreference({
        loading: false,
        error: err,
        success: false,
        response: null,
      });
      return {success: false, error: {code: 'unknown', message: err.message}};
    }
  };

  return {...preference, putPreference};
};

export default usePutPreferenceSetting;
