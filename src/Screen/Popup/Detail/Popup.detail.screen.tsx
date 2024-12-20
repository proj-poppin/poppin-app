import React from 'react';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PopupDetailProvider} from './Provider/Popup.detail.provider';
import {PopupDetailReviewProvider} from './Provider/Popup.detail.review.provider';
import {PopupDetailReportProvider} from './Provider/Popup.detail.report.provider';
import {PopupDetailContainer} from './Popup.detail.container';
import {PopupDetailServiceProvider} from './Provider/popup.detail.service.provider';

export type PopupDetailScreenProps = {popup: PopupSchema} | {popupId: string};

/**
 * 팝업 상세정보 페이지
 * @author 도형
 */
export function PopupDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<AppStackProps, 'PopupDetailScreen'>) {
  return (
    <PopupDetailProvider>
      <PopupDetailReviewProvider>
        <PopupDetailReportProvider>
          <PopupDetailServiceProvider>
            <PopupDetailContainer params={route.params} />
          </PopupDetailServiceProvider>
        </PopupDetailReportProvider>
      </PopupDetailReviewProvider>
    </PopupDetailProvider>
  );
}

// export function PopupDetailScreen({
//   route,
//   navigation}): NativeStackScreenProps<AppStackProps, 'PopupDetailScreen'>){
//
//   //
//   // // researchId 인자만 받아온 상태로 아직 researchDetail 정보를 가져오는 중인 경우
//   // const loadingWholeResearch = 'popupId' in route.params && loading;
//
//
//
//
//
// }
