import {useState} from 'react';
import patchUserSetting from '../../Axios/myPage/⭐\uFE0FpatchUserSetting.ts';

interface IUserInfoState {
  loading: boolean;
  error: Error | null;
  success: boolean | null;
}

const usePatchUserSetting = () => {
  const [userSettingInfo, setUserSettingInfo] = useState<IUserInfoState>({
    loading: false,
    error: null,
    success: null,
  });
  const patchUserInfo = async (editValue: any) => {
    setUserSettingInfo({loading: true, error: null, success: null});
    try {
      const response = await patchUserSetting(editValue);
      if (response.success) {
        setUserSettingInfo({loading: false, error: null, success: true});
      } else {
        throw new Error(response.error?.message || 'Failed to add interest');
      }
    } catch (error) {
      setUserSettingInfo({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        success: false,
      });
    }
  };

  return {...userSettingInfo, patchUserInfo: patchUserInfo};
};

export default usePatchUserSetting;
