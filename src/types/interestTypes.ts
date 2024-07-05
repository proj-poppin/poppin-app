// interestTypes.ts
export interface InterestItem {
  id: number;
  isInterested: boolean;
  // Add any other properties that your interest items have
}

export interface InterestStateType {
  items: InterestItem[];
}
