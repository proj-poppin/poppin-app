import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';

/**
 * @deprecated 더이상 쓸모 없습니다. 아마도요.
 *
 * 스크린 섹션별 헤더의 View 스타일입니다. 기본 패딩과 하단 마진이 포함되어 있습니다.
 * 다음과 같이 활용하면 됩니다:
 *
 * @example
 * import { SectionHeaderTitle, MoreText } from "src/Component/StyledComponents"
 * import { SectionHeaderContainer } from "src/Component/StyledComponents"
 *
 * function SectionHeader(){
 *  return (
 *   <SectionHeaderContainer>
 *     <SectionHeaderTitle title={"최신 프로젝트"}/>
 *     <MoreText color='BLUE' onPress={...}/>
 *   </SectionHeaderContainer>
 *  )
 * }
 *
 * @author 도형
 */
export const SectionHeader__Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${moderateScale(0)}px ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(20)}px;
`;
