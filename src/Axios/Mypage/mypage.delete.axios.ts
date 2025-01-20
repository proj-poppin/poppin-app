import {handleAxiosError} from 'src/Util';
import customAxios, {ALARM, USERS} from '../axios.core';

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
/**
 * 마이페이지 내의 키워드 알림 부분에서 키워드 알림 삭제 기능입니다.
 * @author 규진
 */
export const axiosMypageDeleteKeywordAlarm = async (keywordId: number) => {
  return await customAxios
    .request({
      method: 'DELETE',
      url: `v1/${ALARM}/keywords/${keywordId}`,
    })
    .then(response => {
      console.log('키워드 알람 삭제 응답:', response);
      return response.data;
    })
    .catch(error => {
      console.log('키워드 알람 삭제 에러:', error);
      handleAxiosError({error, errorMessage: '키워드 알람 삭제에 실패했습니다'});
    });
};
