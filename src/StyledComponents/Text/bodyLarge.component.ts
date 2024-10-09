import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/**
 * 상세정보 폰트 스타일입니다. (10px)
 * @author 도형
 */
export const BodyLargeText = styled.Text`
  font-size: ${moderateScale(18)}px;
  font-weight: 500;
  color: #000000;
`;
