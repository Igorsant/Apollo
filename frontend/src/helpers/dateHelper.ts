export const getDayFromDate = (date: Date) => date.getUTCDate();
export const getMonthFromDate = (date: Date) => (date.getMonth() + 1).toString().padStart(2, '0');
export const getYearFromDate = (date: Date) => date.getFullYear();

export const getHoursFromDate = (date: Date) => date.getHours().toString().padStart(2, '0');
export const getMinutesFromDate = (date: Date) => date.getMinutes().toString().padStart(2, '0');
