import { Colors, Fonts } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store';
import { setMainData, setRoomType } from '@/store/slices/params';
import addDays from '@/utils/addDays';
import DatePickerDesktop from '@/components/inputs/DatePickerDesktop';
import { useState } from 'react';
import RoomCard from './RoomCard';

interface IRoomLayoutProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setAdults: React.Dispatch<React.SetStateAction<number[]>>;
  setChildrenAge: React.Dispatch<React.SetStateAction<number[][]>>;
  noRooms?: boolean;
  noRoomsAvailableIds?: string[];
}
const RoomLayout = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setAdults,
  setChildrenAge,
  noRooms,
  noRoomsAvailableIds = [],
}: IRoomLayoutProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const hotel = useAppSelector(state => state.paramsStore.hotel);
  const roomType = useAppSelector(state => state.paramsStore.roomType);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const dispatch = useAppDispatch();
  const selected = hotel?.room_types.find(r => +r.code === roomType);
  const others = hotel?.room_types.filter(r => +r.code !== roomType);
  const [diff, setDiff] = useState(0);
  if (selected === undefined || others === undefined) return;
  if (noRooms)
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 60,
            borderRadius: 8,
            padding: 40,
            boxSizing: 'border-box',
            width: '100%',
            backgroundColor: Colors.white2,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Oranienbaum,
                fontWeight: 400,
                fontSize: 40,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.black,
                width: '100%',
                textAlign: 'center',
              }}
            >
              Уважаемые гости!
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.4,
                  color: Colors.brown,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {`На ${
                  mainData !== undefined
                    ? mainData.date.toLocaleString('ru-ru', {
                        day: 'numeric',
                        month: 'long',
                      })
                    : ''
                } — ${
                  mainData !== undefined
                    ? addDays(mainData.date, mainData.nights).toLocaleString(
                        'ru-ru',
                        {
                          day: 'numeric',
                          month: 'long',
                        },
                      )
                    : ''
                } номер «${selected.name}» недоступен.`}
              </span>
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.4,
                  color: Colors.brown,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {'Вы можете выбрать другой номер или изменить даты проживания.'}
              </span>
            </div>
          </div>
          {!mobile && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                gap: 32,
              }}
            >
              <span
                style={{
                  fontFamily: Fonts.Oranienbaum,
                  fontWeight: 400,
                  fontSize: 40,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: Colors.black,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Ближайшие доступные даты
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 20,
                  padding: 20,
                  boxSizing: 'border-box',
                  borderRadius: 8,
                  backgroundColor: Colors.white3,
                }}
              >
                <DatePickerDesktop
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  diff={diff}
                  setDiff={setDiff}
                  roomType={+selected.code}
                />
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 32,
          }}
        >
          <span
            style={{
              fontFamily: Fonts.Oranienbaum,
              fontWeight: 400,
              fontSize: 40,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: Colors.black,
            }}
          >
            Доступные номера на выбранные даты
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {hotel?.room_types
              .filter(r => noRoomsAvailableIds.includes(r.code))
              .map(room => (
                <RoomCard
                  roomHotel={room}
                  onSelect={r => {
                    dispatch(setMainData(undefined));
                    setStartDate(null);
                    setEndDate(null);
                    setAdults([0]);
                    setChildrenAge([[]]);
                    dispatch(setRoomType(+r));
                  }}
                  key={room.code}
                />
              ))}
          </div>
        </div>
      </>
    );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
      <RoomCard roomHotel={selected} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <span
          style={{
            fontFamily: Fonts.Oranienbaum,
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: Colors.black,
          }}
        >
          Другие номера
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {others.map(room => (
            <RoomCard
              roomHotel={room}
              onSelect={r => {
                dispatch(setMainData(undefined));
                setStartDate(null);
                setEndDate(null);
                setAdults([0]);
                setChildrenAge([[]]);
                dispatch(setRoomType(+r));
              }}
              key={room.code}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomLayout;
