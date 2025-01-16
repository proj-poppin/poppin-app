import customAxios, {NOTICES} from '../axios.core';
import {NoticeSchema} from 'src/Schema/Notice/notice.schema';
import {StateWrapper} from '../wrapper/state_wrapper';

/**
 * _id 를 통해 특정 공지 데이터를 가져옵니다.
 * @author 도형
 */
export const axiosGetNoticeById = (noticeId: string) => {
  return customAxios
    .request<StateWrapper<NoticeSchema>>({
      method: 'GET',
      url: `${NOTICES}/${noticeId}`,
    })
    .then(response => response.data.data)
    .catch(error => null);
};
