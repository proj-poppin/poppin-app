import {CongestionRate} from 'src/Object/Type/congestionRate.type';

export type VisitorDataDetailSchema = {
  congestionRatio: number;
  congestionRate: CongestionRate;
};

export type VisitorDataSchema = {
  weekdayAm: VisitorDataDetailSchema;
  weekdayPm: VisitorDataDetailSchema;
  weekendAm: VisitorDataDetailSchema;
  weekendPm: VisitorDataDetailSchema;
  satisfaction?: number;
};

export const BlankVisitorData: VisitorDataSchema = {
  weekdayAm: {
    congestionRatio: 0,
    congestionRate: CongestionRate.Low,
  },
  weekdayPm: {
    congestionRatio: 0,
    congestionRate: CongestionRate.Low,
  },
  weekendAm: {
    congestionRatio: 0,
    congestionRate: CongestionRate.Low,
  },
  weekendPm: {
    congestionRatio: 0,
    congestionRate: CongestionRate.Low,
  },
  satisfaction: 0,
};
