import customAxios, {MANAGER_INFORM, REVIEWS} from '../axios.core';
import {handleAxiosError} from '../../Util';
import {ReportStore} from '../../Screen/MyPage/Report/Operator/Mypage.report.operator.zustand';

/**
 * 유저 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageUserReport = async (param: {
  targetReviewId: string;
  content: string;
}) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `${MANAGER_INFORM}/report`,
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
    });
};

/**
 * 운영자 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageOperatorReport = async (
  param: Partial<ReportStore>,
) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `${MANAGER_INFORM}/report`,
      data: {},
    })
    .then(response => {
      return true;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
    });
};
