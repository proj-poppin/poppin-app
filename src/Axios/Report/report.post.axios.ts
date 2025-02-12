import customAxios, {REVIEWS} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 팝업 리뷰를 신고합니다.
 * @author 도형
 */
export const axiosReportPopupReview = async (param: {
  targetReviewId: string;
  content: string;
}) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/reports/${REVIEWS}`,
      data: {
        reviewId: param.targetReviewId,
        content: param.content,
      },
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
      return false;
    });
};

export const axiosReportPopup = async (param: {
    targetPopupId: string;
    content: string;
}) => {
    return await customAxios
        .request({
            method: 'POST',
            url: 'v1/reports/popups',
            data: {
                popupId: param.targetPopupId,
                content: param.content,
            },
        })
        .then(response => {
            return true;
        })
        .catch(error => {
            handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
            return false;
        });
};

