import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import shallow from 'zustand/shallow';
import {CommonModal} from 'src/Component/Modal';
import WarningIcon from 'src/Resource/svg/modal-alert-icon.svg';
/**
 * 로그인하지 않은 상태에서 로그인이 필요한 기능에 접근할 때 나타나는 모달입니다.
 * @author 규진
 */
export const RequireLoginModal = () => {
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  return (
    <CommonModal
      mainTitle={'로그인이 필요합니다.'}
      subTitle={`이 기능은 로그인이 필요한 서비스입니다.`}
      Icon={WarningIcon}
      showCancel={true}
      onConfirm={() => navigation.navigate('AuthLandingScreen', {})}
      confirmText={'로그인 하러 가기'}
      cancelText={'나중에 할래요'}
    />
  );
};
