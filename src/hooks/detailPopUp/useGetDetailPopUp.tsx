import {useState, useEffect, useCallback} from 'react';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic';
import getDetailPopUpForLoginUser from '../../Axios/popup/⭐\uFE0FdetailPopUp';
import getDetailPopUpForNotLoginUser from '../../Axios/public/detailPopUpPublic';
import {useDispatch} from 'react-redux';
import {
  setPopupDetailData,
  setPopupDetailLoading,
  setPopupDetailError,
} from '../../redux/slices/popupDetailSlice.ts';

interface DetailPopUpState {
  loading: boolean;
  data: DetailPopUpDataNonPublic | null | undefined;
  error: string | null;
}

function useGetDetailPopUp(
  popUpId: number,
  alarmId: number,
  title: string,
  isLoginUser: boolean,
  isAlarm: boolean,
  fetchTrigger: boolean,
): DetailPopUpState & {refetch: () => void} {
  const [getDetailPopUpState, setGetDetailPopUpState] =
    useState<DetailPopUpState>({
      loading: false,
      data: null,
      error: null,
    });

  const dispatch = useDispatch();

  const fetchDetailPopUp = useCallback(async () => {
    setGetDetailPopUpState({
      loading: true,
      data: null,
      error: null,
    });
    dispatch(setPopupDetailLoading(true));

    try {
      const response = isLoginUser
        ? await getDetailPopUpForLoginUser(popUpId, alarmId, isAlarm)
        : await getDetailPopUpForNotLoginUser(popUpId, alarmId, isAlarm);

      if (response.success && response.data) {
        setGetDetailPopUpState({
          loading: false,
          data: response.data,
          error: null,
        });
        dispatch(setPopupDetailData(response.data));
      } else {
        const errorMessage =
          response.error?.message || 'An unknown error occurred';
        setGetDetailPopUpState({
          loading: false,
          data: null,
          error: errorMessage,
        });
        dispatch(setPopupDetailError(errorMessage));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      setGetDetailPopUpState({
        loading: false,
        data: null,
        error: errorMessage,
      });
      dispatch(setPopupDetailError(errorMessage));
    } finally {
      dispatch(setPopupDetailLoading(false));
    }
  }, [dispatch, isLoginUser, popUpId, title, isAlarm]);

  useEffect(() => {
    fetchDetailPopUp();
  }, [fetchDetailPopUp, fetchTrigger]);

  return {
    ...getDetailPopUpState,
    refetch: fetchDetailPopUp,
  };
}

export default useGetDetailPopUp;
