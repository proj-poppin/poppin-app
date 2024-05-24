import {useState, useEffect} from 'react';
import {DetailPopUpDataNonPublic} from '../../types/DetailPopUpDataNonPublic.ts';
import getDetailPopUp from '../../apis/popup/detailPopUp.ts';
import getDetailPopUpPublic from '../../apis/public/detailPopUpPublic.ts';

interface DetailPopUpState {
  loading: boolean;
  data: DetailPopUpDataNonPublic | null;
  error: string | null;
}

function useGetDetailPopUp(
  popUpId: number,
  isPublic: boolean,
  fetchTrigger: boolean, // Add fetchTrigger as a parameter
): DetailPopUpState {
  const [getDetailPopUpState, setGetDetailPopUpState] =
    useState<DetailPopUpState>({
      loading: false,
      data: null,
      error: null,
    });

  useEffect(() => {
    // 팝업 상세 정보를 가져오는 비동기 함수
    const fetchDetailPopUp = async () => {
      setGetDetailPopUpState({
        loading: true,
        data: null,
        error: null,
      });
      try {
        const response = isPublic
          ? await getDetailPopUpPublic(popUpId)
          : await getDetailPopUp(popUpId);
        if (response.success) {
          setGetDetailPopUpState({
            loading: false,
            data: response.data,
            error: null,
          });
          console.log(response.data);
        } else {
          setGetDetailPopUpState({
            loading: false,
            data: null,
            error: response.error?.message || 'An unknown error occurred',
          });
        }
      } catch (error) {
        setGetDetailPopUpState({
          loading: false,
          data: null,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchDetailPopUp();
  }, [popUpId, isPublic, fetchTrigger]); // Add fetchTrigger as a dependency

  return getDetailPopUpState;
}

export default useGetDetailPopUp;
