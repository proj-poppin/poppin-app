import {useState, useCallback} from 'react';
import deleteUser, {GetUserInfoResponse} from '../../apis/myPage/deleteUser.ts';
import {useAppDispatch} from '../../redux/stores';
import {resetInterests} from '../../redux/slices/interestSlice.ts';

interface DeleteUserState {
  loading: boolean;
  error: Error | null;
  data: GetUserInfoResponse | null;
}

const useDeleteUser = () => {
  const dispatch = useAppDispatch();
  const [deleteUserState, setDeleteUserState] = useState<DeleteUserState>({
    loading: false,
    error: null,
    data: null,
  });

  const handleDeleteUser = useCallback(async () => {
    setDeleteUserState({loading: true, error: null, data: null});
    try {
      const response = await deleteUser();
      dispatch(resetInterests());
      setDeleteUserState({loading: false, error: null, data: response});
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
  }, []);

  return {...deleteUserState, handleDeleteUser};
};

export default useDeleteUser;
