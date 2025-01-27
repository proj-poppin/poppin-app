import React, {useEffect, useState} from 'react';
import {LandingScreenHeader} from 'src/Component/View';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {moderateScale} from 'src/Util';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {Animated, StyleSheet} from 'react-native';
import InfoIcon from 'src/Resource/svg/info-icon.svg';
import AppLogoIcon from 'src/Resource/svg/app-logo-p-icon.svg';
import styled from 'styled-components/native';
import {NotificationButtonSegment} from 'src/Segment/Notification';
import HeaderInfoSvg from 'src/Resource/svg/home-manual-tooltip.svg';

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
    useNavigation<NavigationProp<AppStackProps, 'BeginnerTipsScreen'>>();
  const [visible, setVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    if (visible) {
      // 5초 동안 보여주고, 그 후 2초 동안 천천히 사라짐
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => setVisible(false));
    }
  }, [fadeAnim, visible]);

  const onPressInfoIcon = () => {
    navigation.navigate('BeginnerTipsScreen', {});
  };

  // const onPressSetting = async () => {
  //   if (!checkLoginAndShowModal('ALARM')) {
  //     return;
  //   }
  //   // makeFirebaseLogEvent(MYPAGE_LOGS.landing.goto_setting);
  //   await setUserNotificationSetting({lastCheck: getCurrentISOTime()});
  //   // navigation.navigate('MypageSettingScreen', {});
  // };

  const onPressAlarm = () => {
    // makeFirebaseLogEvent(MYPAGE_LOGS.landing.goto_notification_list);
    navigation.navigate('AlarmNotificationScreen', {});
  };

  return (
    <Icons__Container>
      <InfoIcon style={styles.icon__margin} onPress={onPressInfoIcon} />
      <NotificationButtonSegment navigateOnPress={onPressAlarm} />
      {visible && (
        <Animated.View style={[styles.headerInfoSvg, {opacity: fadeAnim}]}>
          <HeaderInfoSvg />
        </Animated.View>
      )}
    </Icons__Container>
  );
};

const styles = StyleSheet.create({
  icon__margin: {
    marginRight: moderateScale(12),
  },
  headerInfoSvg: {
    position: 'absolute',
    left: -235,
    top: -4,
    zIndex: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
});

const Icons__Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
