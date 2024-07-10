import {useState, useEffect, useCallback} from 'react';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic';
import getDetailPopUp from '../../apis/popup/detailPopUp';
import getDetailPopUpPublic from '../../apis/public/detailPopUpPublic';
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
  isPublic: boolean,
  isAlarm: boolean,
  fetchTrigger: boolean,
): DetailPopUpState & {refetch: () => void} {
  const [getDetailPopUpState, setGetDetailPopUpState] =
    useState<DetailPopUpState>({
      loading: false,
      data: null,
      error: null,
    });

  console.log('isPublic:', isPublic);

  const dispatch = useDispatch();

  const fetchDetailPopUp = useCallback(async () => {
    setGetDetailPopUpState({
      loading: true,
      data: null,
      error: null,
    });
    dispatch(setPopupDetailLoading(true));

    try {
      const response = isPublic
        ? await getDetailPopUpPublic(popUpId, isAlarm)
        : await getDetailPopUp(popUpId, isAlarm);

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
  }, [popUpId, isPublic, dispatch]);

  useEffect(() => {
    fetchDetailPopUp();
  }, [fetchDetailPopUp, fetchTrigger]);

  return {
    ...getDetailPopUpState,
    refetch: fetchDetailPopUp,
  };
}

export default useGetDetailPopUp;
