import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import useGetNoticeAlarmList, {
  AlarmCardInfoProps,
} from '../../../hooks/alarm/useGetNoticeAlarmList';
import AlarmCard from '../../../components/alarm/AlarmCard';

const NoticeTab = () => {
  const {data, error} = useGetNoticeAlarmList();
  const [noticeAlarmList, setNoticeAlarmList] = useState<AlarmCardInfoProps[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setNoticeAlarmList(data);
      setLoading(false);
    }
    if (error) {
      setLoading(false);
    }
  }, [data, error]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching notice alarm list: {error}</Text>
      </View>
    );
  }

  if (!noticeAlarmList.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No alarms found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        {noticeAlarmList.map(item => (
          <AlarmCard key={item.id} {...item} type="notice" />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoticeTab;
