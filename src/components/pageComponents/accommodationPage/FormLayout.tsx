import { useLazyGetRoomsQuery } from '@/store/slices/api';
import addDays from '@/utils/addDays';
import dateToString from '@/utils/dateToString';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useAppSelector } from '@/store';
import Loading from '@/components/baseComponents/Loading';
import RoomCard from './RoomCard';

interface IFormLayoutProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
const FormLayout = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: IFormLayoutProps) => {
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const hotel = useAppSelector(state => state.paramsStore.hotel);
  const [getRooms, resultGetRooms] = useLazyGetRoomsQuery();
  useEffect(() => {
    if (mainData !== undefined)
      getRooms({
        startDate: dateToString(mainData.date),
        endDate: dateToString(addDays(mainData.date, mainData.nights)),
        adults: mainData.adults,
        children: mainData.childrenAge,
      });
  }, [getRooms, mainData]);
  if (
    resultGetRooms.data?.rooms !== undefined &&
    resultGetRooms.status === QueryStatus.fulfilled &&
    hotel !== undefined
  )
    return hotel.room_types.map((room, ind) => (
      <RoomCard
        roomHotel={room}
        roomAvailable={resultGetRooms.data?.rooms.find(
          r => r.room_type_code === room.code,
        )}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        key={room.code}
        last={ind === hotel.room_types.length - 1}
      />
    ));
  return <Loading />;
};

export default FormLayout;
