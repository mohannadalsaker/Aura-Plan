import dayjs from 'dayjs';
import { DashboardRange } from '../types';

export const getDateRange = (range: DashboardRange) => {
  const now = dayjs();
  let start = dayjs().subtract(7, 'days'); // Default

  switch (range) {
    case DashboardRange.TODAY:
      start = now.startOf('day');
      break;
    case DashboardRange.LAST_7_DAYS:
      start = now.subtract(7, 'days');
      break;
    case DashboardRange.LAST_30_DAYS:
      start = now.subtract(30, 'days');
      break;
    case DashboardRange.THIS_MONTH:
      start = now.startOf('month');
      break;
    case DashboardRange.THIS_YEAR:
      start = now.startOf('year');
      break;
    case DashboardRange.ALL_TIME:
      start = dayjs('2020-01-01'); // Or your app launch date
      break;
  }

  return {
    gte: start.toDate(),
    lte: dayjs().toDate(),
  };
};
