export type OperationStatus = 'NOTYET' | 'OPERATING' | 'TERMINATED';
export type Order = 'OPEN' | 'CLOSE' | 'VIEW' | 'UPLOAD';

export interface TFilterparmas {
  text: string;
  prepered: string;
  page: number;
  oper: OperationStatus;
  order: Order;
  taste: string;
  size: number;
}

export type TFilter = {id: number; name: string; selected: boolean};

export interface Taste {
  fashionBeauty: boolean;
  characters: boolean;
  foodBeverage: boolean;
  webtoonAni: boolean;
  interiorThings: boolean;
  movie: boolean;
  musical: boolean;
  sports: boolean;
  game: boolean;
  itTech: boolean;
  kpop: boolean;
  alcohol: boolean;
  animalPlant: boolean;
  etc: boolean;
}

export interface Preference {
  id: number;
  market: boolean;
  display: boolean;
  experience: boolean;
  wantFree: boolean;
}

export interface PopupItem {
  id: number;
  posterUrl: string;
  name: string;
  address: string;
  viewCnt: number;
  createdAt: string;
  editedAt: string;
  openDate: string;
  closeDate: string;
  operationStatus: OperationStatus;
  isInterested: boolean;
  preference: Preference;
  taste: Taste;
}

export interface PageInfo {
  page: number;
  size: number;
  totalPages: number;
  isLast: boolean;
}

export interface ResponseData {
  items: PopupItem[];
  pageInfo: PageInfo;
}

export interface CommonResponse<T> {
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
  data?: T;
}

export interface GetClosingState {
  loading: boolean;
  error: Error | null;
  data: PopupItem[];
}
