import {useState, useEffect} from 'react';
import {GetPopUpListResponse} from '../..//types/PopUpListData.ts';
import getFindPopUpList from '../../apis/popup/findPopupList.ts';
import {TFilterparmas} from '../../apis/popup/findPopupList.ts';

interface GetClosingState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}

const useGetFindPopupList = (filterParams: any) => {
  console.log('filter', filterParams);
  const [getListState, setGetListState] = useState<GetClosingState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetcFindPopupList = async () => {
      setGetListState(prevState => ({...prevState, loading: true}));
      try {
        const response = await getFindPopUpList(filterParams);
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
    fetcFindPopupList();
  }, [filterParams]);

  return getListState;
};

export default useGetFindPopupList;
