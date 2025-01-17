import React from 'react';
import {Switch, Linking, Platform, Alert, NativeModules} from 'react-native';
import {
  openSettings,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import styled from 'styled-components/native';
import shallow from 'zustand/shallow';
import {useUserStore} from '../../Zustand/User/user.zustand';
import {Screen} from '../../Component/Screen/Screen.component';
import {ScreenHeader} from '../../Component/View';
import {moderateScale} from '../../Util';
import {DetailText, H1, H2} from '../../StyledComponents/Text';
import {themeColors} from '../../Theme/theme';

export type AlarmSettingScreenProps = {};

/**
 * 홈 - 알림 - 알림 설정 페이지입니다.
 * @author 도형
 */

export const AlarmSettingScreen = () => {
  const {notificationSetting, setNotificationSetting} = useUserStore(
    state => ({
      notificationSetting: state.userNotificationSetting,
      setNotificationSetting: state.setUserNotificationSetting,
    }),
    shallow,
  );

  // 알림 설정을 변경하기 위해 설정 화면으로 이동합니다.
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        '알림 설정',
        '알림을 해제하기 위해 설정 화면으로 이동합니다.',
        [
          {text: '취소', style: 'cancel'},
          {text: '확인', onPress: () => Linking.openURL('app-settings:')},
        ],
      );
    } else if (Platform.OS === 'android') {
      Alert.alert(
        '알림 설정',
        '알림을 해제하기 위해 설정 화면으로 이동합니다.',
        [
          {text: '취소', style: 'cancel'},
          {text: '확인', onPress: openSettings},
        ],
      );
    }
  };

  const toggleAppPush = async () => {
    // 알림 설정 변경
    setNotificationSetting({
      ...notificationSetting,
      appPush: !notificationSetting.appPush,
    });

    if (notificationSetting.appPush) {
      openAppSettings();
    } else {
      const notificationPermission = await checkNotifications();
      if (notificationPermission.status === 'denied') {
        await requestNotifications(['alert', 'badge', 'sound']);
      }
    }
  };

  const toggleNightPush = async () => {
    // 알림 설정 변경
    setNotificationSetting({
      ...notificationSetting,
      nightPush: !notificationSetting.nightPush,
    });
  };

  const toggleHelpfulReviewPush = async () => {
    // 알림 설정 변경
    setNotificationSetting({
      ...notificationSetting,
      helpfulReviewPush: !notificationSetting.helpfulReviewPush,
    });
  };

  const toggleInterestedPopupOpenPush = async () => {
    // 알림 설정 변경
    setNotificationSetting({
      ...notificationSetting,
      interestedPopupOpenPush: !notificationSetting.interestedPopupOpenPush,
    });
  };

  const toggleInterestedPopupDeadlinePush = async () => {
    // 알림 설정 변경
    setNotificationSetting({
      ...notificationSetting,
      interestedPopupDeadlinePush:
        !notificationSetting.interestedPopupDeadlinePush,
    });
  };

  const toggleInterestedPopupInfoUpdatedPush = async () => {
    // 알림 설정 변경
    await setNotificationSetting({
      ...notificationSetting,
      interestedPopupInfoUpdatedPush:
        !notificationSetting.interestedPopupInfoUpdatedPush,
    });
  };

  return (
    <Screen
      ScreenHeader={
        <ScreenHeader
          LeftComponents={'BACK_BUTTON'}
          title="알림 설정"
          RightStyle={{marginLeft: moderateScale(55)}}
        />
      }
      ScreenContent={
        <>
          <SectionContainer>
            <GreyTextAlarmTitle>기본 알림</GreyTextAlarmTitle>
            <ButtonRow
              title="푸시 알림"
              value={notificationSetting.appPush}
              disabled={false}
              onValueChange={toggleAppPush}
            />
            <ButtonRow
              title="야간 푸시 알림(21시~08시)"
              value={notificationSetting.nightPush}
              disabled={false}
              onValueChange={toggleNightPush}
            />
            <Splitter />
            <GreyTextAlarmTitle>활동 알림</GreyTextAlarmTitle>

            <ButtonRow
              title="도움이 된 후기"
              description={'내가 작성한 후기에 추천이 달리면 알려드려요'}
              value={notificationSetting.helpfulReviewPush}
              disabled={false}
              onValueChange={toggleHelpfulReviewPush}
            />
            <ButtonRow
              title="관심 팝업 오픈"
              description={'관심 등록한 팝업이 오픈되면 알려드려요'}
              value={notificationSetting.interestedPopupOpenPush}
              disabled={false}
              onValueChange={toggleInterestedPopupOpenPush}
            />
            <ButtonRow
              title="관심 팝업 마감 D-1"
              description={'관심 등록한 팝업이 마감 D-1이 되면 알려드려요'}
              value={notificationSetting.interestedPopupDeadlinePush}
              disabled={false}
              onValueChange={toggleInterestedPopupDeadlinePush}
            />
            <ButtonRow
              title="관심 팝업 정보 변경"
              description={'관심 등록한 팝업의 정보가 업데이트되면 알려드려요'}
              value={notificationSetting.interestedPopupInfoUpdatedPush}
              disabled={false}
              onValueChange={toggleInterestedPopupInfoUpdatedPush}
            />
          </SectionContainer>
        </>
      }
    />
  );
};

const ButtonRow = ({
  title,
  description,
  disabled,
  value,
  onValueChange,
}: {
  title: string;
  description?: string;
  disabled: boolean;
  value?: boolean;
  onValueChange: () => void;
}) => {
  return (
    <ButtonRow__Container>
      <ButtonRow__TextPart>
        <ButtonRow__TitleText>{title}</ButtonRow__TitleText>
        {description && (
          <ButtonRow__DescriptionText>{description}</ButtonRow__DescriptionText>
        )}
      </ButtonRow__TextPart>

      <Switch
        // appPush 를 제외한 다른 버튼들은 appPush 가 꺼져있는 경우, 알림 설정을 변경할 수 없으며 값이 false 로 고정됩니다.
        value={disabled ? false : value}
        disabled={disabled}
        onValueChange={onValueChange}
        trackColor={{true: themeColors().blue.main}}
        thumbColor={themeColors().grey.white}
      />
    </ButtonRow__Container>
  );
};

const SectionContainer = styled.View`
  margin-left: ${moderateScale(16)}px;
  margin-right: ${moderateScale(16)}px;
`;

const GreyTextAlarmTitle = styled(H2)`
  font-size: ${moderateScale(16)}px;
  font-weight: 700;
  color: ${({theme}) => theme.color.grey.main};
  margin-top: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(20)}px;
`;

const ButtonRow__Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${moderateScale(6)}px;
  padding-bottom: ${moderateScale(6)}px;
  margin-bottom: ${moderateScale(16)}px;
  //paddingHorizontal: moderateScale(20),
`;

const Splitter = styled.View`
  width: 100%;
  height: ${moderateScale(14)}px;
  background-color: ${({theme}) => theme.color.grey.component};
  margin-top: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const ButtonRow__TextPart = styled.View``;

const ButtonRow__TitleText = styled(H1)`
  font-size: ${moderateScale(18)}px;
  color: ${({theme}) => theme.color.grey.black};
`;

const ButtonRow__DescriptionText = styled(DetailText)`
  color: ${({theme}) => theme.color.grey.main};
  font-size: ${moderateScale(14)}px;
  font-weight: 500;
`;
