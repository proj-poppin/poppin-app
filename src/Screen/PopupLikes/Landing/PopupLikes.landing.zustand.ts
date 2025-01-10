import create from 'zustand';
import {PopupSchema} from '../../../Schema/Popup/popup.schema';
import {digitStandizer} from '../../../Util';

type PopupLikesLandingScreenStoreProps = {
  calendarYear: number;
  calendarMonth: number;

  focusedDate: {year: number; month: number; date: number};
  focusedDatePopupStoreList: PopupSchema[] | null;

  calendarCells: {
    year: number;
    month: number;
    date: number;
    dateString: string;
  }[];

  ableToGoBackward: boolean;
  ableToGoForward: boolean;

  moveMonth: (action: 'BACKWARD' | 'FORWARD') => void;
  setFocusedDate: (date: {year: number; month: number; date: number}) => void;
};

export const usePopupLikesLandingScreenStore =
  create<PopupLikesLandingScreenStoreProps>(set => {
    const today = new Date();
    const initialYear = today.getFullYear();
    const initialMonth = today.getMonth() + 1;

    const generateCalendarCells = (year: number, month: number) => {
      const cells: {
        year: number;
        month: number;
        date: number;
        dateString: string;
      }[] = [];

      const prevMonth = new Date(year, month - 1, 1);
      const currMonthLastDate = new Date(year, month, 0).getDate();
      const nextMonth = new Date(year, month, 1);

      // 지난달 날짜 채우기
      while (prevMonth.getDay() !== 0) {
        prevMonth.setDate(prevMonth.getDate() - 1);
        cells.push({
          year: prevMonth.getFullYear(),
          month: prevMonth.getMonth() + 1,
          date: prevMonth.getDate(),
          dateString: `${prevMonth.getFullYear()}-${digitStandizer(
            prevMonth.getMonth() + 1,
          )}-${digitStandizer(prevMonth.getDate())}`,
        });
      }
      cells.reverse();

      // 이번달 날짜 채우기
      for (let i = 1; i <= currMonthLastDate; i++) {
        cells.push({
          year,
          month,
          date: i,
          dateString: `${year}-${digitStandizer(month)}-${digitStandizer(i)}`,
        });
      }

      // 다음달 날짜 채우기
      while (nextMonth.getDay() !== 0 || cells.length < 42) {
        cells.push({
          year: nextMonth.getFullYear(),
          month: nextMonth.getMonth() + 1,
          date: nextMonth.getDate(),
          dateString: `${nextMonth.getFullYear()}-${digitStandizer(
            nextMonth.getMonth() + 1,
          )}-${digitStandizer(nextMonth.getDate())}`,
        });
        nextMonth.setDate(nextMonth.getDate() + 1);
      }

      return cells;
    };

    const isAbleToGoBackward = (year: number, month: number) => {
      return year > 2024 || (year === 2024 && month > 1);
    };

    const isAbleToGoForward = (year: number, month: number) => {
      const today = new Date();
      return (
        year < today.getFullYear() ||
        (year === today.getFullYear() && month < today.getMonth() + 1)
      );
    };

    return {
      calendarYear: initialYear,
      calendarMonth: initialMonth,

      focusedDate: {
        year: initialYear,
        month: initialMonth,
        date: today.getDate(),
      },
      focusedDatePopupStoreList: null,

      calendarCells: generateCalendarCells(initialYear, initialMonth),

      ableToGoBackward: isAbleToGoBackward(initialYear, initialMonth),
      ableToGoForward: isAbleToGoForward(initialYear, initialMonth),

      moveMonth: (action: 'BACKWARD' | 'FORWARD') => {
        set(state => {
          let {calendarYear, calendarMonth} = state;

          if (action === 'BACKWARD') {
            if (calendarMonth > 1) {
              calendarMonth -= 1;
            } else {
              calendarYear -= 1;
              calendarMonth = 12;
            }
          } else {
            if (calendarMonth < 12) {
              calendarMonth += 1;
            } else {
              calendarYear += 1;
              calendarMonth = 1;
            }
          }

          return {
            calendarYear,
            calendarMonth,
            calendarCells: generateCalendarCells(calendarYear, calendarMonth),
            ableToGoBackward: isAbleToGoBackward(calendarYear, calendarMonth),
            ableToGoForward: isAbleToGoForward(calendarYear, calendarMonth),
          };
        });
      },

      setFocusedDate: date => {
        set({focusedDate: date});
      },
    };
  });
