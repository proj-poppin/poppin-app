import {useState, useCallback} from 'react';
import {useAppDispatch} from '../redux/stores';
import userSlice from '../redux/slices/user';
import logout from '../apis/auth/logout';
import EncryptedStorage from 'react-native-encrypted-storage';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutStatus, setLogoutStatus] = useState({
    success: false,
    error: null,
  });

  const handleLogout = useCallback(async () => {
    try {
      const result = await logout();
      if (result && result.success) {
        dispatch(userSlice.actions.setAccessToken('')); // accessToken 상태를 비워줌
        await EncryptedStorage.removeItem('accessToken'); // 로컬 스토리지에서도 지워줌
        await EncryptedStorage.removeItem('refreshToken');
        setLogoutStatus({success: true, error: null});
        console.log('Logout successful');
      } else {
        setLogoutStatus({success: false, error: result.error});
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutStatus({
        success: false,
        error: error,
      });
    }
  }, [dispatch]);

  return {
    handleLogout,
    logoutStatus,
  };
};

export default useLogout;
