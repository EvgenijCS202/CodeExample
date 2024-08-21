import { useAppSelector } from '@/store';
import Input from './Input';
import DownArrowIcon from '@/assets/icons/downArrow.svg';
import { createRef, useMemo, useRef, useState } from 'react';
import { useDropDown } from '../../hooks/useDropDown';
import inpStyles from '@/components/inputs/Input.module.css';
import { Colors } from '@/consts';
import GuestsPickerMobile from './GuestsPickerMobile';
import GuestsPickerDesktop from './GuestsPickerDesktop';
import { HotelInfo } from '@/interfaces/HotelInfo';

interface IGuestsPickerProps {
  adults: number[];
  childrenAge: number[][];
  setAdults: React.Dispatch<React.SetStateAction<number[]>>;
  setChildrenAge: React.Dispatch<React.SetStateAction<number[][]>>;
  hotelRoom?: HotelInfo['hotels'][number]['room_types'][number];
}
const GuestsPicker = ({
  adults: adultsInit,
  childrenAge: childrenAgeInit,
  setAdults: setAdultsInit,
  setChildrenAge: setChildrenAgeInit,
  hotelRoom,
}: IGuestsPickerProps) => {
  const [adults, setAdults] = useState([...adultsInit]);
  const [childrenAge, setChildrenAge] = useState([...childrenAgeInit]);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const { DropDown, DropDownProvider, show, hide, shown } = useDropDown();
  const scrollContainerRef = useMemo(() => createRef<HTMLDivElement>(), []);
  const scrollRef = useRef<number>(0);
  return (
    <DropDownProvider
      style={{
        width: mobile ? '100%' : 'calc((100% - 192px - 160px) / 3',
        position: mobile ? 'static' : 'relative',
      }}
    >
      <Input
        value={formatValue(adultsInit, childrenAgeInit)}
        placeholder="Количество гостей"
        width="100%"
        icon={
          <img
            src={DownArrowIcon}
            alt="darr svg"
            className={shown ? inpStyles['rotate'] : ''}
          />
        }
        readonly
        onFocus={() => {
          setAdults(adultsInit);
          setChildrenAge(childrenAgeInit);
          show();
        }}
        style={{ backgroundColor: shown ? Colors.white3 : undefined }}
      />
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
          <GuestsPickerMobile
            adults={adults}
            childrenAge={childrenAge}
            setAdults={setAdults}
            setChildrenAge={setChildrenAge}
            hide={hide}
            setAdultsInit={setAdultsInit}
            setChildrenAgeInit={setChildrenAgeInit}
            scrollContainerRef={scrollContainerRef}
            scrollRef={scrollRef}
            hotelRoom={hotelRoom}
          />
        </DropDown>
      ) : (
        <DropDown
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxHeight: 365,
            paddingInline: 4,
          }}
        >
          <GuestsPickerDesktop
            adults={adults}
            childrenAge={childrenAge}
            setAdults={setAdults}
            setChildrenAge={setChildrenAge}
            hide={hide}
            setAdultsInit={setAdultsInit}
            setChildrenAgeInit={setChildrenAgeInit}
            scrollContainerRef={scrollContainerRef}
            scrollRef={scrollRef}
            hotelRoom={hotelRoom}
          />
        </DropDown>
      )}
    </DropDownProvider>
  );
};

const formatValue = (adults: number[], childrenAge: number[][]) => {
  if (!adults.length) return '';
  const adultsNum = adults.reduce((pr, cur) => pr + cur);
  if (adultsNum === 0) return '';
  const childrenNum = childrenAge
    .map(it => it.length)
    .reduce((pr, cur) => pr + cur);
  return (
    `${adultsNum}` +
    ' взрослы' +
    `${adultsNum === 1 ? 'й' : 'х'}` +
    (childrenNum !== 0
      ? `, ${childrenNum} ${childrenNum === 1 ? 'ребенок' : 'детей'}`
      : '')
  );
};

export default GuestsPicker;
