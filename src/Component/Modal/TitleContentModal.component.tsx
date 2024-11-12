import React from 'react';
import styled from 'styled-components/native';
import {ModalContentContainer} from './ModalContentContainer.component';
import {H1, H2, SmallText} from 'src/StyledComponents/Text';
import {moderateScale} from 'src/Util';

/**
 * 제목과 내용이 모두 존재하는 모달 콘텐츠 모듈입니다.
 *
 * 여기서 정의할 수 없는 복잡한 디자인의 모달은
 * ModalContentContainer만 import하여 각 모달마다 따로 디자인합니다.
 * (ex. 프로젝트 끌올 모달, 프로필 작성 유도 모달, 프로젝트 참여 완료 모달 등)
 *
 * @param title 모달 제목
 * @param content 모달 내용
 * @param furtherInfo 버튼 위에 작게 표시할 추가 정보
 * @param head 모달 제목 위에 공간이 존재하는지 여부 (기본값: true)
 * @param headHeight 모달 제목 위에 공간 높이 (기본값: 28)
 * @param alignCenter 제목, 내용 가운데 정렬 여부 (기본값: true)
 * @param buttonSymmetric 확인/취소 버튼 비율 1:1 여부 (기본값: true)
 * @param LeftButton 좌측 버튼 (RadiusButton 사용 권장)
 * @param RightButton 우측 버튼 (Optional) (RadiusButton 사용 권장)
 * @author 도형
 */
export function TitleContentModal({
  title,
  content,
  furtherInfo,
  head = true,
  headHeight = 28,
  alignCenter = true,
  buttonSymmetric = true,
  LeftButton,
  RightButton,
}: {
  title: string;
  content: string;
  furtherInfo?: string;
  head?: boolean;
  headHeight?: number;
  alignCenter?: boolean;
  buttonSymmetric?: boolean;
  LeftButton: JSX.Element;
  RightButton?: JSX.Element;
}) {
  return (
    <ModalContentContainer>
      {head && <Head headHeight={headHeight} />}
      <Title title={title} alignCenter={alignCenter} />
      <Content content={content} alignCenter={alignCenter} />
      {furtherInfo && <FurtherInfo furtherInfo={furtherInfo} />}
      <Buttons
        buttonSymmetric={buttonSymmetric}
        LeftButton={LeftButton}
        RightButton={RightButton}
      />
    </ModalContentContainer>
  );
}

function Title({title, alignCenter}: {title: string; alignCenter?: boolean}) {
  return (
    <Title__Container alignCenter={alignCenter}>
      <Title__Text>{title}</Title__Text>
    </Title__Container>
  );
}

function Content({
  content,
  alignCenter,
}: {
  content: string;
  alignCenter?: boolean;
}) {
  return (
    <Content__Container alignCenter={alignCenter}>
      <Content__Text alignCenter={alignCenter}>{content}</Content__Text>
    </Content__Container>
  );
}

function FurtherInfo({furtherInfo}: {furtherInfo: string}) {
  return (
    <FurtherInfo__Container>
      <FurtherInfo__Text>{furtherInfo}</FurtherInfo__Text>
    </FurtherInfo__Container>
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

// 제목과 상단 padding 조정용 View
const Head = styled.View<{headHeight?: number}>`
  height: ${({headHeight}) => (headHeight ? `${headHeight}px` : '28px')};
`;

// Title()
const Title__Container = styled.View<{alignCenter?: boolean}>`
  flex-direction: row;
  justify-content: ${({alignCenter}) =>
    alignCenter ? 'center' : 'flex-start'};
  padding-left: ${moderateScale(8)}px;
  padding-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(16)}px;
`;

const Title__Text = styled(H1)`
  font-weight: bold;
`;

// Content()
const Content__Container = styled.View<{alignCenter?: boolean}>`
  flex-direction: row;
  justify-content: ${({alignCenter}) =>
    alignCenter ? 'center' : 'flex-start'};
  padding-left: ${moderateScale(8)}px;
  padding-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(28)}px;
`;

const Content__Text = styled(H2)<{alignCenter?: boolean}>`
  color: ${({theme}) => theme.color.grey.main};
  line-height: ${moderateScale(22)}px;
  text-align: ${({alignCenter}) => (alignCenter ? 'center' : 'left')};
`;

// FurtherInfo()
const FurtherInfo__Container = styled.View`
  padding-left: ${moderateScale(8)}px;
  padding-right: ${moderateScale(8)}px;
  margin-bottom: ${moderateScale(8)}px;
`;

const FurtherInfo__Text = styled(SmallText)`
  color: ${({theme}) => theme.color.grey.mild};
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
  width: ${moderateScale(8)}px;
`;
