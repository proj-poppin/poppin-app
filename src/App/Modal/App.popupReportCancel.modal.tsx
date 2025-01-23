import React, {useEffect} from 'react';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import shallow from 'zustand/shallow';
import {CommonModal} from 'src/Component/Modal';
import WarningIcon from 'src/Resource/svg/modal-alert-icon.svg';
import {useUserReportStore} from 'src/Screen/MyPage/Request/User/Mypage.report.user.zustand';
import {useOperatorReportStore} from 'src/Screen/MyPage/Request/Operator/Mypage.report.operator.zustand';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
/**
 * 로그인하지 않은 상태에서 로그인이 필요한 기능에 접근할 때 나타나는 모달입니다.
 * @author 규진
 */
export const PopupReportCancelModal = () => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();
  const {setAppModalVisible, appModalProps} = useAppStore(
    state => ({
      setAppModalVisible: state.setAppModalVisible,
      appModalProps: state.appModalProps,
    }),
    shallow,
  );
  const userReset = useUserReportStore(state => state.reset, shallow);
  const operatorReset = useOperatorReportStore(state => state.reset, shallow);
  function onPressCancelButton() {
    setAppModalVisible(false);
    if (appModalProps.cancelReportType?.reportType == 'user') {
      //userReport 상황에서 적었던 내용들 초기화
      userReset();
    } else {
      //operatorReport 상황에서 적었던 내용들 초기화
      operatorReset();
    }
    // 초기화 이후에 뒤로 나가버리기
    navigation.dispatch(StackActions.replace('LandingBottomTabNavigator'));
  }
  return (
    <CommonModal
      mainTitle={'정말로 나가실 건가요?'}
      subTitle={`작성 사항은 저장되지 않습니다.`}
      Icon={WarningIcon}
      showCancel={true}
      onConfirm={() => setAppModalVisible(false)}
      onCancel={onPressCancelButton}
      confirmText={'계속 작성하기'}
      cancelText={'나가기'}
    />
  );
};
