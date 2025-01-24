import React from 'react';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import AlarmIcon from 'src/Resource/svg/alarm-icon.svg';
import {didDatePassedDeadline, getCurrentISOTime} from 'src/Util';
import {moderateScale} from 'src/Util';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {
  NotificationCategory,
  useNotificationStore,
} from '../../Zustand/User/notification.zustand';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AppStackProps} from "../../Navigator/App.stack.navigator";
import {StyleProp, ViewStyle} from "react-native";

/**
 * 스크린 헤더 등에서 사용되는 알림 아이콘 버튼입니다.
 *
 * - 알림 아이콘을 누르면 알림 페이지로 이동합니다. 이동 로직은 직접 지정해야 합니다. (navigateOnPress)
 * - 알림 아이콘을 누르면 유저의 마지막 알림 확인 시간을 업데이트 합니다.
 * - 새로운 알림이 있는 경우 붉은 점이 표시됩니다.
 *
 * @param navigateOnPress 알림 아이콘을 눌렀을 때의 이동 로직
 * @author 도형
 */
export function NotificationButtonSegment({style}: {
  style?: StyleProp<ViewStyle>;
}) {

  const navigation =
      useNavigation<NavigationProp<AppStackProps>>();

  const checkLoginAndShowModal = useAppStore(
      state => state.checkLoginAndShowModal
  );

  const {userNotificationSetting, setUserNotificationSetting} = useUserStore(
    state => ({
      userNotificationSetting: state.userNotificationSetting,
      setUserNotificationSetting: state.setUserNotificationSetting,
    }),
    shallow,
  );
  const {notifications} = useNotificationStore(
    state => ({notifications: state.notifications}),
    shallow,
  );

  //* 새로운 알림이 존재하는지 여부. 각 카테고리별 최신 알림이 lastCheck 를 앞서고 있는지 확인합니다.
  const hasNewNotification = Object.keys(notifications).some(category => {
    const targetNotis = notifications[category as NotificationCategory];
    if (targetNotis.length > 0) {
      return didDatePassedDeadline({
        date: targetNotis[0].createdAt,
        deadline: userNotificationSetting.lastCheck,
      });
    }
  });

  /**
   * 버튼이 눌렸을 때 실행되는 함수.
   * 로그인이 되어있는지 먼저 확인합니다. 그렇지 않다면 로그인 모달을 띄웁니다.
   * userNotificationSetting 의 lastCheck 를 업데이트하고 알림 페이지로 이동합니다.
   */
  const onPress = () => {
    if (!checkLoginAndShowModal('ALARM')) {
      return;
    }
    setUserNotificationSetting({lastCheck: getCurrentISOTime()}).then(result => console.log("alarm최근본시간 업데이트"));
    navigation.navigate('AlarmNotificationScreen', {});
  };

  return (
    <IconContainer activeOpacity={1} onPress={onPress} style={style}>
      <AlarmIcon />
      {hasNewNotification && <IconRedDot />}
    </IconContainer>
  );
}

const IconContainer = styled.TouchableOpacity`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const IconRedDot = styled.View`
  position: absolute;
  top: -5px;
  right: -7px;
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  background-color: red;
  border-radius: 100px;
`;
