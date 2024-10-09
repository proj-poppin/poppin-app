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

export const PopupDetailScreenHeader = () => {
  return (
    <ScreenHeader
      LeftComponents={'BACK_BUTTON'}
      title="팝업 상세"
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

  const {user, userRelation} = useUserStore(
    state => ({
      user: state.user,
      userRelation: state.userRelation,
    }),
    shallow,
  );
  const {popupDetail} = usePopupDetailContext();

  const isUserBlocked = userRelation.blockedUserIds.includes(popupDetail?.id);

  const onPressReportPopup = () => {
    if (!checkLoginAndShowModal('POPUP_REPORT')) return;
    // 신고 로직 추가
  };

  const onPressBlockPopup = () => {
    if (!checkLoginAndShowModal('POPUP_BLOCK')) return;
    // 차단 로직 추가
  };

  const onPressModifyRequestPopup = () => {
    if (!checkLoginAndShowModal('POPUP_MODIFY_REQUEST')) return;
    // 수정 요청 로직 추가
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

const styledMenuStyle = {
  borderRadius: 8,
  backgroundColor: '#ffffff',
  padding: 10,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
};
