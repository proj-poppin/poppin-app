import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useGetFindPopupList from '../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../components/findPopup/NotList.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../../components/DividerLine.tsx';
import FindCard from '../../components/findPopup/FindCard.tsx';
function FindTab({selectedOrder, availableTags, searchKeyword, status}: any) {
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: findPopupListData,
    loading: findPopupListLoading,
    refetch,
  } = useGetFindPopupList(
    page,
    size,
    status,
    selectedOrder,
    availableTags,
    searchKeyword,
    triggerFetch,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0); // 페이지를 0으로 초기화
    setTriggerFetch(true); // 데이터 가져오기 트리거
  }, []);

  useEffect(() => {
    setPage(0); // 페이지를 0으로 초기화
    setTriggerFetch(true); // 데이터 가져오기 트리거
  }, [selectedOrder, availableTags, searchKeyword]);

  useEffect(() => {
    if (triggerFetch) {
      refetch();
      setTriggerFetch(false);
      setLoadingMore(false); // 추가 데이터를 로딩하지 않음
      if (refreshing) {
        setRefreshing(false);
      }
    }
  }, [triggerFetch, refetch, refreshing]);

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isEndReached && !loadingMore) {
      setLoadingMore(true);

      setPage(page + 1);
    }
  };

  if (page === 0 && findPopupListData.length === 0 && !findPopupListLoading) {
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
      {findPopupListData.map((item: any, index: number) => (
        <FindCard status={status} key={item.id || index} item={item} />
      ))}
      {findPopupListLoading && (
        <View
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={globalColors.purple} />
        </View>
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default FindTab;
