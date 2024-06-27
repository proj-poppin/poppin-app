import React from 'react';
import {View} from 'react-native';
import useGetNoticeAlarmList from '../../../hooks/alarm/useGetNoticeAlarmList.ts';
import AlarmCard from '../../../components/alarm/AlarmCard.tsx';
import {ScrollView} from 'react-native-gesture-handler';

const NoticeTab = () => {
  const noticeAlarmList = useGetNoticeAlarmList();

  return (
    <ScrollView>
      <View>
        {noticeAlarmList.map(item => {
          return <AlarmCard props={item} type="notice" />;
        })}
      </View>
    </ScrollView>
  );
};

export default NoticeTab;
