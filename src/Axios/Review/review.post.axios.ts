import customAxios, {REVIEWS} from 'src/Axios/axios.core';
import {PopupReviewSchema} from 'src/Schema/Popup/popupReview.schema';
import {handleAxiosError} from 'src/Util/axios.util';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {StateWrapper} from '../wrapper/state_wrapper';

/**
 * 팝업 id, 리뷰 id로 특정 리뷰를 추천합니다.
 * @author 희진
 */

export type TempReviewResponse = StateWrapper<PopupReviewSchema>;

export const axiosAddRecommendReview = async (
  popupId: number,
  reviewId: number,
) => {
  return await customAxios
    .request<TempReviewResponse>({
      method: 'POST',
      url: `v1/${REVIEWS}/recommend?popupId=${popupId}&reviewId=${reviewId}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '추천 리뷰 등록에 실패했습니다',
      });
      return null;
    });
};

// popupId: number;
// text: string;
// visitDate: string;
// satisfaction: string;
// congestion: string;
// nickname: string;
// images: ImageTypeSchema[];
// isVisited: boolean;
// const result = await axiosUploadVoteWithImages(voteFormData);로 검색해서

/**
 * @param formData
 * @return 생성된 팝업 리뷰 정보(일반/인증)
 * @author 도형
 */

export const axiosUploadPopupReview = async (formData: FormData) => {
  return await customAxios
    .request<{
      updatedPopup: PopupSchema;
      newReview: PopupReviewSchema;
    }>({
      method: 'POST',
      url: `v1/${REVIEWS}/upload`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => response.data)
    .catch(error => {
      handleAxiosError({error, errorMessage: '리뷰 업로드에 실패했습니다.'});
      return null;
    });
};
