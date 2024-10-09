/**
 * 현재 한국 시간을 ISO 타입으로 반환합니다.
 * @author 도형
 */
export function getCurrentISOTime() {
  // const KOREA_GMT = new Date();
  // KOREA_GMT.setHours(KOREA_GMT.getHours() + 9);
  // return new KOREA_GMT.toISOString();
  return new Date().toISOString();
}

/**
 * 인자로 받은 시간만큼 미래의 시간을 ISO 타입으로 반환합니다.
 * 기준 시간이 주어지지 않으면 현재 시간을 기준으로 합니다.
 * @author 도형
 */
export const getFutureISOTime = (param: {
  time?: string | Date;
  year?: number;
  day?: number;
  hour?: number;
  minute?: number;
}) => {
  const date = param.time ? new Date(param.time) : new Date();
  date.setFullYear(date.getFullYear() + (param.year || 0));
  date.setDate(date.getDate() + (param.day || 0));
  date.setHours(date.getHours() + (param.hour || 0));
  date.setMinutes(date.getMinutes() + (param.minute || 0));
  return date.toISOString();
};

/**
 * 숫자 인자를 받아 두 자리로 변환합니다.
 * @author 도형
 */
export function digitStandizer(num: number) {
  return num < 10 ? `0${num}` : num.toString();
}

/**
 * 숫자 형태의 연, 월, 일을 인자로 받아 Date 로 변환해 반환합니다.
 * 유효한 날짜가 아닌 경우 null 을 반환합니다.
 * @author 도형
 */
export function getDateFromInput(param: {
  year: number;
  month: number;
  day: number;
}) {
  const date = new Date(
    `${param.year.toString()}-${digitStandizer(param.month)}-${digitStandizer(
      param.day,
    )}`,
  );

  if (date instanceof Date && !isNaN(date.getTime())) {
    return date;
  }
  return null;
}

/**
 * 인자로 받은 시간을 '1분이내 / N분 전 / N시간 전' 형태로 반환합니다.
 * 24시간 보다 더 오래된 경우 해당 날짜를 반환합니다.
 * @author 도형
 */
export function getRelativeTimePassed(time: string | Date) {
  const date = new Date(time);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  if (diff < 1000 * 60) {
    return '1분 이내';
  }
  if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  }
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

/**
 * 인자로 받은 시간을 'N일/주/개월/년 전' 형태로 반환합니다.
 * 이 때, 인자로 받은 시간이 오늘인 경우엔 HH:MM 형태를 반환합니다.
 * @author 도형
 */
export function getRelativeDatePassed(time: string | Date) {
  if (isToday(time)) {
    return convertTimeToHHMM(time);
  }
  const dayDiff = getPassedDays(time);
  if (dayDiff < 10) {
    return `${dayDiff}일 전`;
  }
  if (dayDiff < 70) {
    return `${Math.ceil(dayDiff / 7)}주 전`;
  }
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const timeMonth = new Date(time).getMonth() + 1;
  const timeYear = new Date(time).getFullYear();
  const monthDiff = currentMonth - timeMonth + 12 * (currentYear - timeYear);
  if (monthDiff < 12) {
    return `${monthDiff}개월 전`;
  }
  return `${Math.floor(monthDiff / 12)}년 전`;
}

/**
 * 인자로 받은 시간을 HH:MM 형식으로 변환합니다.
 * @author 도형
 */
export function convertTimeToHHMM(time: string | Date) {
  const date = new Date(time);
  return `${digitStandizer(date.getHours())}:${digitStandizer(
    date.getMinutes(),
  )}`;
}

/**
 * 인자로 받은 시간을 MM.DD 형식으로 변환합니다.
 * @author 도형
 */
export function convertTimeToMMDD(time: string | Date) {
  const date = new Date(time);
  const month = digitStandizer(date.getMonth() + 1);
  const day = digitStandizer(date.getDate());
  return `${month}.${day}`;
}

/**
 * 인자로 받은 시간을 MM/DD HH:MM 형식으로 변환합니다.
 * MM DD 사이의 splitter 를 따로 지정할 수도 있습니다.
 * @author 도형
 */
export function convertTimeToMMDDHHMM(
  time: string | Date,
  splitter?: {mmdd?: string},
) {
  const date = new Date(time);
  const month = digitStandizer(date.getMonth() + 1);
  const day = digitStandizer(date.getDate());
  const hour = digitStandizer(date.getHours());
  const minute = digitStandizer(date.getMinutes());
  return `${month}${
    splitter?.mmdd ? splitter.mmdd : '/'
  }${day} ${hour}:${minute}`;
}

/**
 * 인자로 받은 시간을 YYYY. MM. DD 형식으로 변환합니다.
 * @author 도형
 */
export function convertTimeToYYYYMMDD(
  time: string | Date,
  option?: {splitter?: string},
) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = digitStandizer(date.getMonth() + 1);
  const day = digitStandizer(date.getDate());
  return [year, month, day].join(option?.splitter ? option.splitter : '. ');
}

/**
 * 인자로 받은 시간을 YYYY. MM. DD  |  HH:MM 형식으로 변환합니다.
 * @author 도형
 */
export function convertTimeToYYYYMMDDHHMM(time: string | Date) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = digitStandizer(date.getMonth() + 1);
  const day = digitStandizer(date.getDate());
  return `${year}. ${month}. ${day}  |  ${digitStandizer(
    date.getHours(),
  )}:${digitStandizer(date.getMinutes())}`;
}

/**
 * 인자로 받은 시간이 오늘과 같은 날인지 확인합니다.
 * correction 인자가 주어지는 경우, 오늘로 간주할 시간을 조정할 수 있습니다.
 * @author 도형
 */
export function isToday(
  time: string | Date,
  correction?: {hour?: number; minute?: number},
) {
  const correctionMS =
    (correction?.hour ?? 0) * 60 * 60 * 1000 +
    (correction?.minute ?? 0) * 60 * 1000;

  const date = new Date(new Date(time).getTime() + correctionMS);
  const now = new Date(Date.now() + correctionMS);

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * 주어진 date 가 deadline 을 넘겼는지 여부를 반환합니다.
 *  - date 가 주어지지 않은 경우, 현재 시간을 기준으로 deadline 을 넘었는지 판단합니다.
 *  - deadline 이 주어지지 않았거나 빈 문자열인 경우 기본적으로 false 를 반환합니다. (기본 반환값은 바꿀 수 있습니다.)
 *
 * @example
 * const isClosed = didDatePassedDeadline({ deadline: research.deadline });
 *
 * @author 도형
 */
export const didDatePassedDeadline = (param: {
  date?: string | Date;
  deadline?: string | Date;
  defaultValue?: boolean;
  strict?: boolean;
}) => {
  if (param.deadline === undefined || param.deadline === '') {
    return param.defaultValue ?? false;
  }
  const date = param.date !== undefined ? new Date(param.date) : new Date();
  const deadline = new Date(param.deadline);
  return param.strict === true ? deadline < date : deadline <= date;
};

/**
 * @author 승원
 * 주어진 시간을 시, 분, 초로 변환하여 반환합니다.
 *
 */
export const convertTimeToHoursMinutesSeconds = (param: {time: number}) => {
  const hours = Math.floor(param.time / 3600);
  const minutes = Math.floor((param.time % 3600) / 60);
  const seconds = Math.floor((param.time % 3600) % 60);

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};
/**
 * @deprecated didDatePassedDeadline 을 사용하세요.
 * @caution 바꾸기 전에 에러가 없는지 점검해야 합니다.
 *
 * 첫번째 인자로 주어진 시간이 두번째 인자로 주어진 시간보다 앞서있는지 확인합니다.
 * 첫번째 인자가 빈 string 으로 주어지는 경우 false 를 반환하며,
 * 두번째 인자(deadline)가 주어지지 않는 경우 현재 시간을 마감일로 간주합니다.
 *
 * --- 과거 ---- 현재 ------->
 *
 * --- date --- 현재 ---> (true)
 *
 * --- 현재 --- date ---> (false)
 *
 * --- date --- deadline ---> (true)
 *
 * --- deadline --- date ---> (false)
 *
 * @author 도형
 */
export const didDatePassedNew = (param: {
  date?: string | Date;
  deadline?: string | Date;
}) => {
  if (param.date === undefined || param.date === '') {
    return false;
  }
  const date = new Date(param.date);
  const deadline =
    param.deadline && param.deadline !== ''
      ? new Date(param.deadline)
      : new Date();
  return date < deadline;
};

/**
 * @deprecated didDatePassedDeadline 을 사용하세요.
 *
 * 첫번째 인자로 주어진 시간이 두번째 인자로 주어진 시간보다 앞서있는지 확인합니다.
 * 첫번째 인자가 undefined 인 경우 false 를 반환하며,
 * 두번째 인자가 주어지지 않는 경우 현재 시간을 기준으로 확인합니다.
 *
 * @author 도형
 */
export const didDatePassed = (
  time?: string | Date,
  deadline?: string | Date,
) => {
  if (!time) {
    return false;
  }
  const date = new Date(time);
  const now = deadline ? new Date(deadline) : new Date();
  return date < now;
};

/**
 * 주어진 시간이 현재 시간 보다 며칠 앞서 있는지 계산하여 값으로 전달합니다.
 * @author 도형
 */
export function getPassedDays(time: string | Date) {
  if (isToday(time)) {
    return 0;
  }
  return (
    Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000 / 60 / 60 / 24,
    ) + 1
  );
}

/**
 * 주어진 시간이 현재 시간 보다 며칠 뒤에 있는지 계산하여 값으로 전달합니다.
 * @author 원제
 */
export function getRemainedDays(deadline: string | Date) {
  if (isToday(deadline)) {
    return 0;
  }
  const day = Math.floor(
    (new Date(deadline).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24,
  );
  return day === 0 ? 1 : day;
}

/**
 * @ServerSync
 * 인자로 받은 연도에 태어난 사람의 나이를 반환합니다.
 * 두번째 인자를 통하여 한국식 나이를 반환할지 여부를 선택할 수 있습니다.
 * @author 도형
 */
export function getAge(birthday: string | Date, useKoreanAge: boolean = false) {
  const date = new Date(birthday);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDay = now.getDate();

  if (useKoreanAge) {
    return nowYear - year + 1;
  }

  let age = nowYear - year;
  if (nowMonth < month || (nowMonth === month && nowDay < day)) {
    age--;
  }
  return age;
}

// /**
//  * @ServerSync
//  * 첫번째 인자로 받은 날에 태어난 사람의 나이대를 반환합니다.
//  * 두번째 인자를 통해 한국식 나이를 사용할지 여부를 결정할 수 있습니다.
//  * @author 도형
//  */
// export function getAgeGroup(
//   birthday: string | Date,
//   useKoreanAge: boolean = false,
// ) {
//   const age = getAge(birthday, useKoreanAge);
//   switch (true) {
//     case age < 20:
//       return AgeGroup.TEEN;
//     case age < 30:
//       return AgeGroup.TWENTY;
//     case age < 40:
//       return AgeGroup.THIRTY;
//     case age < 50:
//       return AgeGroup.FOURTY;
//     case age < 60:
//       return AgeGroup.FIFTY;
//     case age < 70:
//       return AgeGroup.SIXTY;
//     default:
//       return AgeGroup.SEVENTY;
//   }
// }
