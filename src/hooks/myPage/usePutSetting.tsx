import {useState, } from 'react';
import putPreferenceSetting from '../../apis/auth/putPreferenceSetting.ts';
import { transformData } from '../../utile/updattePopUpTypesWithServerData.ts';

interface IPreferenceState {
 loading: boolean;
  error: Error | null;
  success: boolean;
}

const usePutPreferenceSetting = () => {
  const [preference, setUPreference] = useState<IPreferenceState>({
    loading: false,
    error: null,
    success: false,
  });

  const putPreference = async (selectedTags: any) => {
   
    const transformedData = transformData(selectedTags);
  
    setUPreference({loading: true, error: null, success: false});
    try {
      const response = await putPreferenceSetting(transformedData);
      if (response.success) {
       
        setUPreference({loading: false, error: null, success: true});
      } else {
        throw new Error(response.error?.message || 'Failed to add interest');
      }
    } catch (error) {
      setUPreference({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        success: false,
      });
    }
  };

  return {...preference, putPreference: putPreference};
};



export default usePutPreferenceSetting;
