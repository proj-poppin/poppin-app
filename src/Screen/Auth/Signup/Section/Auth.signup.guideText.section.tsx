import React from 'react';
import styled from 'styled-components/native';
import {SectionContainer} from 'src/Unit/View';
import {useSignupContext} from '../Auth.signup.provider';
import {moderateScale} from 'src/Util';
import CircleIndex1Active from 'src/Resource/svg/circle-index-1-active.svg';
import CircleIndex1InActive from 'src/Resource/svg/circle-index-1-inactive.svg';
import CircleIndex2Active from 'src/Resource/svg/circle-index-2-active.svg';
import CircleIndex2InActive from 'src/Resource/svg/circle-index-2-inactive.svg';
import CircleIndex3Active from 'src/Resource/svg/circle-index-3-active.svg';
import CircleIndex3InActive from 'src/Resource/svg/circle-index-3-inactive.svg';

/**
 *
 * @auth 도형
 */
export function SignupGuideTextSection() {
  const {step} = useSignupContext();

  let text = '';
  let Icons;

  if (step === 'EMAIL') {
    text = `POPPIN의 회원이 되어\n맞춤 팝업을 추천받아보세요!`;
    Icons = (
      <>
        <IconWrapper>
          <CircleIndex1Active />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex2InActive />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex3InActive />
        </IconWrapper>
      </>
    );
  } else if (step === 'AUTH_CODE') {
    text = `회원님의 이메일로\n확인 코드를 전송했어요`;
    Icons = (
      <>
        <IconWrapper>
          <CircleIndex1InActive />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex2Active />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex3InActive />
        </IconWrapper>
      </>
    );
  } else if (step === 'NICKNAME') {
    text = 'POPPIN에서\n사용할 정보를 알려주세요';
    Icons = (
      <>
        <IconWrapper>
          <CircleIndex1InActive />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex2InActive />
        </IconWrapper>
        <IconWrapper>
          <CircleIndex3Active />
        </IconWrapper>
      </>
    );
  } else if (step === 'COMPLETE') {
    return null;
  }

  if (!text) {
    return null;
  }

  return (
    <SectionContainer>
      <IconRow>{Icons}</IconRow>
      <TitleText>{text}</TitleText>
    </SectionContainer>
  );
}

const IconRow = styled.View`
  flex-direction: row;
  padding: ${moderateScale(4)}px ${moderateScale(2)}px;
  margin-bottom: ${moderateScale(10)}px;
`;

const IconWrapper = styled.View`
  padding: 0 ${moderateScale(2)}px;
`;

const TitleText = styled.Text`
  color: black;
  font-size: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(4)}px;
  font-weight: 600;
  line-height: ${moderateScale(30)}px;
`;
