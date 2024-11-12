import React from 'react';
import {LandingScreenHeader} from 'src/Component/View';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCurrentISOTime, moderateScale} from 'src/Util';
import {useUserStore} from 'src/Zustand/User/user.zustand';
import {useAppStore} from 'src/Zustand/App/app.zustand';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {StyleSheet} from 'react-native';
import InfoIcon from 'src/Resource/svg/info-icon.svg';
import AppLogoIcon from 'src/Resource/svg/app-logo-p-icon.svg';
import styled from 'styled-components/native';
import {NotificationButtonSegment} from 'src/Segment/Notification';

export const HomeLandingScreenHeader = () => {
  return (
    <LandingScreenHeader
      LeftComponents={<AppLogoIcon />}
      RightComponents={<RightIcons />}
    />
  );
};

const RightIcons = () => {
  const navigation =
    useNavigation<NavigationProp<AppStackProps, 'LandingBottomTabNavigator'>>();

  const checkLoginAndShowModal = useAppStore(
    state => state.checkLoginAndShowModal,
  );
  const setUserNotificationSetting = useUserStore(
    state => state.setUserNotificationSetting,
  );

  const onPressSetting = () => {
    if (!checkLoginAndShowModal('ALARM')) return;
    // makeFirebaseLogEvent(MYPAGE_LOGS.landing.goto_setting);
    setUserNotificationSetting({lastCheck: getCurrentISOTime()});
    // navigation.navigate('MypageSettingScreen', {});
  };

  const onPressAlarm = () => {
    // makeFirebaseLogEvent(MYPAGE_LOGS.landing.goto_notification_list);
    // navigation.navigate('MypageNotificationScreen', {});
  };

  return (
    <Icons__Container>
      <InfoIcon style={styles.icon__margin} onPress={onPressSetting} />
      <NotificationButtonSegment navigateOnPress={onPressAlarm} />
    </Icons__Container>
  );
};

const styles = StyleSheet.create({
  icon__margin: {
    marginRight: moderateScale(12),
  },
});

const Icons__Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
