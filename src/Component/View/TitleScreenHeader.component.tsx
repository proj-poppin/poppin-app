import React from 'react';
import {ScreenHeader__Container} from 'src/StyledComponents/View';
import {ScreenHeader__TitleText} from 'src/StyledComponents/Text';

/**
 * 제목만 존재하는 스크린 헤더입니다.
 * @author 도형
 */
export const TitleScreenHeader = ({title}: {title: string}) => {
  return (
    <ScreenHeader__Container style={{justifyContent: 'center'}}>
      <ScreenHeader__TitleText>{title}</ScreenHeader__TitleText>
    </ScreenHeader__Container>
  );
};
