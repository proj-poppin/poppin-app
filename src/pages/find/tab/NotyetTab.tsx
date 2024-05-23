import {ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import useGetFindPopupList from '../../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../../components/findPopup/NotList.tsx';

function NotyetTab({type, selectedOrder, availableTags, searchKeyword}: any) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  console.log('sssearch', searchKeyword);

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
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isEndReached && !loadingMore) {
      setLoadingMore(true);

      setPage(page + 1);
    }
  };
  useEffect(() => {
    setPage(0);
    setTriggerFetch(true);
  }, [selectedOrder, availableTags, searchKeyword]);

  useEffect(() => {
    if (triggerFetch) {
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return (
    <ScrollView onScroll={handleScroll} style={{marginBottom: 100}}>
      <DividerLine height={1} />
      {findPopupListData && findPopupListData.length > 0 ? (
        findPopupListData.map((item: any) => {
          return <FindCard type={type} key={item.id} item={item} />;
        })
      ) : (
        <NotList />
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default NotyetTab;
