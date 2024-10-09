import customAxios, {USERS} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.util';

/**
 * 회원 탈퇴시 사용합니다. 비밀번호 입력값을 서버에 전송하여 유저 본인인지 검증이 추가적으로 필요합니다.
 * @author 도형
 */
export const axiosDeleteUser = async () => {
  return await customAxios
    .request<void>({
      method: 'DELETE',
      url: `${USERS}/withdrawal`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({error, errorMessage: '회원 탈퇴에 실패했습니다'});
      return false;
    });
};
