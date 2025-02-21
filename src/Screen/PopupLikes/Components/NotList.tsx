import React from 'react';
import styled from 'styled-components/native';
import Star from 'src/Resource/svg/star-with-bottom-shadow-icon.svg';
import {BodyLargeText} from 'src/StyledComponents/Text/bodyLarge.component';
import {moderateScale} from 'src/Util';

const NotList: React.FC = () => {
  return (
    <EmptyListView>
      <StarContainer>
        <Star />
      </StarContainer>
      <EmptyListMessage>
        {`저장한 팝업이 없어요! 🫤\n관심 있는 팝업을 저장해 보세요.`}
      </EmptyListMessage>
    </EmptyListView>
  );
};

export default NotList;

const EmptyListView = styled.View`
  position: relative;
  flex: 1;
  justify-content: center;
  padding: ${moderateScale(10)}px;
`;

const StarContainer = styled.View`
  position: absolute;
  top: ${moderateScale(152)}px;
  align-self: center;
`;

const EmptyListMessage = styled(BodyLargeText)`
  position: absolute;
  top: ${moderateScale(328)}px;
  text-align: center;
  align-self: center;
  font-size: ${moderateScale(16)}px;
`;
