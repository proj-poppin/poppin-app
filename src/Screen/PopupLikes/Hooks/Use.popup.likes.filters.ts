import {useState, useMemo, useEffect} from 'react';
import {usePopupStore} from 'src/Zustand/Popup/popup.zustand';

/**
 * 관심 팝업 필터 관련 상태 및 핸들러
 * @author 희진
 */

export enum OperationStatus {
  NOTYET = 'NOTYET',
  OPERATING = 'OPERATING',
  TERMINATED = 'TERMINATED',
}

export enum SortingOptions {
  OPEN_DATE = 'openDate',
  CLOSE_DATE = 'closeDate',
  INTEREST_DATE = 'interestCreatedAt',
}

export const usePopupLikesFilters = () => {
  const {interestedPopupStores} = usePopupStore();

  const [selectedStatus, setSelectedStatus] = useState<OperationStatus>(
    OperationStatus.OPERATING,
  );
  const [sortingOption, setSortingOption] = useState<SortingOptions>(
    SortingOptions.OPEN_DATE,
  );
  const [isCalendarView, setIsCalendarView] = useState(false);

  const filteredAndSortedPopups = useMemo(() => {
    return (interestedPopupStores || [])
      .filter(popup => popup.operationStatus === selectedStatus)
      .sort((a, b) => {
        if (sortingOption === SortingOptions.INTEREST_DATE) {
          return (
            new Date(b[sortingOption] || 0).getTime() -
            new Date(a[sortingOption] || 0).getTime()
          );
        } else {
          const isAscending = sortingOption === SortingOptions.OPEN_DATE;
          return isAscending
            ? new Date(a[sortingOption]).getTime() -
                new Date(b[sortingOption]).getTime()
            : new Date(b[sortingOption]).getTime() -
                new Date(a[sortingOption]).getTime();
        }
      });
  }, [interestedPopupStores, selectedStatus, sortingOption]);

  useEffect(() => {
    setSelectedStatus(prev => prev);
  }, [selectedStatus]);

  return {
    selectedStatus,
    setSelectedStatus,
    sortingOption,
    setSortingOption,
    isCalendarView,
    setIsCalendarView,
    filteredAndSortedPopups,
  };
};
