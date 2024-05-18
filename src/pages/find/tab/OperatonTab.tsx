import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import FindPopupNoList from '../../../assets/images/findPopupNoList.svg';
import NoListText from '../../../assets/images/findPopupText.svg';
import globalColors from '../../../styles/color/globalColors.ts';
import useGetFindPopupList from '../../../hooks/findpopup/useGetFindPopupList.tsx';
import NoList from '../../../components/findPopup/NoList.tsx';

function OperationTab({
  type,
  selectedOrder,
  availableTags,
  searchKeyword,
}: any) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data: findPopupListData,
    loading: findPopupListLoading,
    error: findPopupListError,
  } = useGetFindPopupList(
    page,
    size,
    'OPERATING',
    selectedOrder,
    availableTags,
    searchKeyword,
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

  return (
    <ScrollView onScroll={handleScroll} style={{marginBottom: 100}}>
      <DividerLine height={1} />
      {findPopupListData && findPopupListData.length > 0 ? (
        findPopupListData.map((item: any) => {
          return <FindCard type={type} key={item.id} item={item} />;
        })
      ) : (
        <NoList />
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
