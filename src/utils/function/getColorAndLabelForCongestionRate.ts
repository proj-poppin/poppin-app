import {CongestionRate} from '../../types/CongestionRate.ts';
import globalColors from '../../styles/color/globalColors.ts';

export const getColorAndLabelForCongestionRate = (
  congestion_rate: CongestionRate,
) => {
  switch (congestion_rate) {
    case CongestionRate.Low:
      return {color: globalColors.blue, label: '여유'};
    case CongestionRate.Medium:
      return {color: globalColors.font, label: '보통'};
    case CongestionRate.High:
      return {color: globalColors.red, label: '혼잡'};
    default:
      return {color: globalColors.component, label: ''};
  }
};
