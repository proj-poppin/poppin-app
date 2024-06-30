import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import SettingSwitch from '../../components/alarm/SettingSwitch';
import globalColors from '../../styles/color/globalColors';
import useGetAlarmSettings from '../../hooks/alarm/useGetAlarmSettings.ts';
import setAlarmSettings from '../../apis/alarm/setAlarmSettings.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import PushNotification from 'react-native-push-notification';
import RightSvg from '../../assets/icons/bigRight.svg';
import text18M from '../../styles/texts/body_large/Text18M.ts';

interface AlarmSettingsProps {
  pushYn: string;
  pushNightYn: string;
  hoogiYn: string;
  openYn: string;
  magamYn: string;
  changeInfoYn: string;
}

function AlaramSettingScreen({navigation}) {
  const fetchedAlarmSettings = useGetAlarmSettings();
  const [settings, setSettings] = useState<AlarmSettingsProps>();
  const settingsRef = useRef<AlarmSettingsProps>();
  const pushYnRef = useRef<string>();

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      requestPermissions: true,
    });
  }, []);

  useEffect(() => {
    if (fetchedAlarmSettings) {
      setSettings(fetchedAlarmSettings);
      settingsRef.current = fetchedAlarmSettings;
    }
  }, [fetchedAlarmSettings]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      const requestApi = async () => {
        try {
          const storedToken = await EncryptedStorage.getItem('pushToken');
          if (!storedToken) {
            throw new Error('No push token');
          }
          if (pushYnRef.current === '0') {
            await setAlarmSettings(storedToken, '0', '0', '0', '0', '0', '0');
          } else {
            await setAlarmSettings(
              storedToken,
              settingsRef.current?.pushYn,
              settingsRef.current?.pushNightYn,
              settingsRef.current?.hoogiYn,
              settingsRef.current?.openYn,
              settingsRef.current?.magamYn,
              settingsRef.current?.changeInfoYn,
            );
          }
        } catch (error: any) {
          console.error(error);
        }
      };
      requestApi().then();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const onChange = (name: string, value: boolean) => {
    console.log(name, value);
    if (name === 'pushYn') {
      pushYnRef.current = value ? '1' : '0';
      console.log(name, value);
    }
    setSettings(prevSettings => {
      const newSettings = {...prevSettings, [name]: value ? '1' : '0'};
      settingsRef.current = newSettings;
      return newSettings;
    });
  };

  const handleTestNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: '테스트 알림',
      message: '테스트 알림이 도착했습니다!',
    });
  };

  if (!settings) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>기본 알림</Text>
        </View>
        <SettingSwitch
          label="푸시 알림"
          name="pushYn"
          isEnable={true}
          isAlarm={settings.pushYn === '1'}
          onChange={onChange}
        />
        <SettingSwitch
          label="야간 푸시 알림(21시~08시)"
          name="pushNightYn"
          isEnable={settings.pushYn === '1'}
          isAlarm={settings.pushNightYn === '1'}
          onChange={onChange}
        />
      </View>
      <View />

      <View style={styles.content}>
        <View>
          <Text style={styles.label}>활동 알림</Text>
        </View>
        <SettingSwitch
          label="도움이 된 후기"
          desc="내가 작성한 후기에 추천이 달리면 알려드려요"
          name="hoogiYn"
          isEnable={settings.pushYn === '1'}
          isAlarm={settings.hoogiYn === '1'}
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 오픈"
          desc="관심 등록한 팝업이 오픈되면 알려드려요"
          name="openYn"
          isEnable={settings.pushYn === '1'}
          isAlarm={settings.openYn === '1'}
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 마감 D-1"
          desc="관심 등록한 팝업 D-1알려드려요"
          name="magamYn"
          isEnable={settings.pushYn === '1'}
          isAlarm={settings.magamYn === '1'}
          onChange={onChange}
        />
        <SettingSwitch
          label="관심 팝업 정보 변경"
          desc="관심 등록한 팝업 정보가 업데이트되면 알려드려요"
          isEnable={settings.pushYn === '1'}
          isAlarm={settings.changeInfoYn === '1'}
          name="changeInfoYn"
          onChange={onChange}
        />
      </View>
      <View />
      <View style={styles.content}>
        <Pressable
          style={styles.testNotificationContainer}
          onPress={handleTestNotification}>
          <Text style={text18M.text}>테스트 알림 보내기</Text>
          <RightSvg />
        </Pressable>
      </View>
    </View>
  );
}

export default AlaramSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    gap: 20,
  },
  content: {
    padding: 15,
    display: 'flex',
    gap: 15,
  },
  // diver: {
  //   width: '100%',
  //   height: 10,
  //   backgroundColor: globalColors.warmGray,
  // },
  label: {
    // color: globalColors.stroke2,
  },
  testNotificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: globalColors.white,
  },
});
