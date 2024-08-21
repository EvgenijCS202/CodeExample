import { useAppSelector } from '@/store';
import DateInput from './DateInput';
import { useState } from 'react';
import { useDropDown } from '../../hooks/useDropDown';
import { Colors } from '@/consts';
import DatePickerMobile from './DatePickerMobile';
import DatePickerDesktop from './DatePickerDesktop';

interface IDatesPickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
const DatesPicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: IDatesPickerProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const from = useAppSelector(state => state.paramsStore.from);
  const roomType = useAppSelector(state => state.paramsStore.roomType);
  const [diff, setDiff] = useState(0);
  const { DropDownProvider, DropDown, show, hide, shown } = useDropDown();
  return (
    <DropDownProvider
      style={{
        display: 'block',
        overflowX: 'visible',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: 8,
        }}
      >
        <DateInput
          value={
            startDate?.toLocaleString('ru-ru', {
              day: 'numeric',
              month: 'long',
            }) || ''
          }
          onFocus={() => {
            if (startDate !== null) {
              const curDate = new Date();
              if (curDate.getFullYear() === startDate.getFullYear())
                setDiff(startDate.getMonth() - curDate.getMonth());
              else setDiff(12 + startDate.getMonth() - curDate.getMonth());
            } else setDiff(0);
            show();
          }}
          placeholder="Заезд"
          style={{ backgroundColor: shown ? Colors.white3 : undefined }}
        />
        <DateInput
          value={
            endDate?.toLocaleString('ru-ru', {
              day: 'numeric',
              month: 'long',
            }) || ''
          }
          onFocus={() => {
            show();
          }}
          placeholder="Выезд"
          style={{ backgroundColor: shown ? Colors.white3 : undefined }}
        />
      </div>
      {mobile ? (
        <DropDown
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: Colors.white3,
            marginTop: 0,
            borderRadius: 0,
            display: 'flex',
            padding: 0,
          }}
        >
          <DatePickerMobile
            hide={hide}
            startDate={startDate}
            endDate={endDate}
            onSelect={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
            roomType={
              from === 'accommodation' && roomType !== undefined
                ? roomType
                : undefined
            }
          />
        </DropDown>
      ) : (
        <DropDown
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            width: 720,
            gap: 20,
          }}
        >
          <DatePickerDesktop
            hide={hide}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            diff={diff}
            setDiff={setDiff}
            roomType={
              from === 'accommodation' && roomType !== undefined
                ? roomType
                : undefined
            }
          />
        </DropDown>
      )}
    </DropDownProvider>
  );
};

export default DatesPicker;
