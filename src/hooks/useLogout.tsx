import {useState, useCallback} from 'react';
import {useAppDispatch} from '../redux/stores';
import userSlice from '../redux/slices/user';
import logout from '../apis/auth/logout';

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
        console.log('result success:', result.success);
        dispatch(userSlice.actions.setAccessToken(''));
        setLogoutStatus({success: true, error: null});
        console.log('Logout successful');
        return setLogoutStatus({success: true, error: null});
      }
    } catch (error) {
      console.log('Logout error:', error);
    }
  }, [dispatch]);

  return {
    handleLogout,
    logoutStatus,
  };
};

export default useLogout;
