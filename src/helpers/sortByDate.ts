export const sortByDate = (date1: string, date2: string): number => {
  return new Date(date2).getTime() - new Date(date1).getTime();
};
