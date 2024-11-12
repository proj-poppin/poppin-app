import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import useGetNoticeAlarmList from '../../../hooks/alarm/useGetNoticeAlarmList';
import AlarmCard from '../../../components/alarm/AlarmCard';
import globalColors from '../../../styles/color/globalColors.ts';

const NoticeTab = () => {
  const {noticeAlarmList, loading, error, refetch} = useGetNoticeAlarmList();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(noticeAlarmList);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.purple} />
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
        {noticeAlarmList.map(
          (item, index) => (
            console.log(`중복 키 방지 ${item.id} - ${index}`),
            (
              <AlarmCard
                key={`${item.id}-${index}`}
                alarmId={item.id}
                {...item}
                type="notice"
              />
            )
          ),
        )}
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
