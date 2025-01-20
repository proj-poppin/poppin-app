import {handleAxiosError} from 'src/Util';
import customAxios, {ALARM, AUTH} from '../axios.core';

/**
 * 마이 페이지 비밀번호 변경 기능입니다.
 * @author 규진
 */
export const axiosMypagePasswordChange = async (passwordSet: {
  password: string;
  passwordConfirm: string;
}) => {
  return await customAxios
    .request({
      method: 'PUT',
      url: `v1/${AUTH}/reset-password`,
      data: passwordSet,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '패스워드 변경에 실패했습니다.'});
    });
};

/**
 * 마이페이지 내에서 키워드 알림 기능을 키고 끕니다.
 * @author 규진
 */
export const axiosMypageToggleKeywordAlarm = async (
  keywordId: number,
  isOn: boolean,
) => {
  return await customAxios
    .request({
      method: 'PUT',
      url: `v1/${ALARM}/keywords/${keywordId}?isOn=${!isOn}`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '패스워드 변경에 실패했습니다.'});
    });
};
