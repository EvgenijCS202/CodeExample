import { ChevronLeftSvg } from '@/assets/icons/chevron_left';
import CalendarMonth from '../baseComponents/CalendarMonth';
import { useMemo, useState } from 'react';
import { Colors } from '@/consts';

interface IDatePickerDesktopProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  diff: number;
  setDiff: React.Dispatch<React.SetStateAction<number>>;
  hide?: () => void;
  roomType?: number;
}
const DatePickerDesktop = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  diff,
  setDiff,
  hide,
  roomType,
}: IDatePickerDesktopProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const month = useMemo(() => new Date(), []);

  return (
    <>
      <CalendarMonth
        style={{
          width: 330,
        }}
        roomType={roomType}
        month={month}
        diff={diff}
        left={
          <ChevronLeftSvg
            style={{
              stroke: diff === 0 ? Colors.white : Colors.green,
              width: 28,
              height: 28,
            }}
          />
        }
        leftStyle={{
          cursor: diff === 0 ? 'not-allowed' : 'pointer',
        }}
        onLeft={diff > 0 ? () => setDiff(diff => diff - 1) : undefined}
        startDate={startDate}
        endDate={endDate}
        selectedDate={selectedDate}
        hoverDate={hoverDate}
        setDate={(type, date) => {
          if (type === 'start') {
            setStartDate(date);
            return;
          }
          if (type === 'end') {
            setEndDate(date);
            return;
          }
          if (type === 'selected') {
            setSelectedDate(date);
            return;
          }
          if (type === 'hover') {
            setHoverDate(date);
            return;
          }
        }}
        onSelect={hide || (() => {})}
      />
      <CalendarMonth
        style={{
          width: 330,
        }}
        roomType={roomType}
        month={month}
        diff={diff + 1}
        right={
          <ChevronLeftSvg
            style={{
              stroke: diff === 12 ? Colors.white : Colors.green,
              width: 28,
              height: 28,
              transform: 'rotate(180deg)',
            }}
          />
        }
        rightStyle={{ cursor: diff === 12 ? 'not-allowed' : 'pointer' }}
        onRight={diff < 12 ? () => setDiff(diff => diff + 1) : undefined}
        startDate={startDate}
        endDate={endDate}
        selectedDate={selectedDate}
        hoverDate={hoverDate}
        setDate={(type, date) => {
          if (type === 'start') {
            setStartDate(date);
            return;
          }
          if (type === 'end') {
            setEndDate(date);
            return;
          }
          if (type === 'selected') {
            setSelectedDate(date);
            return;
          }
          if (type === 'hover') {
            setHoverDate(date);
            return;
          }
        }}
        onSelect={hide || (() => {})}
      />
    </>
  );
};

export default DatePickerDesktop;
