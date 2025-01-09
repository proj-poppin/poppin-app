import {handleAxiosError} from 'src/Util';
import customAxios, {AUTH} from '../axios.core';

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
