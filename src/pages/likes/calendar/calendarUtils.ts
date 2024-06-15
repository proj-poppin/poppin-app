import {DateData} from 'react-native-calendars';
import globalColors from '../../../styles/color/globalColors.ts';
import {MarkedDates} from 'react-native-calendars/src/types';
import {GetInterestPopUpListResponse} from '../../../types/PopUpListData.ts';

/**
 * 현재 날짜를 "YYYY-MM-DD" 형식의 문자열로 반환합니다.
 *
 * @returns {string} 현재 날짜를 "YYYY-MM-DD" 형식으로 반환
 */
export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
  const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.
  return `${year}-${month}-${day}`;
}

/**
 * 주어진 날짜 문자열을 "D일 요일" 형식으로 변환하여 반환합니다.
 *
 * @param dateString (예: 2024-06-05)
 * @returns {string} (예: 5일 수요일)
 */
export function formatDate(dateString: string): string {
  console.log(`여기?아이템들 ${dateString}`);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()]; // 요일을 가져옵니다.
  const day = date.getDate();

  // 일일 월요일 형식으로 변환하여 반환합니다.
  return `${day}일 ${dayOfWeek}요일`;
}

/**
 * 주어진 날짜가 열림 날짜와 닫힘 날짜 사이에 있는지 여부를 확인합니다.
 *
 * @param {string} openDate - 이벤트의 열림 날짜 (예: "2023-06-01")
 * @param {string} closeDate - 이벤트의 닫힘 날짜 (예: "2023-06-30")
 * @param {DateData} selDate - 선택한 날짜를 나타내는 객체
 * @returns {boolean} 선택한 날짜가 열림 날짜 이전이거나 닫힘 날짜 이후이면 true, 그렇지 않으면 false
 */
export function checkIsClosed(
  openDate: string,
  closeDate: string,
  selDate: DateData,
): boolean {
  const open = new Date(openDate);
  const close = new Date(closeDate);
  const selected = new Date(selDate.dateString);
  return selected < open || selected > close;
}

/**
 * 현재 날짜와 시간을 기반으로 DateData 객체를 생성하여 반환합니다.
 *
 * @returns {DateData} 현재 날짜와 시간 정보를 포함하는 DateData 객체
 */
export function createTodayDateData(): DateData {
  const today = new Date(); // 현재 날짜 및 시간을 가져옵니다.

  return {
    dateString: today.toISOString().split('T')[0], // ISO 형식의 문자열로 변환하여 날짜 부분만 추출합니다.
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    timestamp: today.getTime(), // 밀리초 단위의 타임스탬프
  };
}

/**
 * 캘린더에 circle mark 합니다
 */
export function setCircle(
  markedDates: MarkedDates,
  dateWithHyphen: string,
  isToday: boolean = false,
) {
  const markedDate = markedDates[dateWithHyphen] || {};

  markedDate.selected = true;
  markedDate.selectedColor = isToday
    ? globalColors.purpleLight
    : globalColors.purple;
  markedDate.selectedTextColor = isToday
    ? globalColors.black
    : globalColors.white;

  markedDates[dateWithHyphen] = markedDate;
}

export function addDots(
  markedDates: MarkedDates,
  e: GetInterestPopUpListResponse,
) {
  const openMarkDate = markedDates[e.open_date] || {};
  const closeMarkDate = markedDates[e.close_date] || {};

  const openDots: any = openMarkDate.dots;
  if (!openDots) {
    openMarkDate.dots = [{color: globalColors.purple, key: e.name}];
    markedDates[e.open_date] = openMarkDate;
  } else {
    switch (openDots.length) {
      case 1:
        openDots.push({color: globalColors.blue, key: e.name});
        break;
      case 2:
        openDots.push({color: globalColors.purpleLight, key: e.name});
        break;
    }
  }

  const closeDots = closeMarkDate.dots;
  if (!closeDots) {
    closeMarkDate.dots = [{color: globalColors.purple, key: e.name}];
    markedDates[e.close_date] = closeMarkDate;
  } else {
    switch (closeDots.length) {
      case 1:
        closeDots.push({color: globalColors.blue, key: e.name});
        break;
      case 2:
        closeDots.push({color: globalColors.purpleLight, key: e.name});
        break;
    }
  }
}

export function updateDate(date: Date, month: number, day: number): Date {
  date.setMonth(month);
  date.setDate(day);
  return date;
}

export const createDateData = (
  year: number,
  month: number,
  date: number,
): DateData => {
  const dates = new Date(year, month, date);

  return {
    dateString: dates.toISOString().split('T')[0],
    day: dates.getDate(),
    month: dates.getMonth(),
    year: dates.getFullYear(),
    timestamp: dates.getTime(),
  };
};

export const createDate = (year: number, month: number, date: number): Date => {
  return new Date(year, month, date);
};

export const normalCalendarTheme = {
  textDayHeaderFontWeight: '600',
  textMonthFontWeight: '600',
  todayButtonFontWeight: '600',
  textSectionTitleColor: '#b6c1cd',
  arrowColor: globalColors.black,
  selectedDayBackgroundColor: globalColors.purple,
  selectedDayTextColor: globalColors.white,
  todayTextColor: globalColors.black,
  todayBackgroundColor: globalColors.purpleLight,
  textDayFontSize: 16,
  textDayFontWeight: '500',
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: 'red',
    },
    dayTextAtIndex1: {
      color: 'black',
    },
    dayTextAtIndex2: {
      color: 'black',
    },
    dayTextAtIndex3: {
      color: 'black',
    },
    dayTextAtIndex4: {
      color: 'black',
    },
    dayTextAtIndex5: {
      color: 'black',
    },
    dayTextAtIndex6: {
      color: 'black',
    },
  },
};

export const fullCalendarTheme = {
  textDayHeaderFontWeight: '600',
  textMonthFontWeight: '600',
  todayButtonFontWeight: '600',
  'stylesheet.calendar.main': {
    dayContainer: {
      borderColor: '#D1D3D4',
      borderBottomWidth: 1,
      // borderWidth: 1,
      flex: 1,
      paddingTop: 4.7,
    },
    emptyDayContainer: {
      borderColor: '#D1D3D4',
      borderBottomWidth: 1,
      // borderWidth: 1,
      flex: 1,
      paddingTop: 4.7,
    },
    week: {
      marginTop: 0,
      marginBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  'stylesheet.calendar.header': {
    dayTextAtIndex0: {
      color: 'red',
    },
    dayTextAtIndex1: {
      color: 'black',
    },
    dayTextAtIndex2: {
      color: 'black',
    },
    dayTextAtIndex3: {
      color: 'black',
    },
    dayTextAtIndex4: {
      color: 'black',
    },
    dayTextAtIndex5: {
      color: 'black',
    },
    dayTextAtIndex6: {
      color: 'black',
    },
  },
  arrowColor: globalColors.black,
};

export const normalCalendarHeaderStyle = {
  backgroundColor: globalColors.white,
  borderBottomWidth: 1,
  borderBottomColor: globalColors.warmGray,
};
