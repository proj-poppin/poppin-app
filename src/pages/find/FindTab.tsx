import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import useGetFindPopupList from '../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../components/findPopup/NotList.tsx';
import globalColors from '../../styles/color/globalColors.ts';
import DividerLine from '../../components/DividerLine.tsx';
import FindCard from '../../components/findPopup/FindCard.tsx';
import throttle from 'lodash/throttle'; // Correct import for throttle

function FindTab({
  selectedOrder,
  availableTags,
  searchKeyword,
  status,
  showToast,
}: any) {
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const loadingMoreRef = useRef(false);
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
    setPage(0); // Reset page to 0
    setTriggerFetch(true); // Trigger data fetch
  }, []);
  // Handle changes in filter criteria
  useEffect(() => {
    setPage(0); // Reset page to 0
    setTriggerFetch(true); // Trigger data fetch
  }, [selectedOrder, availableTags, searchKeyword]);
  // Handle data fetching
  useEffect(() => {
    if (triggerFetch) {
      refetch();
      setTriggerFetch(false);
      setLoadingMore(false); // Stop loading more data
      loadingMoreRef.current = false;
      if (refreshing) {
        setRefreshing(false);
      }
    }
  }, [triggerFetch, refetch, refreshing]);
  const handleScroll = throttle(
    ({contentOffset, layoutMeasurement, contentSize}) => {
      const isEndReached =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 20; // Add a small threshold to ensure better UX
      if (isEndReached && !loadingMoreRef.current && !findPopupListLoading) {
        loadingMoreRef.current = true; // Prevent multiple simultaneous fetches
        setPage(prevPage => prevPage + 1);
        setLoadingMore(true);

        // Reset loadingMoreRef.current after 1000ms
        setTimeout(() => {
          loadingMoreRef.current = false;
        }, 500);
      }
    },
    1000,
    {leading: true, trailing: true},
  );

  // const handleScroll = throttle(
  //   ({contentOffset, layoutMeasurement, contentSize}) => {
  //     const isEndReached =
  //       contentOffset.y + layoutMeasurement.height >= contentSize.height;
  //     if (isEndReached && !loadingMoreRef.current && !findPopupListLoading) {
  //       setPage(prevPage => prevPage + 1);
  //       setLoadingMore(true);
  //     }
  //   },
  //   1000,
  // );

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
      onScroll={({nativeEvent}) => handleScroll(nativeEvent)}
      style={{marginBottom: 100}}>
      <DividerLine height={1} />
      {findPopupListData.map((item: any, index: number) => (
        <FindCard
          status={status}
          key={`${item.id}-${index}`}
          item={item}
          showToast={showToast}
        />
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
