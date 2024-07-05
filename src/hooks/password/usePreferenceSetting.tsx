import {useCallback} from 'react';
import preferenceSetting from '../../apis/auth/preferenceSetting copy.ts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/stores/reducer.ts';
import {
  resetPreferences,
  setPreference,
} from '../../redux/slices/preferenceSlice.ts';
import userSlice from '../../redux/slices/user.ts';

const usePreferenceSetting = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preference);

  const updatePreference = (category, key, isSelected) => {
    dispatch(setPreference({category, key, isSelected}));
  };

  const resetPreference = () => {
    dispatch(resetPreferences());
  };

  const submitPreferences = useCallback(async (): Promise<any> => {
    try {
      const response = await preferenceSetting(preferences);
      if (response.success) {
        dispatch(userSlice.actions.setIsFinishedPreferenceProcess(true));
      }
      return response;
    } catch (error) {
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
