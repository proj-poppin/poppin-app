import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {GetInterestPopUpListResponse} from '../../types/PopUpListData.ts';
import getInterestList from '../../apis/popup/getInterestList.ts'; // 업데이트된 타입을 import
import {setInitialInterests} from '../../redux/slices/interestSlice'; // Redux slice import

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

  const dispatch = useDispatch();

  const refetchInterestList = useCallback(async () => {
    setInterestListState(prevState => ({...prevState, loading: true}));
    try {
      const response = await getInterestList();
      if (response.success) {
        // Redux 상태에 관심 목록 저장
        const initialInterests = response.data!.reduce(
          (acc: any, item: any) => {
            acc[item.id] = true; // 관심 팝업으로 표시
            return acc;
          },
          {},
        );
        dispatch(setInitialInterests(initialInterests));

        setInterestListState({
          loading: false,
          error: null,
          data: response.data!,
        });
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
  }, [dispatch]);

  useEffect(() => {
    refetchInterestList();
  }, [refetchInterestList]);

  return {...interestListState, refetch: refetchInterestList};
};

export default useGetInterestList;
