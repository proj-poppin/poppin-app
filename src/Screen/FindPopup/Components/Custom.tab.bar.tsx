import React from 'react';
import {Pressable} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {usePopupScreenStore} from '../Zustand/Popup.landing.zustand';
import styled from 'styled-components/native';
import GradientButton from 'src/Component/Button/FilterSettingButton';
import {BlankDropdown} from 'src/Component/Dropdown';
import {PopupSortOrder} from 'src/Object/Type/popupSortOrder.type';

interface CustomTabBarProps extends MaterialTopTabBarProps {
  onFilterChange: () => void;
}

const TAB_LABELS = ['운영 중', '오픈 예정', '운영 종료'];

const REVIEW_ORDER_TYPES = [
  {displayName: '최근 오픈 순', value: PopupSortOrder.RECENTLY_OPENED},
  {displayName: '종료 임박 순', value: PopupSortOrder.CLOSING_SOON},
  {displayName: '조회 순', value: PopupSortOrder.MOST_VIEWED},
  {displayName: '최신 업로드 순', value: PopupSortOrder.RECENTLY_UPLOADED},
];

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  onFilterChange,
}) => {
  const {isSetting, setSelectedOrderType} = usePopupScreenStore();

  return (
    <>
      <TabBarContainer>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = TAB_LABELS[index];

          return (
            <TabButton
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              isFocused={isFocused}>
              <TabLabel>{label}</TabLabel>
            </TabButton>
          );
        })}
      </TabBarContainer>
      <FilterContainer>
        <GradientButton
          onPress={onFilterChange}
          isSelected={isSetting}
          selectedButtonName="필터 적용"
          unSelectedButtonName="필터 설정"
          useOptionalNames
        />
        <BlankDropdown
          buttonStyle={{width: 130}}
          data={REVIEW_ORDER_TYPES}
          onSelect={selectedItem => setSelectedOrderType(selectedItem.value)}
        />
      </FilterContainer>
    </>
  );
};

const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: ${({theme}) => theme.color.grey.white};
`;

const TabButton = styled(Pressable)<{isFocused: boolean}>`
  flex: 1;
  align-items: center;
  padding: 10px;
  margin: 0 10px;
  border-bottom-width: 3px;
  border-bottom-color: ${({isFocused, theme}) =>
    isFocused ? theme.color.blue.main : 'transparent'};
`;

const TabLabel = styled.Text`
  color: ${({theme}) => theme.color.grey.black};
`;

const FilterContainer = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.color.grey.white};
`;

export default CustomTabBar;
