import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {GetInterestPopUpListResponse} from '../../types/PopUpListData.ts';
import getInterestList from '../../apis/popup/getInterestList.ts';
import {setInitialInterests} from '../../redux/slices/interestSlice';

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
        const initialInterests = response.data!.reduce(
          (acc: any, item: any) => {
            acc[item.id] = true;
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
