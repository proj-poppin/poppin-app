import customAxios, {MANAGER_INFORM, REVIEWS, USER_INFORM} from '../axios.core';
import {handleAxiosError} from '../../Util';

/**
 * 유저 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageUserReport = async (formData: FormData) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${USER_INFORM}`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      console.log('real response', response);
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '팝업 제보하기에 실패했습니다'});
    });
};

/**
 * 운영자 팝업 스토어 제보 기능입니다.
 * @author 규진
 */
export const axiosMyPageOperatorReport = async (formData: FormData) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${MANAGER_INFORM}`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      console.log('real response', response);
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '팝업 제보하기에 실패했습니다'});
    });
};

export const axiosMypageReviewReport = async (formData: FormData) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${REVIEWS}/write`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      console.log('real response', response);
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '리뷰 작성하기 실패했습니다'});
    });
};
