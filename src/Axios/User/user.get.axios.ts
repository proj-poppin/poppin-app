import customAxios, {USERS} from 'src/Axios/axios.core';
import {handleAxiosError} from 'src/Util/axios.Util';

/**
 * 회원가입시 랜덤 닉네임을 생성합니다.
 * @author 도형
 */
export const axiosGetRandomNickname = async () => {
  return await customAxios
    .request<void>({
      method: 'GET',
      url: `${USERS}/random-nickname`,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      handleAxiosError({
        error,
        errorMessage: '랜덤 닉네임 생성에 실패했습니다',
      });
      return null;
    });
};
