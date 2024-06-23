import {useState, useEffect} from 'react';
import {GetPopUpListResponse} from '../../types/PopUpListData.ts';
import getUserSetting from '../../apis/myPage/getUserSetting.ts';

interface IUserInfoState {
  loading: boolean;
  error: Error | null;
  data: any | null;
}

const useGetUserSetting = () => {
  const [userSettingInfo, setUserSettingInfo] = useState<IUserInfoState>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const getUserInfo= async () => {
      setUserSettingInfo(prevState => ({...prevState, loading: true}));
      try {
        const response = await getUserSetting();
        if (response.success) {
          setUserSettingInfo({loading: false, error: null, data: response.data}); 
        } else {
          setUserSettingInfo({
            loading: false,
            error: new Error(response.error?.message || 'Unknown error'),
            data: null,
          });
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
      }
    };

    getUserInfo();
  }, []);

  return userSettingInfo;
};

export default useGetUserSetting;
