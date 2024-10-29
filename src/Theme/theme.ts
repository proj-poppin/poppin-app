import {CommonThemeColorsType, ThemeColorsType} from '../Object/Type';
/**
 * 모든 테마에 공통으로 적용되는 색상값들
 * @author 도형
 */
// export const theme = {
//   color: themeColors(),
//   size: themeSizes,
// };

const commonThemeColors: CommonThemeColorsType = {
  blue: {
    deep: '#007AFF',
    main: '#0EB5F9',
    mild: '#C3E9F8',
    selected: '#EDFAFF',
    focused: '#0B8FCA',
  },
  purple: {
    main: '#C37CD2',
    mild: '#FAF4FC',
  },
  gradient: {
    purpleBlue: ['#0EB5F9', '#C37CD2'],
  },
  grey: {
    black: '#000000',
    deep: '#70828A',
    main: '#9F9F9F',
    mild: '#DDDDDD',
    icon: '#B8CAD2',
    component: '#F2F4F6',
    white: '#FFFFFF',
  },
  red: {
    warning: '#EF4452',
    mild: '#FAF4FC',
  },
};

/**
 * Light 테마 선택시 사용되는 색상값들
 * !색상을 추가하려면 ThemeColors에 정의를 추가해줘야 합니다.
 * @author 도형
 */
export const lightThemeColors: ThemeColorsType = {
  ...commonThemeColors,
  background: 'white',
};

/**
 * Dark 테마 선택시 사용되는 색상값들
 * !색상을 추가하려면 ThemeColors에 정의를 추가해줘야 합니다.
 * @author 도형
 */
export const darkThemeColors: ThemeColorsType = {
  ...commonThemeColors,
  background: 'black',
};

/**
 * 사용자가 선택한 테마에 따른 테마 색상을 반환합니다.
 * @author 도형
 */
export const themeColors = (
  theme: 'LIGHT' | 'DARK' = 'LIGHT',
): ThemeColorsType => {
  if (theme === 'LIGHT') {
    return lightThemeColors;
  }
  return darkThemeColors;
};
