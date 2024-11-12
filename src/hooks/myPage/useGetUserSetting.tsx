import {useState, useEffect, useCallback} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getUserSetting from '../../Axios/myPage/⭐\uFE0FgetUserSetting.ts';
import {useAppDispatch} from '../../redux/stores';
import userSlice from '../../redux/slices/user.ts';
import {resetInterests} from '../../redux/slices/interestSlice.ts';

interface IUserInfoState {
  loading: boolean;
  error: Error | null;
  data: any | null;
}

const useGetUserSetting = () => {
  const dispatch = useAppDispatch();
  const [userSettingInfo, setUserSettingInfo] = useState<IUserInfoState>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchUserSetting = useCallback(async () => {
    setUserSettingInfo(prevState => ({...prevState, loading: true}));
    try {
      const response = await getUserSetting();
      if (response.success) {
        setUserSettingInfo({
          loading: false,
          error: null,
          data: response.data,
        });
        dispatch(userSlice.actions.setUser(response.data));
      } else {
        setUserSettingInfo({
          loading: false,
          error: new Error(response.error?.message || 'Unknown error'),
          data: null,
        });
        dispatch(userSlice.actions.resetUser());
        dispatch(resetInterests());
      }
    } catch (error: any) {
      setUserSettingInfo({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        data: null,
      });
      dispatch(userSlice.actions.resetUser());
      dispatch(resetInterests());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserSetting();
  }, [fetchUserSetting]);

  return {...userSettingInfo, refetch: fetchUserSetting};
};

export default useGetUserSetting;
