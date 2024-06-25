import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import useGetFindPopupList from '../../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../../components/findPopup/NotList.tsx';
import globalColors from '../../../styles/color/globalColors.ts';

function OperationTab({
  type,
  selectedOrder,
  availableTags,
  searchKeyword,
}: any) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: findPopupListData,
    loading: findPopupListLoading,
    error: findPopupListError,
    refetch,
  } = useGetFindPopupList(
    page,
    size,
    'OPERATING',
    selectedOrder,
    availableTags,
    searchKeyword,
    triggerFetch,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    const isStartReached = contentOffset.y <= 0;

    if (isEndReached && !loadingMore) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
    }

    if (isStartReached && page > 0) {
      setPage(0);
      setTriggerFetch(true);
    }
  };

  useEffect(() => {
    setPage(0);
    setTriggerFetch(true);
  }, [selectedOrder, availableTags, searchKeyword]);

  if (findPopupListData.length === 0 && !findPopupListLoading) {
    return <NotList />;
  } else if (findPopupListLoading && page === 0) {
    return (
      <View>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      scrollEventThrottle={16}
      onScroll={handleScroll}
      style={{marginBottom: 100}}>
      <DividerLine height={1} />
      {findPopupListData && findPopupListData.length > 0 ? (
        findPopupListData.map((item: any, index: number) => (
          <FindCard type={type} key={item.id || index} item={item} />
        ))
      ) : (
        <NotList />
      )}
      {findPopupListLoading && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>데이터를 불러오고 있습니다.</Text>
        </View>
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default OperationTab;
