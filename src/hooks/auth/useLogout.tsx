import {useState, useCallback} from 'react';
import {useAppDispatch} from '../../redux/stores';
import userSlice from '../../redux/slices/user.ts';
import logout from '../../apis/auth/logout.ts';

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
        dispatch(
          userSlice.actions.setAccessTokenAndRefreshToken({
            accessToken: '',
            refreshToken: '',
          }),
        );

        dispatch(userSlice.actions.resetUser());
        setLogoutStatus({success: true, error: null});
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
