import React from 'react';
import styled from 'styled-components/native';
import {OperationStatus, SortingOptions} from '../PopupLikes.landing.screen';
import {BlankDropdownV2} from './Dropdown/PopupLikes.operatingStatus.DropdownV2.component';
import {PopupLikesSortingDropdownV2} from './Dropdown/PopupLikes.sorting.DropdownV2.component';

interface FilterProps {
  selectedStatus: OperationStatus;
  setSelectedStatus: (status: OperationStatus) => void;
  sortingOption: SortingOptions;
  setSortingOption: (option: SortingOptions) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedStatus,
  setSelectedStatus,
  sortingOption,
  setSortingOption,
}) => {
  return (
    <FiltersContainer>
      <BlankDropdownV2
        data={[
          {displayName: '오픈 예정', value: OperationStatus.NOTYET},
          {displayName: '운영 중', value: OperationStatus.OPERATING},
          {displayName: '운영 종료', value: OperationStatus.TERMINATED},
        ]}
        onSelect={item => setSelectedStatus(item.value)}
        buttonStyle={{width: '40%'}}
      />
      <PopupLikesSortingDropdownV2
        data={[
          {displayName: '오픈일순', value: SortingOptions.OPEN_DATE},
          {displayName: '마감일순', value: SortingOptions.CLOSE_DATE},
          {displayName: '저장순', value: SortingOptions.INTEREST_DATE},
        ]}
        onSelect={item => setSortingOption(item.value)}
        buttonStyle={{width: '23%'}}
      />
    </FiltersContainer>
  );
};

export default Filter;

const FiltersContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
