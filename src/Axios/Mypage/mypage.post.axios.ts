import customAxios, {
  ALARM,
  AUTH,
  MANAGER_INFORM,
  REVIEWS,
  USER_INFORM,
} from '../axios.core';
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
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '팝업 제보하기에 실패했습니다'});
    });
};

/**
 * 팝업 스토어 리뷰 작성 기능입니다.
 * @author 규진
 */
export const axiosMypageReviewReport = async (formData: FormData) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${REVIEWS}/write`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '리뷰 작성하기 실패했습니다'});
    });
};

/**
 * 마이 페이지 비밀번호 검증 기능입니다.
 * @author 규진
 */
export const axiosMypagePasswordCheck = async (password: string) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${AUTH}/verification/password`,
      data: {password: password},
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '패스워드 검증에 실패했습니다.'});
    });
};

/**
 * 키워드 알림 추가 기능입니다.
 * @author 규진
 */
export const axiosMypageAddKeywordAlarm = async (keyword: string) => {
  return await customAxios
    .request({
      method: 'POST',
      url: `v1/${ALARM}/keywords`,
      data: {keyword: keyword},
    })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '키워드 등록에 실패했습니다.'});
    });
};
