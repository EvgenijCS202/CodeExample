import { CrossSvg } from '@/assets/icons/cross';
import { Colors, Fonts } from '@/consts';
import Button from '../baseComponents/Button';
import { getMonth } from '@/utils/getMonth';
import CalendarDay from '../baseComponents/CalendarDay';
import { useState } from 'react';
import { useAppSelector } from '@/store';

interface IDatePickerMobileProps {
  hide: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (start: Date, endDate: Date) => void;
  roomType?: number;
}
const DatePickerMobile = ({
  hide,
  startDate: startDateInit,
  endDate: endDateInit,
  onSelect,
  roomType,
}: IDatePickerMobileProps) => {
  const calendar = useAppSelector(state => state.paramsStore.calendar);
  const [startDate, setStartDate] = useState(startDateInit);
  const [endDate, setEndDate] = useState(endDateInit);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 12,
          borderBottom: '1px solid ' + Colors.white,
          gap: 20,
        }}
      >
        <div
          style={{
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
          }}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '14px',
              color: Colors.black2,
            }}
          >
            Выбор дат
          </span>
          <div
            style={{ position: 'absolute', top: 12, left: 20 }}
            onClick={hide}
          >
            <CrossSvg />
          </div>
        </div>
        <div
          style={{ paddingInline: 20, display: 'flex', flexDirection: 'row' }}
        >
          <span
            style={{
              flex: 1,
              fontFamily: Fonts.Manrope,
              fontWeight: 600,
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
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
              fontSize: 10,
              lineHeight: '15px',
              textAlign: 'center',
              color: Colors.red,
            }}
          >
            ВС
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 20px 40px 20px',
          gap: 20,
          overflowY: 'auto',
          marginBottom: 64,
        }}
        className="scroll-container"
      >
        {Array(13)
          .fill(null)
          .map((_, mi) => {
            const today = new Date();
            const date = new Date(
              `${today.getFullYear()}/${
                today.getMonth() + 1
              }/${today.getDate()}`,
            );
            date.setMonth(date.getMonth() + mi);
            const monthDays = getMonth(
              date,
              roomType !== undefined
                ? calendar[roomType] !== undefined
                  ? calendar[roomType]
                  : {}
                : calendar.base,
            );
            return (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                key={mi}
              >
                <span
                  style={{
                    fontFamily: Fonts.Manrope,
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: '14px',
                    color: Colors.black2,
                    textTransform: 'capitalize',
                  }}
                >
                  {date
                    .toLocaleString('ru-ru', {
                      month: 'long',
                      year:
                        today.getFullYear() !== date.getFullYear()
                          ? 'numeric'
                          : undefined,
                    })
                    .replace(' г.', '')}
                </span>
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
                        const dt =
                          d !== null
                            ? new Date(
                                `${date.getFullYear()}/${date.getMonth() + 1}/${
                                  d.dNum
                                }`,
                              )
                            : null;
                        const disabled =
                          d === null ||
                          (mi === 0 && d.dNum < today.getDate()) ||
                          (mi === 12 && d.dNum > today.getDate());
                        return (
                          <CalendarDay
                            date={dt}
                            key={i2}
                            style={{
                              width: '100%',
                              ...(d === null
                                ? { border: '1px solid transparent' }
                                : {}),
                            }}
                            price={d?.price}
                            isMin={d?.isMin}
                            inactive={d?.inactive}
                            // prevInactive={d?.prevInactive}
                            borders={{
                              top: i1 !== 0,
                              left: i2 !== 0,
                              bottom: i1 !== monthDays.length - 1,
                              right: i2 !== 6,
                            }}
                            disabled={disabled}
                            startDate={startDate}
                            endDate={endDate}
                            selectedDate={selectedDate}
                            onClick={() => {
                              if (dt === null || disabled) return;
                              if (selectedDate === null) {
                                setSelectedDate(dt);
                              } else {
                                if (dt.valueOf() === selectedDate.valueOf())
                                  return;
                                if (dt.valueOf() < selectedDate.valueOf()) {
                                  setStartDate(dt);
                                  setEndDate(selectedDate);
                                  setSelectedDate(null);
                                }
                                if (dt.valueOf() > selectedDate.valueOf()) {
                                  setStartDate(selectedDate);
                                  setEndDate(dt);
                                  setSelectedDate(null);
                                }
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          padding: '12px 20px',
          backgroundColor: Colors.white,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
        }}
      >
        {startDate !== null && endDate !== null && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 1,
                color: Colors.black2,
              }}
            >
              {`${startDate.toLocaleString('ru-ru', {
                day: 'numeric',
                month: 'short',
              })} — ${endDate.toLocaleString('ru-ru', {
                day: 'numeric',
                month: 'short',
              })}`}
            </span>
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 1,
                color: Colors.brown2,
              }}
            >
              {getNights(startDate, endDate)}
            </span>
          </div>
        )}
        <Button
          onClick={() => {
            if (startDate !== null && endDate !== null) {
              onSelect(startDate, endDate);
            }
            hide();
          }}
          style={{ width: '100%', height: 40 }}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 700,
              fontSize: 14,
              lineHeight: '14px',
              color: '#fff',
              letterSpacing: 'calc(1em / 50)',
            }}
          >
            Выбрать
          </span>
        </Button>
      </div>
    </div>
  );
};

const getNights = (startDate: Date, endDate: Date): string => {
  const nights = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24,
  );
  const lastDigit = nights % 10;
  if (nights % 100 > 10 && nights % 100 < 15) return `${nights} ночей`;
  if (lastDigit === 1) return `${nights} ночь`;
  if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4)
    return `${nights} ночи`;
  return `${nights} ночей`;
};

export default DatePickerMobile;
