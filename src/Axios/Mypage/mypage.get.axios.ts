import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import customAxios, {DETAIL, POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PageInfoType} from 'src/Object/Type/pageInfo.type';
import {handleAuthCheckAxiosError, handleAxiosError} from 'src/Util/axios.util';
import axios from 'axios';
import {TempPopupSchema} from '../../Schema/Popup/tempPopup.schema';
import {StateWrapper} from '../wrapper/state_wrapper';
import {CompletePopupReview} from 'src/Screen/MyPage/Review/Mypage.complete.review.list.context';
import {ReviewResponse} from 'src/Screen/MyPage/Review/Mypage.review.detail.context';
/**
 * 방문한 팝업들을 불러옵니다.
 * @returns 방문한 팝업 정보
 *
 * @author 규진
 */

export const axiosGetVisitedPopups = async () => {
  return await customAxios
    .request<{
      data: PopupSchema[];
    }>({
      method: 'GET',
      url: 'v1/popup/visited',
    })
    .then(response => {
      return response.data.data; // response.data.data로 반환
    })
    .catch(error => {
      console.log(`error: ${error}`);
      handleAuthCheckAxiosError({
        error,
        errorMessage:
          '후기 리스트를 불러오는 것이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};

export const axiosGetCompleteReviewList = async () => {
  return await customAxios
    .request<{
      data: CompletePopupReview[];
    }>({
      method: 'GET',
      url: 'v1/reviews/list',
    })
    .then(response => {
      return response.data.data; // response.data.data로 반환
    })
    .catch(error => {
      console.log(`error: ${error}`);
      handleAuthCheckAxiosError({
        error,
        errorMessage:
          '작성 완료 후기 리스트를 불러오는 것이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};

export const axiosGetCompleteReviewDetail = async (reviewId: string) => {
  return await customAxios
    .request<{
      data: ReviewResponse;
    }>({
      method: 'GET',
      url: `v1/reviews/read?reviewId=${reviewId}`,
    })
    .then(response => {
      console.debug(response.data.data);
      return response.data.data; // response.data.data로 반환
    })
    .catch(error => {
      console.log(`error: ${error}`);
      handleAxiosError({
        error,
        errorMessage:
          '작성 완료 후기 자세히 보기를 불러오는 것이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};
