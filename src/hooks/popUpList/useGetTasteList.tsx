import {useState, useEffect} from 'react';
import {GetTastePopUpListResponse} from '../../types/PopUpListData.ts';
import getTasteList from '../../apis/popup/taste-list.ts'; // 업데이트된 타입을 import

interface TastListState {
  loading: boolean;
  error: Error | null;
  data: GetTastePopUpListResponse | null; // 상태 타입도 업데이트
}

const useGetTasteList = () => {
  const [tasteListState, setTasteListState] = useState<TastListState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetchHotList = async () => {
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
    };

    fetchHotList();
  }, []);

  return tasteListState;
};

export default useGetTasteList;
