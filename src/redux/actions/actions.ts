export const TOGGLE_INTEREST = 'TOGGLE_INTEREST';

export const toggleInterest = id => ({
  type: TOGGLE_INTEREST,
  payload: id,
});
