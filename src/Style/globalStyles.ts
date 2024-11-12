import {StyleSheet} from 'react-native';
import {moderateScale} from 'src/Util';

/**
 * @deprecated
 * 전역적으로 사용되는 style을 정의합니다. 공통으로 적용되는 style들의 위계는
 * globalStyles -> screenStyles (각 .screen.tsx 파일에서 정의) -> styles (각 섹션별 .tsx 파일에서 정의) 순입니다.
 * @author 도형
 */
export const globalStyles = StyleSheet.create({
  /**
   * 일반적인 스크린들의 좌우 여백. 좌우에 20px 여백을 줍니다.
   * @author 도형
   */
  screen__horizontalPadding: {
    paddingHorizontal: moderateScale(20),
  },

  /**
   * Auth 스크린 좌우 여백. 좌우에 25px 여백을 줍니다.
   * @author 도형
   */
  authScreen__horizontalPadding: {
    paddingHorizontal: moderateScale(25),
  },

  /**
   * 유입경로 조사 페이지 좌우 여백. 좌우에 12px 여백을 줍니다.
   * @author 도형
   */
  funnelScreen__horizontalPadding: {
    paddingHorizontal: moderateScale(12),
  },
});
