import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import DividerLine from '../../../components/DividerLine.tsx';
import {dummydata} from '../../../components/findPopup/dummydata.ts';
import FindCard from '../../../components/findPopup/FindCard.tsx';
import FindPopupNoList from '../../../assets/images/findPopupNoList.svg';
import NoListText from '../../../assets/images/findPopupText.svg';
import globalColors from '../../../styles/color/globalColors.ts';
import useGetFindPopupList from '../../../hooks/findpopup/useGetFindPopupList.tsx';

function OperationTab({
  type,
  selectedOrder,
  availableTags,
  searchKeyword,
}: any) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  console.log('sss', selectedOrder);

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
  console.log('fin', findPopupListData);

  return (
    <ScrollView>
      <DividerLine height={1} />
      {findPopupListData && findPopupListData.length > 0 ? (
        findPopupListData.map((item: any) => {
          return <FindCard type={type} key={item.id} item={item} />;
        })
      ) : (
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 70,
          }}>
          <Text style={{fontSize: 20, marginBottom: 20}}>
            조건에 해당하는 팝업 이벤트가 없어요😥 오퍼
          </Text>
          <FindPopupNoList width="300" height={200} />
          <NoListText width={250} height={80} />
          <View
            style={{
              width: '90%',
              height: 80,
              backgroundColor: globalColors.blue,
              borderRadius: 80,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, color: 'white'}}>제보하러 가기</Text>
          </View>
        </View>
      )}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default OperationTab;
