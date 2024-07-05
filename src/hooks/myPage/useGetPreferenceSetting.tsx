import {useEffect, useState} from 'react';
import getPreferenceSetting from '../../apis/auth/getpreferenceSetting.ts';
import {updatePopUpTypesWithServerData} from '../../utile/updattePopUpTypesWithServerData.ts';

interface IPreferenceState {
  loading: boolean;
  error: Error | null;
  data: any | null;
}

const useGetPreferenceSetting = () => {
  const [preference, setUPreference] = useState<IPreferenceState>({
    loading: false,
    error: null,
    data: null,
  });
  useEffect(() => {
    const getPreference = async () => {
      setUPreference({loading: true, error: null, data: null});
      try {
        const response = await getPreferenceSetting();
        if (response.success) {
          const updatedPopUpTypes = updatePopUpTypesWithServerData(
            response.data,
          );
          setUPreference({
            loading: false,
            error: null,
            data: updatedPopUpTypes,
          });
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
          data: null,
        });
      }
    };
    getPreference();
  }, []);

  return preference;
};

export default useGetPreferenceSetting;
