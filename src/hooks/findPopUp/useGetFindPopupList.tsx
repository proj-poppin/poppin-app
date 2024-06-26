import {useState, useEffect, useCallback} from 'react';
import getFindPopUpList from '../../apis/popup/findPopupList.ts';
import getPublicFindPopUpList from '../../apis/popup/public_findPopupList.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

interface GetClosingState {
  loading: boolean;
  error: Error | null;
  data: any | null;
}
type TFilter = {id: number; name: string; selected: boolean};

const useGetFindPopupList = (
  page: number,
  size: number,
  selectedTab: any,
  selectedOrder: string,
  availableTags: TFilter[],
  searchKeyword: string,
  triggerFetch: boolean,
) => {
  const [getListState, setGetListState] = useState<GetClosingState>({
    loading: false,
    error: null,
    data: [],
  });

  const fetchFindPopupList = useCallback(async () => {
    setGetListState(prevState => ({...prevState, loading: true}));

    const selectedCategoryString = availableTags
      .slice(0, 14)
      .map(item => (item.selected ? '1' : '0'))
      .join('');

    const selectedTypeString = availableTags
      .slice(14, availableTags.length)
      .map(item => (item.selected ? '1' : '0'))
      .join('');

    const filterParams = {
      page,
      size,
      oper: selectedTab,
      text: searchKeyword,
      order: selectedOrder,
      prepered: selectedCategoryString,
      taste: selectedTypeString,
    };
    try {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const response = accessToken
        ? await getFindPopUpList(filterParams)
        : await getPublicFindPopUpList(filterParams);

      if (response.success) {
        setGetListState(prevState => ({
          loading: false,
          error: null,
          data:
            page === 0 ? response.data : [...prevState.data, ...response.data],
        }));
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
  }, [page, size, selectedOrder, selectedTab, availableTags, searchKeyword]);

  useEffect(() => {
    console.log('triggerFetch$', triggerFetch);
    fetchFindPopupList();
  }, [fetchFindPopupList, page, triggerFetch]);

  return {...getListState, refetch: fetchFindPopupList};
};

export default useGetFindPopupList;
