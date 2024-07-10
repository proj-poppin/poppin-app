import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';

// redux의 userSlice에서 accessToken && refreshToken 일 때를 login 상태로 간주

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.user.refreshToken,
  );
  useEffect(() => {
    if (accessToken && refreshToken) {
      console.log('📝User is logged in.');
      setIsLoggedIn(true);
    } else {
      console.log('✅User is logged Off.');
      setIsLoggedIn(false);
    }
  }, [accessToken, refreshToken]);
  return isLoggedIn;
};

export default useIsLoggedIn;
