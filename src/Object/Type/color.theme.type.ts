/**
 * LightTheme, DarkTheme에 상관없이 공통으로 쓰이는 색상 타입
 * @author 도형
 */
export type CommonThemeColorsType = {
  blue: {
    deep: string;
    main: string;
    mild: string;
    selected: string;
    focused: string;
  };

  purple: {
    main: string;
    mild: string;
  };
  // ['#0EB5F9', '#C37CD2'],
  gradient: {
    purpleBlue: string[];
  };

  grey: {
    black: string;
    deep: string;
    main: string;
    mild: string;
    icon: string;
    component: string;
    white: string;
    // black: string;
    // deep: string;
    // icon: string;
    // main: string;
    // mild: string;
    // white: string;
    // focused: string;
    // unfocused: string;
    // unselected: string;
    // inactive: string;
  };

  red: {
    warning: string;
    mild: string;
  };
};

/**
 * LightTheme/DarkTheme에 따라 색상값에 차이가 나는 색상 타입.
 * 위에서 정의한 DefaultThemeColors를 확장합니다.
 * @types/styled-components.d.ts 에서 import하여 사용합니다.
 * @author 도형
 */
export type ThemeColorsType = CommonThemeColorsType & {
  background: string;
};
