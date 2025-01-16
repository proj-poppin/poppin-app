import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackProps} from '../../Navigator/App.stack.navigator';
import {Screen} from '../../Component/Screen/Screen.component';
import {ScreenHeader} from '../../Component/View';
import SettingIcon from 'src/Resource/svg/setting-icon.svg';
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {moderateScale} from '../../Util';
import {themeColors} from '../../Theme/theme';
import {H1} from '../../StyledComponents/Text';
import {AlarmNotificationTabScreen} from './Alarm.notification.tab.screen';

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
  <AlarmNotificationTabScreen category="popups" />
);
const NoticeNotificationScreen = () => (
  <AlarmNotificationTabScreen category="notices" />
);

export const AlarmNotificationScreen = ({
  route,
}: NativeStackScreenProps<AppStackProps, 'AlarmNotificationScreen'>) => {
  return (
    <Screen
      fullScreen
      ScreenHeader={
        <ScreenHeader
          LeftComponents={'BACK_BUTTON'}
          title="알림"
          RightComponents={<SettingIcon />}
          RightStyle={{marginLeft: moderateScale(55)}}
        />
      }
      ScreenContent={
        <AlarmNotificationTopTab.Navigator
          backBehavior="none"
          initialRouteName={route.params.initialTopTabRouteName}>
          <AlarmNotificationTopTab.Screen
            name="AlarmNotificationPopupScreen"
            component={PopupNotificationScreen}
            options={({route}) => ({
              tabBarLabel: ({focused}) => (
                <TabBarLabel label="팝업" type="BLUE" focused={focused} />
              ),
              tabBarIndicatorStyle: styles.blueIndicator,
            })}
          />
          <AlarmNotificationTopTab.Screen
            name="AlarmNotificationNoticeScreen"
            component={NoticeNotificationScreen}
            options={({route}) => ({
              tabBarLabel: ({focused}) => (
                <TabBarLabel label="공지사항" type="BLUE" focused={focused} />
              ),
              tabBarIndicatorStyle: styles.blueIndicator,
            })}
          />
        </AlarmNotificationTopTab.Navigator>
      }
    />
  );
};

const TabBarLabel = ({
  label,
  type,
  focused,
}: {
  label: string;
  type: 'BLUE' | 'PURPLE' | 'GREY';
  focused: boolean;
}) => {
  if (!focused) {
    return <TabBarLabel__Unfocused>{label}</TabBarLabel__Unfocused>;
  }
  if (type === 'BLUE') {
    return <TabBarLable__Blue>{label}</TabBarLable__Blue>;
  }
  // type === "PURPLE"
  return <TabBarLabel__Purple>{label}</TabBarLabel__Purple>;
};

const styles = StyleSheet.create({
  blueIndicator: {
    height: moderateScale(3),
    backgroundColor: themeColors().blue.main,
  },
  purpleIndicator: {
    height: moderateScale(3),
    backgroundColor: themeColors().blue.main,
  },
});

//* TabBarLabel
const TabBarLabel__Unfocused = styled(H1)`
  font-weight: bold;
  color: ${({theme}) => theme.color.grey.mild};
`;

const TabBarLable__Blue = styled(TabBarLabel__Unfocused)`
  color: ${({theme}) => theme.color.blue.main};
`;

const TabBarLabel__Purple = styled(TabBarLabel__Unfocused)`
  color: ${({theme}) => theme.color.blue.main};
`;
