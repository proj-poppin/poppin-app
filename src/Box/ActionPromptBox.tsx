import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {RadiusButtonV2} from 'src/Component/Button/RadiusButton.v2';
import {themeColors} from '../Theme/theme';
import {BodyMediumText} from '../StyledComponents/Text/bodyMedium.component';

type ActionPromptBoxProps = {
  boxType: 'LOGIN' | 'PREFERENCE';
  onPress: () => void;
};

const ActionPromptBox = ({boxType, onPress}: ActionPromptBoxProps) => {
  const isLogin = boxType === 'LOGIN';

  return (
    <Container>
      <StyledText>
        {isLogin
          ? `로그인하고\n팝업 추천을 받아보세요!`
          : `취향 설정하고\n팝업 추천을 받아보세요!`}
      </StyledText>
      <RadiusButtonV2
        style={{
          height: undefined,
          paddingVertical: moderateScale(10),
          paddingHorizontal: moderateScale(24),
          marginBottom: moderateScale(8),
          maxHeight: moderateScale(48),
        }}
        color={'BLUE'}
        priority={'PRIMARY'}
        text={isLogin ? '로그인 하러 가기' : '취향 설정하러 가기'}
        textStyle={{fontSize: moderateScale(14)}}
        onPress={onPress}
      />
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${themeColors().grey.white};
  border-radius: 10px;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  margin: ${moderateScale(12)}px;
  padding-vertical: ${moderateScale(12)}px;
`;

const StyledText = styled(BodyMediumText)`
  text-align: center;
  font-weight: 400;
  line-height: ${moderateScale(20)}px;
  margin-top: ${moderateScale(12)}px;
  margin-bottom: ${moderateScale(16)}px;
`;
export default ActionPromptBox;
