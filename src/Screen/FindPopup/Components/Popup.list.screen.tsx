import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {OperationStatus} from 'src/Object/Type/operationStatus.type';
import {PopupSchema} from 'src/Schema/Popup/popup.schema';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackProps} from 'src/Navigator/App.stack.navigator';
import {SectionContainer} from 'src/Unit/View';
import {themeColors} from 'src/Theme/theme';
import NotList from 'src/Component/findPopup/NotList';
import PopupStoreCard from 'src/Component/Popup/Landing/PopupStoreCard';
import {PopupDetailProvider} from 'src/Screen/Popup/Detail/Provider/Popup.detail.provider';
import styled from 'styled-components/native';
import {usePopupList} from '../Hooks/Use.popup.list';

interface PopupListScreenProps {
  operationStatus: OperationStatus;
}

const PopupListScreen: React.FC<PopupListScreenProps> = ({operationStatus}) => {
  const {searchedPopupStores, isLoading, onEndReached} =
    usePopupList(operationStatus);
  const navigation = useNavigation<NavigationProp<AppStackProps>>();

  if (isLoading && searchedPopupStores.length === 0) {
    return (
      <CenteredContainer>
        <ActivityIndicator size="large" color={themeColors().blue.main} />
      </CenteredContainer>
    );
  }

  const handlePressCard = (id: string) => {
    navigation.navigate('PopupDetailScreen', {popupId: id});
  };

  const renderPopupItem = ({item}: {item: PopupSchema}) => (
    <PopupItemContainer>
      <PopupDetailProvider>
        <PopupStoreCard
          item={item}
          key={item.id}
          onPress={() => handlePressCard(item.id)}
        />
      </PopupDetailProvider>
    </PopupItemContainer>
  );

  if (!isLoading && searchedPopupStores.length === 0) {
    return (
      <SectionContainer fullPage style={{flex: 1}}>
        <NotList />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer fullPage style={{flex: 1}}>
      <FlatList
        data={searchedPopupStores}
        keyExtractor={(item, index) => item.id + index}
        renderItem={renderPopupItem}
        onEndReached={onEndReached}
        ListFooterComponent={
          isLoading && searchedPopupStores.length > 0 ? (
            <FooterContainer>
              <ActivityIndicator size="small" color={themeColors().blue.main} />
            </FooterContainer>
          ) : null
        }
      />
    </SectionContainer>
  );
};

// 개별 운영 상태별 스크린
export const OperatingPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.OPERATING} />
);
export const NotOpenedPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.NOTYET} />
);
export const ClosedPopupScreen: React.FC = () => (
  <PopupListScreen operationStatus={OperationStatus.TERMINATED} />
);

const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const PopupItemContainer = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const FooterContainer = styled.View`
  padding: 20px;
`;

export default PopupListScreen;
