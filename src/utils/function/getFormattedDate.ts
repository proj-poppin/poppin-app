export const getFormattedDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayDate = () => {
  const today = new Date();
  return getFormattedDate(today);
};

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return getFormattedDate(tomorrow);
};
