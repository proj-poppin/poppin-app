import {useState, useEffect, useCallback} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getClosingList from '../../apis/popup/closingList.ts';

interface GetClosingState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}

const useGetClosingList = () => {
  const [getListState, setGetListState] = useState<GetClosingState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchClosingList = useCallback(async () => {
    setGetListState(prevState => ({...prevState, loading: true}));
    try {
      const response = await getClosingList();
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
    fetchClosingList();
  }, [fetchClosingList]);

  return {...getListState, refetch: fetchClosingList};
};
export default useGetClosingList;
