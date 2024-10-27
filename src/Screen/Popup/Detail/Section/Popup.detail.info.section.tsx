import React from 'react';
import styled from 'styled-components/native';
import {moderateScale} from 'src/Util';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {BodyLargeText} from '../../../../StyledComponents/Text/bodyLarge.component';
import {themeColors} from '../../../../Theme/theme';
import {H1, H2} from '../../../../StyledComponents/Text';
import {getAvailableAge} from '../../../../Object/Enum/available.age.enum';

export const PopupDetailInfoSection = () => {
  const {popupDetail} = usePopupDetailContext();

  return (
    <SectionContainer>
      <DetailInfoTitleColorText>상세 정보</DetailInfoTitleColorText>
      <DetailInfoLine
        title="기간"
        content={`${popupDetail.openDate} ~ ${popupDetail.closeDate}`}
        extraMargin
      />
      <DetailInfoLine
        title="운영시간"
        content={`AM ${popupDetail.openTime} - PM ${popupDetail.closeTime}`}
        extraMargin
      />
      <DetailInfoLine
        title="주소"
        content={`${popupDetail.address} ${popupDetail.addressDetail || ''}`}
        extraMargin
      />
      <BlankSpaceContainer />
      <DetailInfoLine title="입장료" content={popupDetail.entranceFee} />
      <DetailInfoLine
        title="이용 가능 연령"
        content={getAvailableAge(popupDetail.availableAge)}
      />
      <DetailInfoLine
        title="주차 안내"
        content={popupDetail.parkingAvailable ? '주차 가능' : '주차 불가능'}
      />
      <DetailInfoLine
        title="예약 안내"
        content={popupDetail.isReservationRequired ? '예약 필수' : '예약 선택'}
      />
    </SectionContainer>
  );
};

const SectionContainer = styled.View`
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
`;

const DetailInfoTitleColorText = styled(BodyLargeText)`
  color: ${({theme}) => themeColors().purple.main};
  font-weight: 600;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(14)}px;
`;

const DetailInfoLine = ({
  title,
  content,
  extraMargin,
}: {
  title: string;
  content: string;
  extraMargin?: boolean;
}) => (
  <ConditionContainer extraMargin={extraMargin}>
    <ConditionTitle
      isHighlighted={['기간', '운영시간', '주소'].includes(title)}>
      {title}
    </ConditionTitle>
    <ConditionSplitter>:</ConditionSplitter>
    <ConditionContent isAddress={title === '주소'}>{content}</ConditionContent>
  </ConditionContainer>
);

const BlankSpaceContainer = styled.View`
  height: ${moderateScale(10)}px;
`;

const ConditionContainer = styled.View<{extraMargin?: boolean}>`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${({extraMargin}) =>
    extraMargin ? moderateScale(12) : moderateScale(6)}px;
`;

const ConditionTitle = styled(H2)<{isHighlighted: boolean}>`
  margin-top: ${({isHighlighted}) => (isHighlighted ? moderateScale(2) : 0)}px;
  font-weight: ${({isHighlighted}) => (isHighlighted ? '700' : 'normal')};
  color: ${({isHighlighted, theme}) =>
    isHighlighted ? theme.color.purple.main : 'black'};
`;

const ConditionSplitter = styled(H1)`
  font-size: ${moderateScale(14)}px;
  margin-horizontal: ${moderateScale(4)}px;
`;

const ConditionContent = styled(H2)<{isAddress?: boolean}>`
  flex: 1;
  flex-wrap: ${({isAddress}) => (isAddress ? 'wrap' : 'nowrap')};
  align-self: flex-start;
`;
