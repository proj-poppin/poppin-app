import {useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import userSlice from '../redux/slices/user.ts';

interface AccessTokenAndRefreshToken {
  accessToken: string;
  refreshToken: string;
}

const useSetAccessTokenAndRefreshToken = () => {
  const dispatch = useDispatch();

  const setTokens = useCallback(
    async ({
      accessToken,
      refreshToken,
    }: AccessTokenAndRefreshToken): Promise<void> => {
      try {
        await EncryptedStorage.setItem('accessToken', accessToken);
        await EncryptedStorage.setItem('refreshToken', refreshToken);
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken,
            refreshToken,
          }),
        );
      } catch (e) {
        throw e;
      }
    },
    [dispatch],
  );

  return setTokens;
};

export default useSetAccessTokenAndRefreshToken;
