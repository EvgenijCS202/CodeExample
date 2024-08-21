import { Colors, Fonts } from '@/consts';
import { CSSProperties, HTMLAttributes, useMemo } from 'react';
import CalendarDay from './CalendarDay';
import { getMonth } from '@/utils/getMonth';
import { useAppSelector } from '@/store';

interface ICalendarMonthProps extends HTMLAttributes<HTMLDivElement> {
  left?: JSX.Element;
  leftStyle?: CSSProperties;
  onLeft?: () => void;
  right?: JSX.Element;
  rightStyle?: CSSProperties;
  onRight?: () => void;
  month: Date;
  diff: number;
  startDate: Date | null;
  endDate: Date | null;
  selectedDate: Date | null;
  hoverDate: Date | null;
  setDate: (
    type: 'start' | 'end' | 'selected' | 'hover',
    date: Date | null,
  ) => void;
  onSelect: () => void;
  roomType?: number;
}
const CalendarMonth = ({
  left,
  leftStyle,
  onLeft,
  right,
  rightStyle,
  onRight,
  month,
  diff,
  startDate,
  endDate,
  selectedDate,
  hoverDate,
  setDate,
  onSelect,
  roomType,
  ...props
}: ICalendarMonthProps) => {
  const calendar = useAppSelector(state => state.paramsStore.calendar);
  const curDay = month.getDate();
  const monthDate = useMemo(() => {
    const monthDate = new Date(month);
    monthDate.setMonth(month.getMonth() + diff);
    return monthDate;
  }, [month, diff]);
  const year = monthDate.getFullYear();
  const monthDays = getMonth(
    monthDate,
    roomType !== undefined
      ? calendar[roomType] !== undefined
        ? calendar[roomType]
        : {}
      : calendar.base,
  );
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        ...props.style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          height: 28,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 600,
            fontSize: 16,
            lineHeight: '16px',
            color: Colors.black2,
            textTransform: 'capitalize',
          }}
        >
          {monthDate
            .toLocaleString('ru-ru', {
              month: 'long',
              year: year !== month.getFullYear() ? 'numeric' : undefined,
            })
            .replace(' г.', '')}
        </span>
        <div
          style={{
            ...leftStyle,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          onClick={onLeft}
        >
          {left}
        </div>
        <div
          style={{
            ...rightStyle,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onClick={onRight}
        >
          {right}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.black,
            }}
          >
            ПН
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.black,
            }}
          >
            ВТ
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.black,
            }}
          >
            СР
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.black,
            }}
          >
            ЧТ
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.black,
            }}
          >
            ПТ
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.red,
            }}
          >
            СБ
          </span>
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 12,
              lineHeight: '18px',
              textAlign: 'center',
              color: Colors.red,
            }}
          >
            ВС
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid ' + Colors.white,
            borderRadius: 8,
          }}
        >
          {monthDays.map((w, i1) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={i1}
            >
              {w.map((d, i2) => {
                const date =
                  d !== null
                    ? new Date(`${year}/${monthDate.getMonth() + 1}/${d.dNum}`)
                    : null;
                const disabled =
                  d === null ||
                  (diff === 0 && d.dNum < curDay) ||
                  (diff === 12 && d.dNum > curDay) ||
                  diff > 12;

                return (
                  <CalendarDay
                    date={date}
                    key={i2}
                    borders={{
                      top: i1 !== 0 && d !== null,
                      left: i2 !== 0 && d !== null,
                      bottom: i1 !== monthDays.length - 1 && d !== null,
                      right: i2 !== 6 && d !== null,
                    }}
                    disabled={disabled}
                    price={d?.price}
                    isMin={d?.isMin}
                    inactive={d?.inactive}
                    // prevInactive={d?.prevInactive}
                    startDate={startDate}
                    endDate={endDate}
                    selectedDate={selectedDate}
                    hoverDate={hoverDate}
                    onClick={() => {
                      if (d === null || disabled) return;
                      if (selectedDate === null) {
                        setDate(
                          'selected',
                          new Date(
                            `${year}/${monthDate.getMonth() + 1}/${d.dNum}`,
                          ),
                        );
                      } else {
                        const date = new Date(
                          `${year}/${monthDate.getMonth() + 1}/${d.dNum}`,
                        );
                        if (date.valueOf() === selectedDate.valueOf()) return;
                        if (date.valueOf() < selectedDate.valueOf()) {
                          setDate('start', date);
                          setDate('end', selectedDate);
                          setDate('selected', null);
                          setDate('hover', null);
                        }
                        if (date.valueOf() > selectedDate.valueOf()) {
                          setDate('start', selectedDate);
                          setDate('end', date);
                          setDate('selected', null);
                          setDate('hover', null);
                        }
                        onSelect();
                      }
                    }}
                    onMouseEnter={() => {
                      if (!d || disabled) return;
                      if (!selectedDate) return;
                      setDate(
                        'hover',
                        new Date(
                          `${year}/${monthDate.getMonth() + 1}/${d.dNum}`,
                        ),
                      );
                    }}
                    onMouseLeave={() => {
                      if (!d || disabled) return;
                      if (!hoverDate) return;
                      setDate('hover', null);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
