import {CongestionRate} from 'src/types/CongestionRate';

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
