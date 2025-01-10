import {handleAxiosError} from 'src/Util';
import customAxios, {USERS} from '../axios.core';

/**
 * 마이페이지 회원 퇴퇴 기능입니다.
 * @author 규진
 */
export const axiosMypageWithdraw = async () => {
  return await customAxios
    .request({
      method: 'DELETE',
      url: `v1/${USERS}/withdrawal`,
    })
    .then(response => {
      console.log('회원 탈퇴 응답:', response);
      return response.data;
    })
    .catch(error => {
      console.log('프로필 수정 에러:', error);
      handleAxiosError({error, errorMessage: '프로필 수정에 실패했습니다'});
    });
};
