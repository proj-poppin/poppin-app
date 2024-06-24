import React, {useEffect, useState} from 'react';
import {ScrollView, ActivityIndicator, View} from 'react-native';
import DividerLine from '../../../components/DividerLine.tsx';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import useGetFindPopupList from '../../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../../components/findPopup/NotList.tsx';
import globalColors from '../../../styles/color/globalColors.ts'; // Ensure you import the right path

function NotyetTab({type, selectedOrder, availableTags, searchKeyword}: any) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const {
    data: findPopupListData,
    loading: findPopupListLoading,
    error: findPopupListError,
  } = useGetFindPopupList(
    page,
    size,
    'NOTYET',
    selectedOrder,
    availableTags,
    searchKeyword,
    triggerFetch,
  );

  const handleScroll = (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isEndReached && !loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      setTriggerFetch(true);
    }
  };

  useEffect(() => {
    setPage(0);
    setTriggerFetch(true);
  }, [selectedOrder, availableTags, searchKeyword]);

  useEffect(() => {
    if (!findPopupListLoading) {
      setLoadingMore(false);
      if (triggerFetch) {
        setTriggerFetch(false);
      }
    }
  }, [findPopupListLoading, triggerFetch]);

  if (findPopupListLoading && page === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={globalColors.purple} />
      </View>
    );
  }

  if (findPopupListData.length === 0 && !findPopupListLoading) {
    return <NotList />;
  }

  return (
    <ScrollView onScroll={handleScroll} style={{marginBottom: 100}}>
      <DividerLine height={1} />
      {findPopupListData.map((item: any) => (
        <FindCard type={type} key={item.id} item={item} />
      ))}
      {loadingMore && (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color={globalColors.blue} />
        </View>
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

const styles = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMore: {
    paddingVertical: 20,
  },
};

export default NotyetTab;
