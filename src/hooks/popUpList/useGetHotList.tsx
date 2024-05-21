import {useState, useEffect} from 'react';
import getHotList from '../../apis/popup/hotList.ts';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';

interface HotListState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}

const useGetHotList = () => {
  const [hotListState, setHotListState] = useState<HotListState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchHotList = async () => {
      setHotListState(prevState => ({...prevState, loading: true}));
      try {
        const response = await getHotList();
        if (response.success) {
          setHotListState({loading: false, error: null, data: response.data!}); // API 응답에 따라 'data'나 'result'로 접근 가능
        } else {
          setHotListState({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
        }
      } catch (error: any) {
        setHotListState({
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error('An unexpected error occurred'),
          data: null,
        });
      }
    };

    fetchHotList();
  }, []);

  return hotListState;
};

export default useGetHotList;
