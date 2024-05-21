import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import FindPopupNoList from '../../../assets/images/findPopupNoList.svg';
import NoListText from '../../../assets/images/findPopupText.svg';
import globalColors from '../../../styles/color/globalColors.ts';
import useGetFindPopupList from '../../../hooks/findPopUp/useGetFindPopupList.tsx';
import NotList from '../../../components/findPopup/NotList.tsx';

function NotyetTab({type, selectedOrder, availableTags, searchKeyword}: any) {
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
        <NotList />
        // <View
        //   style={{
        //     width: '100%',
        //     display: 'flex',
        //     flexDirection: 'column',
        //     alignItems: 'center',
        //     paddingTop: 40,
        //   }}>
        //   <Text style={{fontSize: 20, marginBottom: 20}}>
        //     조건에 해당하는 팝업 이벤트가 없어요😥
        //   </Text>
        //   <FindPopupNoList width="300" height={200} />
        //   <NoListText width={250} height={80} />
        //   <View
        //     style={{
        //       width: '90%',
        //       height: 80,
        //       backgroundColor: globalColors.blue,
        //       borderRadius: 80,
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <Text style={{fontSize: 25, color: 'white'}}>제보하러 가기</Text>
        //   </View>
        // </View>
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default NotyetTab;
