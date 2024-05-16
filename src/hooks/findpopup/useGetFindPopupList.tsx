import {useState, useEffect} from 'react';
import {GetPopUpListResponse} from '../..//types/PopUpListData.ts';
import getFindPopUpList from '../../apis/popup/findPopupList.ts';
import {TFilterparmas} from '../../apis/popup/findPopupList.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

interface GetClosingState {
  loading: boolean;
  error: Error | null;
  data: GetPopUpListResponse[] | null;
}
type TFilter = {id: number; name: string; selected: boolean};
const useGetFindPopupList = (
  page: number,
  size: number,
  selectedTab: string,
  selectedOrder: string,
  availableTags: TFilter[],
  searchKeyword: string,
) => {
  const [getListState, setGetListState] = useState<GetClosingState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const fetcFindPopupList = async () => {
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
  }, [page, size, selectedOrder, selectedTab, availableTags]);

  return getListState;
};

export default useGetFindPopupList;
