import {useState, useEffect, useCallback} from 'react';
import {useAppDispatch} from '../../redux/stores';
import getWriteCompleteReviewList from '../../Axios/myPage/⭐\uFE0FgetWriteCompleteReviewList';

interface IReview {
  reviewId: number;
  popupId: number;
  name: string;
  isCertificated: boolean;
  createdAt: Date;
  imageList: string[];
}

interface IUseGetWriteCompleteReviewListState {
  loading: boolean;
  error: Error | null;
  data: IReview[] | null;
}

const useGetWriteCompleteReviewList = () => {
  const dispatch = useAppDispatch();
  const [completeReviewList, setCompleteReviewList] =
    useState<IUseGetWriteCompleteReviewListState>({
      loading: false,
      error: null,
      data: null,
    });

  const fetchUserSetting = useCallback(async () => {
    setCompleteReviewList(prevState => ({...prevState, loading: true}));
    try {
      const response = await getWriteCompleteReviewList();
      if (response.success) {
        // API에서 받아온 날짜 배열을 Date 객체로 변환
        const formattedData = response.data.map((item: any) => ({
          ...item,
          createdAt: new Date(...item.createdAt),
        }));

        setCompleteReviewList({
          loading: false,
          error: null,
          data: formattedData,
        });
      } else {
        setCompleteReviewList({
          loading: false,
          error: new Error(response.error?.message || 'Unknown error'),
          data: null,
        });
      }
    } catch (error: any) {
      setCompleteReviewList({
        loading: false,
        error:
          error instanceof Error
            ? error
            : new Error('An unexpected error occurred'),
        data: null,
      });
    }
  }, []);

  useEffect(() => {}, [fetchUserSetting]);

  return {...completeReviewList, refetch: fetchUserSetting};
};

export default useGetWriteCompleteReviewList;
