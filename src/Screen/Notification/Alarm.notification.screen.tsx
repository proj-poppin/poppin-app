import {
  AlarmNotificationTabScreen,
  MyPageNotificationTabScreenProps,
} from './Alarm.notification.tab.screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export type AlarmNotificationScreenProps = {
  initialTopTabRouteName?: keyof AlarmNotificationTopTabProps;
};

type AlarmNotificationTopTabProps = {
  AlarmNotificationPopupScreen: AlarmNotificationScreenProps;
  AlarmNotificationNoticeScreen: AlarmNotificationScreenProps;
};

const AlarmNotificationTopTab =
  createMaterialTopTabNavigator<AlarmNotificationTopTabProps>();

const PopupNotificationScreen = () => (
  <AlarmNotificationTabScreen category="POPUP" />
);
const NoticeNotificationScreen = () => (
  <AlarmNotificationTabScreen category="NOTICE" />
);
