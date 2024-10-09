import {useState, useEffect, useCallback} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getNewList from '../../Axios/popup/⭐\uFE0FnewList.ts';

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

  const fetchNewList = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchNewList();
  }, [fetchNewList]);

  return {...getListState, refetch: fetchNewList};
};

export default useGetNewList;
