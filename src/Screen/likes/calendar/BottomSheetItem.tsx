import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import InterestPopUpCard from '../../../components/molecules/card/InterestPopUpCard.tsx';
import {GetInterestPopUpListResponse} from '../../../types/PopUpListData.ts';
import {NavigationProp} from '@react-navigation/native';
import DividerLine from '../../../components/DividerLine.tsx';

type ItemData = {
  item: GetInterestPopUpListResponse;
  navigation: NavigationProp<any>;
  showToast: (message: string) => void;
  isLoggedIn: boolean;
};

const BottomSheetItem: React.FC<ItemData> = ({
  item,
  navigation,
  showToast,
  isLoggedIn,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderWidth: 0,
        marginBottom: 2,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PopUpDetail', {
            id: item.id,
            isLoggedIn: isLoggedIn,
          })
        }>
        <InterestPopUpCard
          image_url={item.image_url}
          name={item.name}
          close_date={item.close_date}
          open_date={item.open_date}
          status={item.status}
          id={item.id}
          showToast={showToast}
        />
      </TouchableOpacity>
      <DividerLine height={2} />
    </View>
  );
};

export default BottomSheetItem;
