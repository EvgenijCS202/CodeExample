import { CalendarDate } from '@/hooks/useCalendarDates';
import dateToString from './dateToString';

export const getMonth = (
  monthDate: Date,
  calendar: { [date: string]: Omit<CalendarDate, 'date'> },
) => {
  monthDate.setDate(1);
  const date = new Date(monthDate);
  const weekDay = (monthDate.getDay() + 6) % 7;
  monthDate.setMonth(monthDate.getMonth() + 1);
  monthDate.setDate(monthDate.getDate() - 1);
  const lastDay = monthDate.getDate();
  let counter = 0;
  const days: ({
    price?: number;
    isMin?: boolean;
    inactive: boolean;
    prevInactive: boolean;
    dNum: number;
  } | null)[][] = [];
  let prevInactive = true;
  let minPrice = -1;
  while (counter !== lastDay) {
    const w: ({
      price?: number;
      isMin?: boolean;
      inactive: boolean;
      prevInactive: boolean;
      dNum: number;
    } | null)[] = [];
    for (let d = 0; d < 7; ++d) {
      if (counter === 0 && d < weekDay) {
        w.push(null);
        continue;
      }
      if (counter < lastDay) {
        ++counter;
        const found: Omit<CalendarDate, 'date'> | undefined =
          calendar[dateToString(date)];
        if (found !== undefined) {
          if (minPrice === -1 || found.price < minPrice) minPrice = found.price;
          w.push({ dNum: counter, ...found, inactive: false, prevInactive });
          prevInactive = false;
        } else {
          w.push({ dNum: counter, inactive: true, prevInactive });
          prevInactive = true;
        }
        date.setDate(date.getDate() + 1);
        continue;
      }
      w.push(null);
    }
    days.push(w);
  }
  if (minPrice !== -1)
    return days.map(w =>
      w.map(d => (d !== null ? { ...d, isMin: minPrice === d.price } : null)),
    );
  return days;
};
