import {useState, useEffect} from 'react';
import getUser, {GetUserData} from '../../apis/user/getUser.ts';

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
      setUserState(prevState => ({...prevState, loading: true}));
      try {
        const data = await getUser();
        if (data.success) {
          setUserState({loading: false, error: null, data: data.data!}); // 'result'는 API 응답에 따라 'data' 등으로 변경해야 할 수 있음
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
    };

    fetchUser().then();
  }, []);

  return userState;
};

export default useGetUser;
