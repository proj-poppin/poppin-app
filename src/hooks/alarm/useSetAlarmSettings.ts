import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import setAlarmSettings from '../../apis/alarm/setAlarmSettings.ts';

interface AlarmSettingsProps {
  pushYn: string | undefined;
  pushNightYn: string | undefined;
  hoogiYn: string | undefined;
  openYn: string | undefined;
  magamYn: string | undefined;
  changeInfoYn: string | undefined;
}

const useSetAlarmSettings = (settings: AlarmSettingsProps) => {
  useEffect(() => {
    const updateAlarmSettings = async () => {
      try {
        const storedToken = await EncryptedStorage.getItem('pushToken');
        if (!storedToken) {
          throw new Error('No push token');
        }
        await setAlarmSettings(
          storedToken,
          settings.pushYn,
          settings.pushNightYn,
          settings.hoogiYn,
          settings.openYn,
          settings.magamYn,
          settings.changeInfoYn,
        );
      } catch (error: any) {
        console.error('Error updating alarm settings:', error);
      }
    };

    updateAlarmSettings();
  }, [
    settings.pushYn,
    settings.pushNightYn,
    settings.hoogiYn,
    settings.openYn,
    settings.magamYn,
    settings.changeInfoYn,
  ]);
};

export default useSetAlarmSettings;
