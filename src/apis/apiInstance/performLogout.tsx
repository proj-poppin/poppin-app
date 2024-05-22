import EncryptedStorage from 'react-native-encrypted-storage';
import store from '../../redux/stores';
import logout from '../auth/logout.ts';
import userSlice from '../../redux/slices/user.ts';

export const performLogout = async () => {
  try {
    await logout();
    store.dispatch(
      userSlice.actions.setAccessTokenAndRefreshToken({
        accessToken: '',
        refreshToken: '',
      }),
    );
    store.dispatch(userSlice.actions.resetUser());
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
  } catch (error) {
    store.dispatch(
      userSlice.actions.setAccessTokenAndRefreshToken({
        accessToken: '',
        refreshToken: '',
      }),
    );
    store.dispatch(userSlice.actions.resetUser());
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
  }
};
