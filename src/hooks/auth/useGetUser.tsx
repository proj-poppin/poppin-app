import {useState, useEffect, useCallback} from 'react';
import userGetAxios, {GetUserData} from '../../Axios/User/user.get.axios.ts';

interface UserState {
  loading: boolean;
  error: Error | null;
  data: GetUserData | null;
}

const useGetUser = () => {
  const [userState, setUserState] = useState<UserState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchUser = useCallback(async () => {
    setUserState(prevState => ({...prevState, loading: true}));
    try {
      const data = await userGetAxios();
      if (data.success) {
        setUserState({loading: false, error: null, data: data.data || null});
      } else {
        setUserState({
          loading: false,
          error: new Error(data.error?.message || 'Unknown error'),
          data: null,
        });
      }
    } catch (error: any) {
      setUserState({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        data: null,
      });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {...userState, refetch: fetchUser};
};

export default useGetUser;
