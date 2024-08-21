import { HTMLAttributes } from 'react';
import styles from './CalendarDay.module.css';

interface ICalendarDayProps extends HTMLAttributes<HTMLDivElement> {
  date: Date | null;
  disabled?: boolean;
  startDate: Date | null;
  endDate: Date | null;
  selectedDate: Date | null;
  hoverDate?: Date | null;
  borders: {
    top: boolean;
    left: boolean;
    bottom: boolean;
    right: boolean;
  };
  price?: number;
  isMin?: boolean;
  inactive?: boolean;
  prevInactive?: boolean;
}
const CalendarDay = ({
  date,
  disabled = false,
  startDate,
  endDate,
  selectedDate,
  hoverDate,
  borders,
  price,
  isMin = false,
  inactive = false,
  // prevInactive = true,
  ...props
}: ICalendarDayProps) => {
  const style = getStyles({
    date,
    start: startDate,
    end: endDate,
    selected: selectedDate,
    hover: hoverDate,
  });
  return (
    <div
      {...props}
      style={{
        width: 47,
        height: 51,
        ...(borders.top ? {} : { borderTop: 'none' }),
        ...(borders.left ? {} : { borderLeft: 'none' }),
        ...(borders.bottom ? {} : { borderBottom: 'none' }),
        ...(borders.right ? {} : { borderRight: 'none' }),
        ...props.style,
      }}
      className={[
        styles['container'],
        styles[style],
        disabled ? styles['disabled'] : null,
        isMin ? styles['min'] : null,
        inactive ? styles['inactive'] : null,
      ]
        .filter(it => it !== null)
        .reduce((pr, cur) => `${pr} ${cur}`)}
      onClick={
        !disabled
          ? e => {
              e.preventDefault();
              e.stopPropagation();
              props.onClick?.(e);
            }
          : undefined
      }
    >
      <span className={styles['date']}>
        {date !== null ? date.getDate() : ''}
      </span>
      {!disabled && (
        <span
          className={[styles['price']]
            .filter(it => it?.length)
            .reduce((pr, cur) => `${pr} ${cur}`)}
        >
          {price !== undefined ? groupPrice(`${price}`) + ' ₽' : undefined}
        </span>
      )}
    </div>
  );
};

const groupPrice = (price: string) => {
  const result: string[] = [];
  let i = price.length % 3;
  if (i === 0) i = 3;
  for (; i <= price.length; i += 3)
    result.push(price.slice(i - 3 < 0 ? 0 : i - 3, i));
  return result.length ? result.reduce((pr, cur) => `${pr} ${cur}`) : '';
};

const getStyles = ({
  date,
  start,
  end,
  selected,
  hover,
}: {
  date: Date | null;
  start: Date | null;
  end: Date | null;
  selected: Date | null;
  hover?: Date | null;
}): string => {
  if (date === null) return 'base';
  if (selected !== null) {
    if (hover === null || hover === undefined) {
      if (date.valueOf() === selected.valueOf()) return 'selected';
      return 'base';
    }
    let start: Date | null = null;
    let end: Date | null = null;
    if (hover.valueOf() < selected.valueOf()) {
      start = hover;
      end = selected;
    } else {
      start = selected;
      end = hover;
    }
    const endDate = new Date(end);
    endDate.setDate(end.getDate() + 1);
    if (start.valueOf() <= date.valueOf() && endDate.valueOf() > date.valueOf())
      return 'selected';
    return 'base';
  }
  if (start !== null && end !== null) {
    const endDate = new Date(end);
    endDate.setDate(end.getDate() + 1);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    if (
      start.valueOf() <= date.valueOf() &&
      endDate.valueOf() > date.valueOf()
    ) {
      return 'selected';
    }
    return 'base';
  }
  return 'base';
};

export default CalendarDay;
