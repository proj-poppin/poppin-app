import {useEffect, useState} from 'react';
import getAlarmSettings from '../../apis/alarm/getAlarmSettings.ts';
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
  const [alarmSettings, setAlarmSettings] = useState<AlarmSettingsProps>();

  useEffect(() => {
    const fetchAlarmSettings = async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('pushToken');
        if (!storedToken) {
          throw new Error('No push token');
        }
        const response = await getAlarmSettings(storedToken);
        setAlarmSettings(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchAlarmSettings().then();
  }, []);

  return alarmSettings;
};

export default useGetAlarmSettings;
