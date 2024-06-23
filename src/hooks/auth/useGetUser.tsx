import { useState, useEffect } from 'react';
import getUser, { GetUserData } from '../../apis/user/getUser';

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

  useEffect(() => {
    const fetchUser = async () => {
      setUserState(prevState => ({ ...prevState, loading: true }));
      try {
        const data = await getUser();
        if (data.success) {
          console.log("data다!",data.data)
          setUserState({ loading: false, error: null, data: data.data || null });
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
          error: error instanceof Error ? error : new Error('An unexpected error occurred'),
          data: null,
        });
      }
    };

    fetchUser();
  }, []);

  return userState;
};

export default useGetUser;
