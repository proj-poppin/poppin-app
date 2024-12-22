import {PopupSearchParams} from 'src/Object/Type/filtering.type';
import customAxios, {DETAIL, POPUP} from 'src/Axios/axios.core';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PageInfoType} from 'src/Object/Type/pageInfo.type';
import {handleAxiosError} from 'src/Util/axios.util';
import axios from 'axios';
import {TempPopupSchema} from '../../Schema/Popup/tempPopup.schema';
import {StateWrapper} from '../wrapper/state_wrapper';
/**
 * 방문한 팝업들을 불러옵니다.
 * @returns 방문한 팝업 정보
 *
 * @author 규진
 */

export const axiosGetVisitedPopups = async () => {
  return await customAxios
    .request<{
      data: PopupSchema[];
    }>({
      method: 'GET',
      url: 'v1/popup/visited',
    })
    .then(response => {
      return response.data.data; // response.data.data로 반환
    })
    .catch(error => {
      console.log(`error: ${error}`);
      handleAxiosError({
        error,
        errorMessage:
          '후기 리스트를 불러오는 것이 정상적으로 처리되지 못했습니다',
      });
      return null;
    });
};
