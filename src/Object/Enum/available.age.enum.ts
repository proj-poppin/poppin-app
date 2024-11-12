export enum AvailableAgeEnum {
  ALL = 'G_RATED',
  SEVEN_PLUS = 'PG_7',
  TWELVE_PLUS = 'PG_12',
  FIFTEEN_PLUS = 'PG_15',
  ADULT = 'PG_18',
}

export const getAvailableAge = (rating: string): string => {
  switch (rating) {
    case 'G_RATED':
      return '전체';
    case 'PG_7':
      return '7세 이상';
    case 'PG_12':
      return '12세 이상';
    case 'PG_15':
      return '15세 이상';
    case 'PG_18':
      return '성인';
    default:
      throw new Error(`Unknown rating: ${rating}`);
  }
};
