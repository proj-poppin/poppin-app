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
import throttle from 'lodash/throttle';
import {
  PopupItem,
  Order,
  OperationStatus,
  TFilter,
} from '../../types/FindPopupType.ts'; // Correct import for throttle

interface FindTabProps {
  selectedOrder: Order;
  availableTags: TFilter[];
  searchKeyword: string;
  status: OperationStatus;
  showToast: (message: string) => void;
}

function FindTab({
  selectedOrder,
  availableTags,
  searchKeyword,
  status,
  showToast,
}: FindTabProps) {
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const loadingMoreRef = useRef(false);
  const {
    data: findPopupListData = [],
    loading: findPopupListLoading,
    refetch,
    isLastPage,
  } = useGetFindPopupList(
    page,
    size,
    status,
    selectedOrder,
    availableTags,
    searchKeyword,
    triggerFetch,
  );

  // 새로고침
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0); // Reset page to 0
    setTriggerFetch(true); // Trigger data fetch
  }, []);

  // 첫 로딩
  useEffect(() => {
    setPage(0); // Reset page to 0
    setTriggerFetch(true); // Trigger data fetch
  }, [selectedOrder, availableTags, searchKeyword]);

  // 추가 데이터 로딩
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

  // 무한 스크롤
  const handleScroll = throttle(
    ({contentOffset, layoutMeasurement, contentSize}) => {
      const isEndReached =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 20; // Add a small threshold to ensure better UX
      if (
        isEndReached &&
        !loadingMoreRef.current &&
        !findPopupListLoading &&
        !isLastPage
      ) {
        loadingMoreRef.current = true; // Prevent multiple simultaneous fetches
        setPage(prevPage => prevPage + 1);
        setLoadingMore(true);
        setTimeout(() => {
          loadingMoreRef.current = false;
        }, 500);
      }
    },
    1000,
    {leading: true, trailing: true},
  );

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
      {findPopupListData?.map((item: PopupItem, index: number) => (
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
