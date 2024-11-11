import customAxios, {MANAGER_INFORM, USER_INFORM} from '../axios.core';
import {handleAxiosError} from '../../Util';
import {OperatorReportStore} from '../../Screen/MyPage/Request/Operator/Mypage.report.operator.zustand';
import {UserReportStore} from 'src/Screen/MyPage/Request/User/Mypage.report.user.zustand';

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
      handleAxiosError({error, errorMessage: '제출에 실패했습니다'});
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
      handleAxiosError({error, errorMessage: '제출에 실패했습니다'});
    });
};
