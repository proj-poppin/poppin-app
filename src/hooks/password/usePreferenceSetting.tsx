import {useCallback} from 'react';
import preferenceSetting from '../../apis/auth/preferenceSetting copy.ts';
import {PreferenceData} from '../../types/PreferenceData.ts';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/stores';
import {RootState} from '../../redux/stores/reducer.ts';
import {
  resetPreferences,
  setPreference,
} from '../../redux/slices/preferenceSlice.ts';
import userSlice from '../../redux/slices/user.ts';

const usePreferenceSetting = () => {
  const dispatch = useAppDispatch();
  const preferences = useSelector((state: RootState) => state.preference);

  // 선호도 설정 업데이트 함수
  const updatePreference = (
    category: any,
  ) => {
    console.log('updatePreference', category, );
   
  };

  // 선호도 설정 초기화 함수
  const resetPreference = () => {
    dispatch(resetPreferences());
  };

  // 선호도 설정 제출 함수
  const submitPreferences = useCallback(async (): Promise<any> => {
    try {
      console.log('preferences:', preferences);
      const response = await preferenceSetting(preferences);
      if (response.success) {
        console.log(response.data.data);
        console.log('test');
        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
      }
      return response;
    } catch (error) {
      console.log('Error submitting preferences:', error);
      return {
        success: false,
        error: {message: 'Failed to submit preferences'},
      };
    }
  }, [preferences, dispatch]);

  return {
    preferences,
    updatePreference,
    resetPreference,
    submitPreferences,
  };
};

export default usePreferenceSetting;
