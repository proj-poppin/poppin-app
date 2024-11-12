import {useState, useEffect} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getPreferenceSetting from '../../Axios/Auth/⭐\uFE0FgetpreferenceSetting.ts';

interface HotListState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}

const useGetPreferenceSetting = () => {
  const [preferenceList, setPreferenceList] = useState<HotListState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchPreferenceSetting = async () => {
      setPreferenceList(prevState => ({...prevState, loading: true}));
      try {
        const response = await getPreferenceSetting();
        if (response.success) {
          setPreferenceList({
            loading: false,
            error: null,
            data: response.data!,
          }); // API 응답에 따라 'data'나 'result'로 접근 가능
        } else {
          setPreferenceList({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
        }
      } catch (error: any) {
        setPreferenceList({
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error('An unexpected error occurred'),
          data: null,
        });
      }
    };

    fetchPreferenceSetting();
  }, []);

  return preferenceList;
};

export default useGetPreferenceSetting;
