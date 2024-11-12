import React from 'react';
import styled from 'styled-components/native';
import {themeColors} from 'src/Theme/theme';
import {deviceWidth, moderateScale} from 'src/Util';
import {BodyLargeText} from 'src/StyledComponents/Text/bodyLarge.component';
import {H3} from 'src/StyledComponents/Text';
import {usePopupDetailContext} from '../Provider/Popup.detail.provider';
import {CongestionRate} from 'src/Object/Type/congestionRate.type';

interface CongestionStatusBadgeProps {
  congestionRatio: number;
  congestionRate: CongestionRate;
}

interface HorizontalBarChartProps {
  congestionRatio: number;
  congestionRate: CongestionRate;
}

// CongestionStatusBadge Component
const CongestionStatusBadge: React.FC<CongestionStatusBadgeProps> = ({
  congestionRatio,
  congestionRate,
}) => {
  const getColorForCongestionRate = (congestionRate: CongestionRate) => {
    switch (congestionRate) {
      case CongestionRate.Low:
        return '#0EB5F9'; // Blue for Low
      case CongestionRate.Medium:
        return '#9F9F9F'; // Gray for Medium
      case CongestionRate.High:
        return '#EF4452'; // Red for High
      default:
        return '#D9D9D9'; // Default color
    }
  };

  const borderColor = getColorForCongestionRate(congestionRate);
  const textColor = getColorForCongestionRate(congestionRate);

  return (
    <BadgeContainer borderColor={borderColor}>
      <RowContainer>
        <Label color={textColor}>{congestionRatio}%</Label>
        <Label color={textColor}>{congestionRate}</Label>
      </RowContainer>
    </BadgeContainer>
  );
};

// HorizontalBarChart Component
const HorizontalBarChart = ({
  congestionRatio,
  congestionRate,
}: HorizontalBarChartProps) => {
  const filledWidth = `${congestionRatio}%`;
  const unfilledWidth = `${100 - congestionRatio}%`;

  const getColorForCongestionRate = (congestionRate: CongestionRate) => {
    switch (congestionRate) {
      case CongestionRate.Low:
        return '#0EB5F9';
      case CongestionRate.Medium:
        return '#D9D9D9';
      case CongestionRate.High:
        return '#EF4452';
      default:
        return '#D9D9D9';
    }
  };

  return (
    <BarContainer>
      <FilledSection
        width={filledWidth}
        backgroundColor={getColorForCongestionRate(congestionRate)}
        isFull={congestionRatio === 100}
      />
      <UnfilledSection width={unfilledWidth} />
    </BarContainer>
  );
};

// ChartRow Component
const ChartRow = ({label, data}: {label: string; data: any}) => (
  <ChartGraphRow>
    <TimeText>{label}</TimeText>
    <ChartAxisBar />
    <HorizontalBarChart
      congestionRatio={data.congestionRatio}
      congestionRate={data.congestionRate}
    />
    <CongestionStatusBadge
      congestionRatio={data.congestionRatio}
      congestionRate={data.congestionRate}
    />
  </ChartGraphRow>
);

export const PopupDetailVisitorSection = () => {
  const {popupDetail} = usePopupDetailContext();

  const {satisfaction, weekdayAm, weekdayPm, weekendAm, weekendPm} =
    popupDetail.visitorData;

  const dayTimeSlots = [
    {
      title: '평일',
      times: [
        {label: '오전', data: weekdayAm},
        {label: '오후', data: weekdayPm},
      ],
    },
    {
      title: '주말',
      times: [
        {label: '오전', data: weekendAm},
        {label: '오후', data: weekendPm},
      ],
    },
  ];

  return (
    <SectionContainer>
      <VisitorDataTitle>방문자 데이터</VisitorDataTitle>
      <GreyRoundContainer>
        {/* 팝업 만족도 */}
        <SectionRow>
          <VisitorInfoTitle>팝업 만족도</VisitorInfoTitle>
          <SatisfactionText>
            방문자의 <HighlightedText>{satisfaction ?? 0}%</HighlightedText>가
            이 팝업에 만족하고 있어요.
          </SatisfactionText>
        </SectionRow>
        {/* 혼잡도 */}
        <SectionRow style={{marginTop: moderateScale(15)}}>
          <VisitorInfoTitle>혼잡도</VisitorInfoTitle>
          <SectionColumn>
            {dayTimeSlots.map(({title, times}) => (
              <SectionColumn key={title}>
                <DayText>{title}</DayText>
                <ReviewChartSection>
                  {times.map(({label, data}) => (
                    <ChartRow key={label} label={label} data={data} />
                  ))}
                </ReviewChartSection>
              </SectionColumn>
            ))}
          </SectionColumn>
        </SectionRow>
      </GreyRoundContainer>
      <DisclaimerText>
        *혼잡도는 팝핀 이용자의 통계 데이터이므로 정확하지 않을 수 있습니다.
      </DisclaimerText>
    </SectionContainer>
  );
};

const VisitorDataTitle = styled(BodyLargeText)`
  color: ${({theme}) => themeColors().purple.main};
  font-weight: 600;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(14)}px;
`;

const BadgeContainer = styled.View<{borderColor: string}>`
  width: ${moderateScale(75)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 5px;
  border-radius: 30px;
  border-width: ${moderateScale(0.7)}px;
  margin-left: ${moderateScale(5)}px;
  background-color: white;
  border-color: ${props => props.borderColor};
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${moderateScale(5)}px;
`;

const Label = styled(H3)<{color: string}>`
  margin-left: ${moderateScale(5)}px;
  color: ${props => props.color};
`;

const BarContainer = styled.View`
  flex-direction: row;
  height: ${moderateScale(7)}px;
  width: ${moderateScale(70)}px;
  margin-right: ${moderateScale(10)}px;
  background-color: ${themeColors().grey.component};
`;

const FilledSection = styled.View<{
  width: string;
  backgroundColor: string;
  isFull: boolean;
}>`
  width: ${props => props.width};
  background-color: ${props => props.backgroundColor};
  height: 100%;
`;

const UnfilledSection = styled.View<{width: string}>`
  width: ${props => props.width};
  background-color: ${themeColors().grey.component};
  height: 100%;
`;

const ChartAxisBar = styled.View`
  width: ${moderateScale(1)}px;
  height: ${moderateScale(35)}px;
  background-color: ${themeColors().grey.mild};
  margin-left: ${moderateScale(10)}px;
`;

const SectionContainer = styled.View`
  padding-horizontal: ${moderateScale(16)}px;
  padding-vertical: ${moderateScale(8)}px;
`;

const GreyRoundContainer = styled.View`
  margin-top: ${moderateScale(10)}px;
  border-color: ${themeColors().grey.component};
  border-width: ${moderateScale(1)}px;
  border-radius: ${moderateScale(15)}px;
  padding: ${moderateScale(20)}px;
`;

const SectionRow = styled.View`
  flex-direction: row;
`;

const SectionColumn = styled.View`
  flex-direction: column;
`;

const ChartGraphRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const VisitorInfoTitle = styled(H3)`
  color: ${({theme}) => themeColors().grey.main};
  margin-right: ${moderateScale(5)}px;
  font-weight: 600;
  width: ${deviceWidth * 0.18}px;
`;

const SatisfactionText = styled(H3)``;

const DayText = styled(H3)`
  font-weight: 600;
  margin-bottom: ${moderateScale(5)}px;
`;

const TimeText = styled(H3)`
  margin-bottom: ${moderateScale(5)}px;
`;

const HighlightedText = styled(H3)`
  font-weight: bold;
`;

const ReviewChartSection = styled.View`
  flex-direction: column;
`;

const DisclaimerText = styled(H3)`
  font-size: ${moderateScale(12)}px;
  color: ${({theme}) => theme.color.grey.main};
  margin-top: ${moderateScale(10)}px;
`;
