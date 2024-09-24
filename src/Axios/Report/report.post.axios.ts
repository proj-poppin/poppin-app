import customAxios, {REVIEWS} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.Util';

/**
 * 유저를 신고합니다.
 * @author 도형
 */
export const axiosReportUser = async (
  targetUserId: string,
  content: string,
) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `${REVIEWS}/report`,
      data: {content, targetUserId},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '신고에 실패했습니다'});
      return null;
    });
};
