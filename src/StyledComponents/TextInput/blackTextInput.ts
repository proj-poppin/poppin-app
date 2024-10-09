import styled from 'styled-components/native';

/**
 * @deprecated
 * BaseTextInput.component 와 해당 컴포넌트의 파생형을 사용하세요
 *
 * 입력값을 검은색으로 보여주는 TextInput 입니다.
 * dark theme 를 사용 중인 일부 안드로이드 기기에서
 * 글씨가 흰색으로 나오는 문제가 있어 모든 TextInput 은 이 컴포넌트를 상속하도록 해야 합니다.
 * + RoundTextInput.component 도 함께 바꿉니다
 * @author 도형
 */
export const BlackTextInput = styled.TextInput`
  color: ${({theme}) => theme.color.grey.black};
`;
