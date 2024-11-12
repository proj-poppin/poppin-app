/**
 * 주어진 문자열이 한글로만 이루어져있는지 확인합니다.
 * @author 도형
 */
export const isKorean = (str: string) => {
  return /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(str);
};

/**
 * 주어진 문자열(닉네임)이 2자 이상의 한글/영어/숫자로만 이루어져있는지 확인합니다.
 * @author 도형
 */
export const isValidNickname = (str: string) => {
  return str.length >= 2 && /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9]+$/.test(str);
};

/**
 * 주어진 문자열에서 숫자가 아닌 문자를 제거하고 반환합니다.
 * @author 도형
 */
export const trimNonNumber = (text: string) => {
  return text.replace(/[^0-9]/g, '');
};

/**
 * 주어진 문자열이 유효한 이메일 형식인지 확인합니다.
 * @link https://www.abstractapi.com/guides/email-validation-regex-javascript
 * @author 도형
 */
export const isValidEmail = (str: string) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]+$/.test(str);
};

/**
 * 안드로이드에서 toLocaleString() 이 작동하지 않아, 수동으로 구현한 함수입니다.
 * intl 라이브러리를 사용할 수도 있지만, 유사한 사례가 많아지기 전까진 이렇게 사용합니다.
 * @author 도형
 */
export const toLocaleString = (number?: number) => {
  if (!number) {
    return '0';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 인자로 받은 Object 를 UrlQueryString 로 변환하어 반환합니다.
 * @author 도형
 */
export const getUrlQueryString = (
  param?: Record<string, string | boolean | number>,
) => {
  if (!param) {
    return '';
  }
  const keys = Object.keys(param);
  // 인자로 받은 param 이 빈 객체일 경우 빈 문자열을 반환합니다.
  if (keys.length === 0) {
    return '';
  }
  // 유효한 값이 없는 key 제거
  // key=value 형태의 문자열 생성
  // 사이에 & 로 이어져있는 문자열 생성
  // (맨 앞에 ? 가 있다는 것에 유의합니다)
  return `?${keys
    .filter(key => param[key] !== undefined)
    .map(key => `${key}=${param[key]}`)
    .join('&')}`;
};

export const genderToName = (gender: string) => {
  switch (gender) {
    case 'UNDEFINED':
      return '정의되지 않음';
    case 'MALE':
      return '남성';
    case 'FEMALE':
      return '여성';
    default:
      return '기타';
  }
};

/** 나이대 문자열을 10대, 20대, 30대 ... 70대 이상 형태로 정렬하여 반환합니다 */
export const getSortedAgeGroups = (ageGroups: string[]) => {
  const order = [
    'TEEN',
    'TWENTY',
    'THIRTY',
    'FOURTY',
    'FIFTY',
    'SIXTY',
    'SEVENTY',
  ];
  ageGroups.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  return ageGroups;
};

export const ageGroupToName = (ageGroup: string) => {
  switch (ageGroup) {
    case 'TEEN':
      return '10대';
    case 'TWENTY':
      return '20대';
    case 'THIRTY':
      return '30대';
    case 'FOURTY':
      return '40대';
    case 'FIFTY':
      return '50대';
    case 'SIXTY':
      return '60대';
    case 'SEVENTY':
      return '70대 이상';
    default:
      return '그 외';
  }
};

/**
 * 프로젝트 업로드/수정 시 사용됩니다.
 * 설정한 참여조건을 기반으로 프로젝트 참여 대상 문자열을 생성합니다.
 * @author 도형
 */
export const getDerivedTargetString = (param: {
  useAdvancedTargeting: boolean;
  advancedTarget: string;
  useGenderScreening: boolean;
  targetGenders: string[];
  useAgeScreening: boolean;
  manuallySelectAge: boolean;
  targetMinAge: number;
  targetMaxAge: number;
  targetAgeGroups: string[];
  useKoreanAge: boolean;
}) => {
  const targetString = param.useAdvancedTargeting ? param.advancedTarget : '';

  const ageString = param.useAgeScreening
    ? param.manuallySelectAge
      ? `${param.targetMinAge}세 ~ ${param.targetMaxAge}세`
      : getSortedAgeGroups(param.targetAgeGroups)
          .map(ageGroup => ageGroupToName(ageGroup))
          .join(', ')
    : '';

  const genderString =
    param.useGenderScreening && param.targetGenders.length > 0
      ? genderToName(param.targetGenders[0])
      : '';

  //* 만약 모든 조건이 없다면 '누구나'를 반환합니다.
  if (!targetString && !ageString && !genderString) {
    return '누구나';
  }

  return `${targetString ? `${targetString} ` : ''}${
    ageString ? `${ageString} ` : ''
  }${genderString}`;
};

/**
 * 주어진 url 에서 유튜브 videoId 를 추출합니다.
 * @author 도형
 */
export const getYoutubeVideoId = (url?: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('https://www.youtube.com/watch?v=')) {
    return url.replace('https://www.youtube.com/watch?v=', '').split('&')[0];
  }
  if (url.startsWith('https://youtu.be/')) {
    return url.replace('https://youtu.be/', '').split('?')[0];
  }
  if (url.startsWith('https://youtube.com/shorts/')) {
    return url.replace('https://youtube.com/shorts/', '').split('?')[0];
  }
  return '';
};
