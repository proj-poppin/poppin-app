// src/hooks/detailPopUp/useGetDetailPopUp.ts
import {useState, useEffect} from 'react';
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
  data: DetailPopUpDataNonPublic | null;
  error: string | null;
}

function useGetDetailPopUp(
  popUpId: number,
  isPublic: boolean,
  fetchTrigger: boolean,
): DetailPopUpState {
  const [getDetailPopUpState, setGetDetailPopUpState] =
    useState<DetailPopUpState>({
      loading: false,
      data: null,
      error: null,
    });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailPopUp = async () => {
      setGetDetailPopUpState({
        loading: true,
        data: null,
        error: null,
      });
      dispatch(setPopupDetailLoading(true));

      try {
        const response = isPublic
          ? await getDetailPopUpPublic(popUpId)
          : await getDetailPopUp(popUpId);

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
    };

    fetchDetailPopUp();
  }, [popUpId, isPublic, fetchTrigger, dispatch]);

  return getDetailPopUpState;
}

export default useGetDetailPopUp;
