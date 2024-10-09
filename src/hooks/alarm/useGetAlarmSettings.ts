import {useEffect, useState} from 'react';
import getAlarmSettings from '../../Axios/alarm/getAlarmSettings.ts';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AlarmSettingsProps {
  pushYn: string;
  pushNightYn: string;
  hoogiYn: string;
  openYn: string;
  magamYn: string;
  changeInfoYn: string;
}

const useGetAlarmSettings = () => {
  const [alarmSettings, setAlarmSettings] = useState<AlarmSettingsProps>({
    pushYn: '0',
    pushNightYn: '0',
    hoogiYn: '0',
    openYn: '0',
    magamYn: '0',
    changeInfoYn: '0',
  });

  useEffect(() => {
    const fetchAlarmSettings = async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('pushToken');
        if (!storedToken) {
          throw new Error('No push token');
        }
        const response = await getAlarmSettings(storedToken);
        if (response.success) {
          setAlarmSettings(response.data);
        }
      } catch (error: any) {
        // console.error('Error fetching alarm settings:', error);
      }
    };
    fetchAlarmSettings();
  }, [
    alarmSettings.pushYn,
    alarmSettings.pushNightYn,
    alarmSettings.hoogiYn,
    alarmSettings.openYn,
    alarmSettings.magamYn,
    alarmSettings.changeInfoYn,
  ]);

  return alarmSettings;
};

export default useGetAlarmSettings;
