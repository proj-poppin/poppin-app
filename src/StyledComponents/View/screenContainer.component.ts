import styled from 'styled-components/native';

/**
 * 모든 화면에서 사용하는 (예정) 최외곽 View 입니다.
 * 이 Container 안에 WhiteBackgroundScrollView 를 넣어 사용합니다.
 * @author 도형
 */
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.color.grey.white};
`;
