import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {PopupSchema} from '../../../Schema/Popup/popup.schema';
import PopupStoreCard from '../../../Component/Popup/Landing/PopupStoreCard';
import DividerLine from '../../../Component/DividerLine/DividerLine';

type ItemData = {
  item: PopupSchema;
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
        <PopupStoreCard item={item} />
      </TouchableOpacity>
      <DividerLine height={2} />
    </View>
  );
};

export default BottomSheetItem;
