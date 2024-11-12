import {useCallback, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import getAlarmStatus from '../../Axios/alarm/getAlarmStatus.ts';

interface AlarmStatusProps {
  alarmStatus: boolean;
}

const useGetAlarmStatus = () => {
  const [alarmStatus, setAlarmStatus] = useState<AlarmStatusProps>();

  const fetchAlarmStatus = useCallback(async () => {
    try {
      const storedToken = await EncryptedStorage.getItem('pushToken');
      if (!storedToken) {
        throw new Error('No push token');
      }
      const response = await getAlarmStatus(storedToken);
      setAlarmStatus(response.data.alarmStatus);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAlarmStatus().then();
  }, [fetchAlarmStatus]);

  return {alarmStatus, fetchAlarmStatus};
};

export default useGetAlarmStatus;
