import {useState, useEffect, useCallback} from 'react';
import {GetTastePopUpListResponse} from '../../types/PopUpListData.ts';
import getTasteList from '../../Axios/popup/⭐\uFE0Ftaste-list.ts';

interface TastListState {
  loading: boolean;
  error: Error | null;
  data: GetTastePopUpListResponse | null;
}

const useGetTasteList = () => {
  const [tasteListState, setTasteListState] = useState<TastListState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchTasteList = useCallback(async () => {
    setTasteListState(prevState => ({...prevState, loading: true}));
    try {
      const response = await getTasteList();
      if (response.success) {
        setTasteListState({
          loading: false,
          error: null,
          data: response.data!,
        });
      } else {
        setTasteListState({
          loading: false,
          error: new Error(response.error?.message || 'Unknown error'),
          data: null,
        });
      }
    } catch (error: any) {
      setTasteListState({
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
    fetchTasteList();
  }, [fetchTasteList]);

  return {...tasteListState, refetch: fetchTasteList};
};
export default useGetTasteList;
