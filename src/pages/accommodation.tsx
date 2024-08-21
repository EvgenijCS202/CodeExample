import Button from '@/components/baseComponents/Button';
import Input from '@/components/inputs/Input';
import DatesPicker from '@/components/inputs/DatesPicker';
import GuestsPicker from '@/components/inputs/GuestsPicker';
import { Fonts } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store';
import FormContinuePopup from '@/components/pageComponents/accommodationPage/FormContinuePopup';
import { useEffect, useState } from 'react';
import addDays from '@/utils/addDays';
import { setMainData, setRooms } from '@/store/slices/params';
import useCalendarDates from '@/hooks/useCalendarDates';
import FormLayout from '@/components/pageComponents/accommodationPage/FormLayout';
import RoomLayout from '@/components/pageComponents/accommodationPage/RoomLayout';
import { useLazyGetRoomsQuery } from '@/store/slices/api';
import dateToString from '@/utils/dateToString';
import { useNavigate } from 'react-router-dom';
import Title from '@/components/navigation/Title';

const AccommodationPage = () => {
  const navigate = useNavigate();
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const from = useAppSelector(state => state.paramsStore.from);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const dispatch = useAppDispatch();
  const [getRooms, resultGetRooms] = useLazyGetRoomsQuery();
  const [roomSelected, setRoomSelected] = useState(false);

  const [startDate, setStartDate] = useState(
    mainData?.date !== undefined ? mainData.date : null,
  );
  const [endDate, setEndDate] = useState(
    mainData !== undefined ? addDays(mainData.date, mainData.nights) : null,
  );
  const [adults, setAdults] = useState(
    mainData !== undefined ? mainData.adults : [0],
  );
  const [childrenAge, setChildrenAge] = useState(
    mainData !== undefined ? mainData.childrenAge : [[]],
  );
  const roomType = useAppSelector(state => state.paramsStore.roomType);
  useCalendarDates();
  const hotel = useAppSelector(state => state.paramsStore.hotel);

  useEffect(() => {
    if (from === 'accommodation' && mainData !== undefined && roomSelected) {
      getRooms({
        startDate: dateToString(mainData.date),
        endDate: dateToString(addDays(mainData.date, mainData.nights)),
        adults: mainData.adults,
        children: mainData.childrenAge,
      });
    }
  }, [from, mainData, getRooms, roomSelected]);

  useEffect(() => {
    if (
      from === 'accommodation' &&
      roomType !== undefined &&
      resultGetRooms.data !== undefined &&
      roomSelected
    ) {
      const roomAvailable = resultGetRooms.data.rooms.find(
        it => +it.room_type_code === roomType,
      );
      if (roomAvailable === undefined) return;
      const roomHotel = hotel?.room_types.find(it => +it.code === roomType);
      if (roomHotel === undefined) return;
      const foodServices =
        hotel?.services
          .filter(it => it.category_code === '6215')
          .map(it => it.code) || [];
      dispatch(
        setRooms([
          {
            room_hotel: roomHotel,
            room_available: roomAvailable,
            price: roomAvailable.rate_plans[0].price,
            services: {
              food: [
                ...roomAvailable.services
                  .filter(
                    it =>
                      it.inclusive === true && foodServices.includes(it.code),
                  )
                  .map(it => ({
                    id: it.code,
                    count: 1,
                  })),
              ],
              others: [
                ...roomAvailable.services
                  .filter(
                    it =>
                      it.inclusive === true && !foodServices.includes(it.code),
                  )
                  .map(it => ({
                    id: it.code,
                    count: 1,
                  })),
              ],
            },
          },
        ]),
      );
      navigate('/services/1');
    }
  }, [
    resultGetRooms.data,
    roomSelected,
    from,
    roomType,
    dispatch,
    hotel,
    navigate,
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      <Title title={from === 'form' ? 'Выберите номер' : 'Выбор даты'} />
      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: 8,
        }}
      >
        <DatesPicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <GuestsPicker
          adults={adults}
          childrenAge={childrenAge}
          setAdults={setAdults}
          setChildrenAge={setChildrenAge}
          hotelRoom={hotel?.room_types.find(it => +it.code === roomType)}
        />
        <Input
          value=""
          placeholder="Промокод"
          width={mobile ? '100%' : 'calc((100% - 192px - 160px) / 3'}
        />
        <Button
          style={{
            width: mobile ? '100%' : 'calc((100% - 192px - 160px) / 3',
            height: mobile ? 54 : undefined,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (from === 'form') {
              if (!startDate || !endDate || !adults.length) return;
              dispatch(
                setMainData({
                  date: startDate,
                  nights:
                    (endDate.valueOf() - startDate.valueOf()) /
                    1000 /
                    3600 /
                    24,
                  adults: adults,
                  childrenAge: childrenAge,
                }),
              );
              dispatch(
                setRooms(
                  Array(adults.length)
                    .fill(null)
                    .map(() => ({})),
                ),
              );
            } else {
              if (
                !startDate ||
                !endDate ||
                !adults.length ||
                roomType === undefined
              )
                return;
              const roomHotel = hotel?.room_types.find(
                it => +it.code === roomType,
              );
              if (roomHotel === undefined) return;
              dispatch(
                setMainData({
                  date: startDate,
                  nights:
                    (endDate.valueOf() - startDate.valueOf()) /
                    1000 /
                    3600 /
                    24,
                  adults: adults,
                  childrenAge: childrenAge,
                }),
              );
              setRoomSelected(true);
            }
          }}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '16px',
              color: '#fff',
            }}
          >
            {from === 'form' ? 'Обновить' : 'Выбрать'}
          </span>
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: mobile ? 24 : 40,
        }}
      >
        {from === 'form' ? (
          <>
            <FormLayout
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <FormContinuePopup />
          </>
        ) : (
          <RoomLayout
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAdults={setAdults}
            setChildrenAge={setChildrenAge}
            noRooms={
              from === 'accommodation' &&
              roomType !== undefined &&
              resultGetRooms.data?.rooms.find(
                it => +it.room_type_code === roomType,
              ) === undefined &&
              roomSelected
            }
            noRoomsAvailableIds={resultGetRooms.data?.rooms.map(
              it => it.room_type_code,
            )}
          />
        )}
      </div>
    </div>
  );
};

export default AccommodationPage;
