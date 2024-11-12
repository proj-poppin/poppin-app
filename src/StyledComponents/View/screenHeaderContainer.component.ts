import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/**
 * @deprecated ScreenHeader.component 에서 모두 정의합니다.
 *
 * 화면 헤더 스타일입니다.
 *
 * - flex-direction: row;
 * - align-items: center;
 * - height: ${moderateScale(45)}px; (theme.size.headerHeight)
 * - padding: ${moderateScale(10)}px ${moderateScale(15)}px;
 *
 * @author 도형
 */
export const ScreenHeader__Container = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 100;
  height: ${moderateScale(45)}px;
  background-color: ${({theme}) => theme.color.grey.white};
  padding: ${moderateScale(10)}px ${moderateScale(15)}px;
`;
