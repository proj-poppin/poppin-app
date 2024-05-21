import {useState, useEffect} from 'react';
import {DetailPopUpData} from '../../types/DetaiPopUpData.ts';
import getDetailPopUp from '../../apis/popup/detailPopUp.ts';

interface DetailPopUpState {
  loading: boolean;
  data: DetailPopUpData | null;
  error: string | null;
}

// 팝업 ID를 입력으로 받는 커스텀 훅
function useGetDetailPopUp(popUpId: number): DetailPopUpState {
  const [getDetailPopUpState, setGetDetailPopUpState] =
    useState<DetailPopUpState>({
      loading: false,
      data: null,
      error: null,
    });

  useEffect(() => {
    // 팝업 상세 정보를 가져오는 비동기 함수
    const fetchDetailPopUp = async () => {
      // setState({...state, loading: true});
      try {
        const response = await getDetailPopUp(popUpId);
        if (response.success) {
          setGetDetailPopUpState({
            loading: false,
            data: response.data,
            error: null,
          });
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
  }, [popUpId]);

  return getDetailPopUpState;
}

export default useGetDetailPopUp;
