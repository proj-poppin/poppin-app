import React from 'react';
import {ScreenHeader} from '../../../Component/View';
import styled from 'styled-components/native';
import {AppStackProps} from '../../../Navigator/App.stack.navigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAppStore} from '../../../Zustand/App/app.zustand';
import shallow from 'zustand/shallow';
import {useUserStore} from '../../../Zustand/User/user.zustand';
import {usePopupDetailContext} from './Provider/Popup.detail.provider';
import {MenuOptionRowProps, ThreeDotMenu} from '../../../Component/Menu';
import {usePopupDetailServiceContext} from './Provider/popup.detail.service.provider';

export const PopupDetailScreenHeader = () => {
  return (
    <ScreenHeader
      LeftComponents={'BACK_BUTTON'}
      title="팝업 상세"
      RightStyle={{marginLeft: 80}}
      RightComponents={<RightComponents />}
    />
  );
};

const RightComponents = () => {
  return (
    <RightComponents__Container>
      {/*<ShareButton />*/}
      <DotMenu />
    </RightComponents__Container>
  );
};

const DotMenu = () => {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'PopupDetailScreen'>>();
  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
  );

  const {popupDetail} = usePopupDetailContext();
  const {blockPopup} = usePopupDetailServiceContext();
  const reload = useAppStore(state => state.loadInitialData);

  const onPressReportPopup = () => {
    if (!checkLoginAndShowModal('POPUP_REPORT')) return;
    navigation.navigate('PopupDetailReportScreen', {
      popupId: popupDetail?.id,
    });
  };

  const onPressBlockPopup = async () => {
    if (!checkLoginAndShowModal('POPUP_BLOCK')) return;
    await blockPopup();
    await reload();
    navigation.goBack();
  };

  const onPressModifyRequestPopup = () => {
    if (!checkLoginAndShowModal('POPUP_MODIFY_REQUEST')) return;
    navigation.navigate('PopupDetailEditScreen', {
      popup: popupDetail,
    });
  };

  const userMenuOptionsRows: MenuOptionRowProps[] = [
    {
      text: '신고하기',
      onSelect: onPressReportPopup,
    },
    {
      text: '차단하기',
      onSelect: onPressBlockPopup,
    },
    {
      text: '수정 요청하기',
      onSelect: onPressModifyRequestPopup,
    },
  ];

  return <ThreeDotMenu menuOptions={userMenuOptionsRows} />;
};

const RightComponents__Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end; /* Ensures the three-dot menu is aligned to the far right */
  flex: 1;
`;

