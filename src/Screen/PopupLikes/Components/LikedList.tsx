import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {PopupDetailProvider} from '../../Popup/Detail/Provider/Popup.detail.provider';
import PopupStoreCard from 'src/Component/Popup/Landing/PopupStoreCard';
import NotList from './NotList';

interface LikedListListProps {
  popups: PopupSchema[];
  onPressPopup: (id: string) => void;
}

const LikedList: React.FC<LikedListListProps> = ({popups, onPressPopup}) => {
  const renderPopupItem = ({item}: {item: PopupSchema}) => (
    <PopupItemContainer>
      <PopupDetailProvider>
        <PopupStoreCard
          item={item}
          key={item.id}
          onPress={() => onPressPopup(item.id)}
          isInterestPopupCard={true}
        />
      </PopupDetailProvider>
    </PopupItemContainer>
  );

  return (
    <FlatList
      data={popups}
      keyExtractor={(item: PopupSchema) => item.id}
      renderItem={renderPopupItem}
      ListEmptyComponent={<NotList />}
    />
  );
};

export default LikedList;

const PopupItemContainer = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;
