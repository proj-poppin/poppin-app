import React, {useCallback, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import useGetNoticeAlarmList from '../../../hooks/alarm/useGetNoticeAlarmList';
import AlarmCard from '../../../components/alarm/AlarmCard';

const NoticeTab = () => {
  const {noticeAlarmList, loading, error, refetch} = useGetNoticeAlarmList();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // 새로고침
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);
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

  if (!noticeAlarmList?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>아직 등록된 공지가 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        {noticeAlarmList.map(item => (
          <AlarmCard alarmId={item.id} {...item} type="notice" />
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
