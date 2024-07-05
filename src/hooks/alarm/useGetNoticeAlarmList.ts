import {useEffect, useState} from 'react';
import getNoticeAlarmList from '../../apis/alarm/getNoticeAlarmList.ts';

export interface AlarmCardInfoProps {
  id: number;
  title: string;
  body: string;
  createdAt: number[];
  iconUrl: string;
  isRead: boolean;
}

const useGetNoticeAlarmList = () => {
  const [data, setData] = useState<{
    data: AlarmCardInfoProps[] | null;
    error: string | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchNoticeAlarmList = async () => {
      try {
        const response = await getNoticeAlarmList();
        if (response.success) {
          console.log('Notice alarm list:', response.data);
          setData({data: response.data, error: null});
        } else {
          setData({data: null, error: response.error});
          console.error('Error fetching notice alarm list:', response.error);
        }
      } catch (error: any) {
        setData({data: null, error: error.message});
        console.error('Error fetching notice alarm list:', error);
      }
    };

    fetchNoticeAlarmList();
  }, []);

  return data;
};

export default useGetNoticeAlarmList;
