import {handleAxiosError} from 'src/Util';
import customAxios, {USERS} from '../axios.core';
import {useUserStore} from 'src/Zustand/User/user.zustand';

/**
 * 마이 페이지 프로필 수정 기능입니다.
 * @author 규진
 */
export const axiosMypageProfileEdit = async (formData: FormData) => {
  return await customAxios
    .request({
      method: 'PATCH',
      url: `v1/${USERS}/profile`,
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData,
    })
    .then(response => {
      console.log('프로필 수정 응답:', response);
      return response.data;
    })
    .catch(error => {
      console.log('프로필 수정 에러:', error);
      handleAxiosError({error, errorMessage: '프로필 수정에 실패했습니다'});
    });
};
