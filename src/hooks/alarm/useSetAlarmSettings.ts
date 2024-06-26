import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import setAlarmSettings from '../../apis/alarm/setAlarmSettings.ts';

interface AlarmSettingsProps {
  pushYn: string;
  pushNightYn: string;
  hoogiYn: string;
  openYn: string;
  magamYn: string;
  changeInfoYn: string;
}

const useSetAlarmSettings = (
  pushYn: string | undefined,
  pushNightYn: string | undefined,
  hoogiYn: string | undefined,
  openYn: string | undefined,
  magamYn: string | undefined,
  changeInfoYn: string | undefined,
) => {
  const [settings, setSettings] = useState<AlarmSettingsProps>();

  useEffect(() => {
    const fetchAlarmSettings = async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('pushToken');
        if (!storedToken) {
          throw new Error('No push token');
        }
        const response = await setAlarmSettings(
          storedToken,
          pushYn,
          pushNightYn,
          hoogiYn,
          openYn,
          magamYn,
          changeInfoYn,
        );
        setSettings(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchAlarmSettings().then();
  }, [changeInfoYn, hoogiYn, magamYn, openYn, pushNightYn, pushYn]);

  return settings;
};

export default useSetAlarmSettings;
