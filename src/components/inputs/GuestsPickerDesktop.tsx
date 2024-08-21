import { Colors, Fonts } from '@/consts';
import { Fragment } from 'react/jsx-runtime';
import NumPicker from './NumPicker';
import SelectInput from './SelectInput';
import Button from '../baseComponents/Button';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store';
import { HotelInfo } from '@/interfaces/HotelInfo';
import TimesSvg from '@/assets/icons/times.svg';

interface IGuestsPickerDesktopProps {
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
const GuestsPickerDesktop = ({
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
}: IGuestsPickerDesktopProps) => {
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
    <>
      <div
        ref={scrollContainerRef}
        onScroll={e => setScroll(e.currentTarget.scrollTop)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          overflowY: 'auto',
          paddingLeft: 12,
          paddingRight: 8,
          paddingBottom: 20,
        }}
        className="scroll-container"
      >
        {adults.map((_, ind) => (
          <Fragment key={ind}>
            {ind !== 0 && (
              <div style={{ border: '1px solid ' + Colors.white }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: '16px',
                    color: Colors.black2,
                  }}
                >
                  Номер {ind + 1}
                </span>
                {adults.length > 1 && (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setAdults(adults => [
                        ...adults.slice(0, ind),
                        ...adults.slice(ind + 1),
                      ]);
                      setChildrenAge(childrenAge => [
                        ...childrenAge.slice(0, ind),
                        ...childrenAge.slice(ind + 1),
                      ]);
                    }}
                  >
                    <img src={TimesSvg} style={{ width: 16, height: 16 }} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: '12px',
                      color: Colors.black2,
                      opacity: 0.7,
                    }}
                  >
                    Взрослые
                  </span>
                  <NumPicker
                    value={adults[ind]}
                    onChange={val => {
                      if (val === 0 && adults.length !== 1) {
                        setAdults(adults => [
                          ...adults.slice(0, ind),
                          ...adults.slice(ind + 1),
                        ]);
                        setChildrenAge(childrenAge => [
                          ...childrenAge.slice(0, ind),
                          ...childrenAge.slice(ind + 1),
                        ]);
                      } else
                        setAdults(adults => [
                          ...adults.slice(0, ind),
                          val,
                          ...adults.slice(ind + 1),
                        ]);
                    }}
                    min={1}
                    max={
                      (from === 'accommodation' &&
                        hotelRoom !== undefined &&
                        hotelRoom.max_adult_occupancy +
                          (hotelRoom.accommodate_adults_on_extra_bed
                            ? hotelRoom.max_extra_bed_occupancy -
                              childrenAge[ind].length
                            : 0)) ||
                      undefined
                    }
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: '12px',
                      color: Colors.black2,
                      opacity: 0.7,
                    }}
                  >
                    Дети младше 12 лет
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
                    min={0}
                    max={
                      from === 'accommodation' && hotelRoom !== undefined
                        ? hotelRoom.accommodate_adults_on_extra_bed &&
                          adults[ind] - hotelRoom.max_adult_occupancy > 0
                          ? hotelRoom.max_extra_bed_occupancy +
                            hotelRoom.max_adult_occupancy -
                            adults[ind]
                          : hotelRoom.max_extra_bed_occupancy
                        : undefined
                    }
                  />
                </div>
              </div>
              {childrenAge[ind].map((age, ind2) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                  }}
                  key={ind2}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: '12px',
                      color: Colors.black2,
                      opacity: 0.7,
                      minWidth: 110,
                    }}
                  >
                    Возраст {ind2 + 1} ребенка
                  </span>
                  <SelectInput
                    onFocus={e => {
                      const top = e.currentTarget.offsetTop - 20;
                      setTimeout(() =>
                        scrollContainerRef.current?.scroll({
                          top,
                        }),
                      );
                    }}
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
                  />
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          paddingInline: 12,
        }}
      >
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
        <Button
          onClick={() => {
            setAdultsInit(adults);
            setChildrenAgeInit(childrenAge);
            hide();
          }}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 700,
              fontSize: 14,
              lineHeight: '14px',
              color: '#fff',
            }}
          >
            Готово
          </span>
        </Button>
      </div>
    </>
  );
};

export default GuestsPickerDesktop;
