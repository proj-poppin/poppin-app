import EncryptedStorage from 'react-native-encrypted-storage';
import AccessTokenAndRefreshToken from '../../types/AccessTokenAndRefreshToken';
import {useDispatch} from 'react-redux';
import userSlice from '../../redux/slices/user';

export default async function setAccessTokenAndRefreshToken({
  accessToken,
  refreshToken,
}: AccessTokenAndRefreshToken) {
  const dispatch = useDispatch();

  // accessToken 만 set 성공하고 refreshToken 에서 실패하는 경우가 있을 수 있어서
  // transaction 처리가 필요할 수도 있을 것 같음
  try {
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
  } catch (e) {
    throw e;
  }

  dispatch(
    userSlice.actions.setAccessTokenAndRefreshToken({
      accessToken,
      refreshToken,
    }),
  );
}
