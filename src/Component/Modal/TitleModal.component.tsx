import React from 'react';
import styled from 'styled-components/native';
import {ModalContentContainer} from './ModalContentContainer.component';
import {H1} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';

/**
 * 제목만 존재하는 모달 콘텐츠 모듈입니다.
 *
 * @param title 모달 제목
 * @param buttonSymmetric 확인/취소 버튼 비율 1:1 여부 (기본값: true)
 * @param LeftButton 좌측 버튼 (RadiusButton 사용 권장)
 * @param RightButton 우측 버튼 (Optional) (RadiusButton 사용 권장)
 * @author 도형
 */
export function TitleModal({
  title,
  buttonSymmetric = true,
  LeftButton,
  RightButton,
}: {
  title: string;
  buttonSymmetric?: boolean;
  LeftButton: JSX.Element;
  RightButton?: JSX.Element;
}) {
  return (
    <ModalContentContainer>
      <Title title={title} />
      <Buttons
        buttonSymmetric={buttonSymmetric}
        LeftButton={LeftButton}
        RightButton={RightButton}
      />
    </ModalContentContainer>
  );
}

function Title({title}: {title: string}) {
  return (
    <Title__Container>
      <Title__Text>{title}</Title__Text>
    </Title__Container>
  );
}

function Buttons({
  buttonSymmetric,
  LeftButton,
  RightButton,
}: {
  buttonSymmetric: boolean;
  LeftButton: JSX.Element;
  RightButton?: JSX.Element;
}) {
  //* 우측 버튼이 없는 경우 좌측 버튼만 보여줍니다.
  if (!RightButton) {
    return (
      <Buttons__Container>
        <LeftButton__Container buttonSymmetric>
          {LeftButton}
        </LeftButton__Container>
      </Buttons__Container>
    );
  }
  return (
    <Buttons__Container>
      <LeftButton__Container buttonSymmetric={buttonSymmetric}>
        {LeftButton}
      </LeftButton__Container>
      <ButtonSplitter />
      <RightButton__Container buttonSymmetric={buttonSymmetric}>
        {RightButton}
      </RightButton__Container>
    </Buttons__Container>
  );
}

// Title()
const Title__Container = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${moderateScale(30)}px;
  margin-bottom: ${moderateScale(36)}px;
`;

const Title__Text = styled(H1)`
  font-weight: bold;
  text-align: center;
`;

// Buttons()
const Buttons__Container = styled.View`
  flex-direction: row;
`;

const LeftButton__Container = styled.View<{buttonSymmetric: boolean}>`
  flex: ${({buttonSymmetric}) => (buttonSymmetric ? 1 : 3)};
`;
const RightButton__Container = styled.View<{buttonSymmetric: boolean}>`
  flex: ${({buttonSymmetric}) => (buttonSymmetric ? 1 : 8)};
`;

const ButtonSplitter = styled.View`
  width: ${moderateScale(12)}px;
`;
