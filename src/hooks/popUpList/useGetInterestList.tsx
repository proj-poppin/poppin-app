import {useState, useEffect, useCallback} from 'react';
import {GetInterestPopUpListResponse} from '../../types/PopUpListData.ts';
import getInterestList from '../../apis/popup/getInterestList.ts'; // 업데이트된 타입을 import

interface InterestListState {
  loading: boolean;
  error: Error | null;
  data: GetInterestPopUpListResponse[] | null;
}

const useGetInterestList = () => {
  const [interestListState, setInterestListState] = useState<InterestListState>(
    {
      loading: false,
      error: null,
      data: null,
    },
  );

  const fetchInterestList = useCallback(async () => {
    setInterestListState(prevState => ({...prevState, loading: true}));
    try {
      const response = await getInterestList();
      if (response.success) {
        setInterestListState({
          loading: false,
          error: null,
          data: response.data!,
        });
        console.log(
          'Interest list fetched successfully@@@@@@@@',
          response.data,
        );
      } else {
        setInterestListState({
          loading: false,
          error: new Error(response.error?.message || 'Unknown error'),
          data: null,
        });
      }
    } catch (error: any) {
      setInterestListState({
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
    fetchInterestList();
  }, [fetchInterestList]);

  return {...interestListState, refetch: fetchInterestList};
};

export default useGetInterestList;
