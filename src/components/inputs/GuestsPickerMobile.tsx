import { CrossSvg } from '@/assets/icons/cross';
import { Colors, Fonts } from '@/consts';
import NumPicker from './NumPicker';
import SelectInput from './SelectInput';
import Button from '../baseComponents/Button';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { HotelInfo } from '@/interfaces/HotelInfo';

interface IGuestsPickerMobileProps {
  adults: number[];
  childrenAge: number[][];
  setAdults: React.Dispatch<React.SetStateAction<number[]>>;
  setChildrenAge: React.Dispatch<React.SetStateAction<number[][]>>;
  setAdultsInit: React.Dispatch<React.SetStateAction<number[]>>;
  setChildrenAgeInit: React.Dispatch<React.SetStateAction<number[][]>>;
  hide: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.MutableRefObject<number>;
  hotelRoom?: HotelInfo['hotels'][number]['room_types'][number];
}
const GuestsPickerMobile = ({
  adults,
  childrenAge,
  setAdults,
  setChildrenAge,
  hide,
  setAdultsInit,
  setChildrenAgeInit,
  scrollContainerRef,
  scrollRef,
  hotelRoom,
}: IGuestsPickerMobileProps) => {
  const from = useAppSelector(state => state.paramsStore.from);
  const [scroll, setScroll] = useState<number | null>(null);
  useEffect(() => {
    if (scroll === null) {
      scrollContainerRef.current?.scrollTo({ top: scrollRef.current });
    }
    return () => {
      if (scroll !== null) scrollRef.current = scroll;
    };
  }, [scroll, scrollRef, scrollContainerRef]);
  return (
    <div
      ref={scrollContainerRef}
      onScroll={e => setScroll(e.currentTarget.scrollTop)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
        marginTop: 38,
        paddingTop: 20,
        marginBottom: 64,
        overflowY: 'auto',
      }}
      className="scroll-container"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 12,
          paddingInline: 20,
          gap: 32,
        }}
      >
        {adults.map((_, ind) => (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            key={ind}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '16px',
                color: Colors.black2,
              }}
            >
              Номер {ind + 1}
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: Fonts.Manrope,
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: '12px',
                    color: Colors.black2,
                  }}
                >
                  Взрослые
                </span>
                <NumPicker
                  value={adults[ind]}
                  onChange={val => {
                    if (val === 0 && adults.length !== 1)
                      setAdults(adults => [
                        ...adults.slice(0, ind),
                        ...adults.slice(ind + 1),
                      ]);
                    else
                      setAdults(adults => [
                        ...adults.slice(0, ind),
                        val,
                        ...adults.slice(ind + 1),
                      ]);
                  }}
                  style={{ gap: 8, padding: 0, border: 'none' }}
                  textStyle={{ width: 24 }}
                  buttonsStyle={{ width: 24, height: 24 }}
                  min={0}
                />
              </div>
              <div style={{ border: '1px solid ' + Colors.white }} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: Fonts.Manrope,
                    fontWeight: 500,
                    fontSize: 12,
                    lineHeight: '12px',
                    color: Colors.black2,
                  }}
                >
                  Дети младше 12
                </span>
                <NumPicker
                  value={childrenAge[ind].length}
                  onChange={val => {
                    if (val < childrenAge[ind].length)
                      setChildrenAge(childrenAge => [
                        ...childrenAge.slice(0, ind),
                        [...childrenAge[ind].slice(0, -1)],
                        ...childrenAge.slice(ind + 1),
                      ]);
                    else
                      setChildrenAge(childrenAge => [
                        ...childrenAge.slice(0, ind),
                        [...childrenAge[ind], 0],
                        ...childrenAge.slice(ind + 1),
                      ]);
                  }}
                  style={{ gap: 8, padding: 0, border: 'none' }}
                  textStyle={{ width: 24 }}
                  buttonsStyle={{ width: 24, height: 24 }}
                  min={0}
                />
              </div>
              {childrenAge[ind].map((age, ind2) => (
                <SelectInput
                  value={age}
                  style={{ flex: 1 }}
                  options={[
                    { label: 'до 1 года', value: 0 },
                    { label: '1 год', value: 1 },
                    { label: '2 года', value: 2 },
                    { label: '3 года', value: 3 },
                    { label: '4 года', value: 4 },
                    { label: '5 лет', value: 5 },
                    { label: '6 лет', value: 6 },
                    { label: '7 лет', value: 7 },
                    { label: '8 лет', value: 8 },
                    { label: '9 лет', value: 9 },
                    { label: '10 лет', value: 10 },
                    { label: '11 лет', value: 11 },
                    { label: '12 лет', value: 12 },
                  ]}
                  onSelectValue={val =>
                    setChildrenAge(childrenAge => [
                      ...childrenAge.slice(0, ind),
                      [
                        ...childrenAge[ind].slice(0, ind2),
                        val,
                        ...childrenAge[ind].slice(ind2 + 1),
                      ],
                      ...childrenAge.slice(ind + 1),
                    ])
                  }
                  inputStyle={{ paddingBlock: 12 }}
                  key={ind2}
                />
              ))}
            </div>
          </div>
        ))}
        {adults.length < 5 && from === 'form' && (
          <Button
            style={{ backgroundColor: 'rgba(150, 197, 191, 1)' }}
            onClick={() => {
              setAdults(adults => [...adults, 1]);
              setChildrenAge(childrenAge => [...childrenAge, []]);
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: 14,
                lineHeight: '14px',
                color: Colors.green,
              }}
            >
              Добавить еще номер
            </span>
          </Button>
        )}
      </div>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          left: 0,
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
          Выбор гостей
        </span>
        <div style={{ position: 'absolute', top: 12, left: 20 }} onClick={hide}>
          <CrossSvg />
        </div>
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
        }}
      >
        <Button
          onClick={() => {
            setAdultsInit(adults);
            setChildrenAgeInit(childrenAge);
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
            Готово
          </span>
        </Button>
      </div>
    </div>
  );
};

export default GuestsPickerMobile;
