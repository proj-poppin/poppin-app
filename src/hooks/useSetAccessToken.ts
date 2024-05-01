import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import userSlice from '../redux/slices/user.ts';

export interface AccessToken {
  accessToken: string;
}

const useSetAccessToken = () => {
  const dispatch = useDispatch();

  const setAccessToken = useCallback(
    async ({accessToken}: AccessToken): Promise<void> => {
      try {
        await EncryptedStorage.setItem('accessToken', accessToken);
        dispatch(userSlice.actions.setAccessToken(accessToken));
      } catch (e) {
        throw e;
      }
    },
    [dispatch],
  );

  return setAccessToken;
};

export default useSetAccessToken;
