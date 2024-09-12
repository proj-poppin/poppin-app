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

function AlarmSettingScreen({navigation}) {
  const fetchedAlarmSettings = useGetAlarmSettings();
  const [settings, setSettings] = useState<AlarmSettingsProps>({
    pushYn: '0',
    pushNightYn: '0',
    hoogiYn: '0',
    openYn: '0',
    magamYn: '0',
    changeInfoYn: '0',
  });

  const settingsRef = useRef<AlarmSettingsProps>(settings);
  const pushYnRef = useRef<string>('0');

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {},
      requestPermissions: true,
    });
  }, []);

  useEffect(() => {
    if (fetchedAlarmSettings) {
      setSettings(fetchedAlarmSettings);
      settingsRef.current = fetchedAlarmSettings;
      pushYnRef.current = fetchedAlarmSettings.pushYn;
    }
  }, [fetchedAlarmSettings]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
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
        console.log('Error setting alarm settings:', error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const onChange = async (name: string, value: boolean) => {
    let updatedSettings = {...settings, [name]: value ? '1' : '0'};

    // 푸시 알림을 켜거나 끌 때 관련 설정을 업데이트
    if (name === 'pushYn') {
      if (value) {
        // 푸시 알림을 켜면 다른 알림도 모두 켭니다.
        updatedSettings = {
          ...updatedSettings,
          pushNightYn: '1',
          hoogiYn: '1',
          openYn: '1',
          magamYn: '1',
          changeInfoYn: '1',
        };
      } else {
        // 푸시 알림을 끄면 다른 알림도 모두 끕니다.
        updatedSettings = {
          ...updatedSettings,
          pushNightYn: '0',
          hoogiYn: '0',
          openYn: '0',
          magamYn: '0',
          changeInfoYn: '0',
        };
      }
    }

    // 상태 업데이트
    setSettings(updatedSettings);
    settingsRef.current = updatedSettings;
    pushYnRef.current = updatedSettings.pushYn;

    try {
      const storedToken = await EncryptedStorage.getItem('pushToken');
      if (!storedToken) {
        throw new Error('No push token');
      }
      await setAlarmSettings(
        storedToken,
        updatedSettings.pushYn,
        updatedSettings.pushNightYn,
        updatedSettings.hoogiYn,
        updatedSettings.openYn,
        updatedSettings.magamYn,
        updatedSettings.changeInfoYn,
      );
    } catch (error: any) {
      console.log('Error updating alarm settings:', error);
    }
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
export default AlarmSettingScreen;

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
  label: {
    color: globalColors.stroke2,
  },
  testNotificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: globalColors.white,
  },
});
