import {useState, useEffect} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getNewList from '../../apis/popup/newList.ts';

interface GetNewState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}

const useGetNewList = () => {
  const [getListState, setGetListState] = useState<GetNewState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchHotList = async () => {
      setGetListState(prevState => ({...prevState, loading: true}));
      try {
        const response = await getNewList();
        if (response.success) {
          setGetListState({loading: false, error: null, data: response.data});
        } else {
          setGetListState({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
        }
      } catch (error: any) {
        setGetListState({
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

  return getListState;
};

export default useGetNewList;
