import {useState, useEffect} from 'react';
import getHotList from '../../apis/popup/hotList.ts';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';

interface HotListState {
  loading: boolean;
  error: Error | null;
  data: any | null;
}

const useDeleteUser = () => {
  const [deleteUserState, setDeleteUserState] = useState<HotListState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const deleteUser= async () => {
      setDeleteUserState(prevState => ({...prevState, loading: true}));
      try {
        const response = await getHotList();
        if (response.success) {
          setDeleteUserState({loading: false, error: null, data: response.data}); 
        } else {
          setDeleteUserState({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
        }
      } catch (error: any) {
        setDeleteUserState({
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error('An unexpected error occurred'),
          data: null,
        });
      }
    };

    deleteUser();
  }, []);

  return deleteUserState;
};

export default useDeleteUser;
