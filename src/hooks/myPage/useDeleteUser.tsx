import {useState, useCallback} from 'react';
import deleteUser, {
  GetUserInfoResponse,
} from '../../Axios/myPage/⭐\uFE0FdeleteUser.ts';
import {useAppDispatch} from '../../redux/stores';
import {resetInterests} from '../../redux/slices/interestSlice.ts';
import userSlice from '../../redux/slices/user.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

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
      if (response.success) {
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken: '',
            refreshToken: '',
          }),
        );
        EncryptedStorage.removeItem('accessToken');
        EncryptedStorage.removeItem('refreshToken');
        dispatch(userSlice.actions.resetUser());
        dispatch(resetInterests());
      }
      setDeleteUserState({loading: false, error: null, data: response});
      return response; // Response 반환
    } catch (error: any) {
      setDeleteUserState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        data: null,
      });
      throw error;
    }
  }, [dispatch]);

  return {...deleteUserState, handleDeleteUser};
};

export default useDeleteUser;
