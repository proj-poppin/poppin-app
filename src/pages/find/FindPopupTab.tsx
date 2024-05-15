import {ScrollView} from 'react-native';
import React from 'react';
import DividerLine from '../../components/DividerLine.tsx';
import {dummydata} from '../../components/findPopup/dummydata.ts';
import FindCard from '../../components/findPopup/FindCard.tsx';

function FindPopupTab({type}: any) {
  return (
    <ScrollView>
      <DividerLine height={1} />
      {dummydata.map(item => {
        return <FindCard type={type} key={item.id} item={item} />;
      })}
      <DividerLine height={1} />
    </ScrollView>
  );
}

export default FindPopupTab;
