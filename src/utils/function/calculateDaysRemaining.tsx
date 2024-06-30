const getToday = (): Date => {
  return new Date();
};
export const calculateDaysRemaining = (date: string): number => {
  const today = getToday();
  const targetDate = new Date(date);
  const timeDiff = targetDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};
