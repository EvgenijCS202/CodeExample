import { useAppDispatch } from '@/store';
import { useLazyGetCalendarAvailabilityQuery } from '@/store/slices/api';
import { setCalendar } from '@/store/slices/params';
import dateToString from '@/utils/dateToString';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState } from 'react';

export interface CalendarDate {
  date: string;
  price: number;
}
const useCalendarDates = () => {
  const dispatch = useAppDispatch();
  const [getCalendarAvailability, resultCalendar] =
    useLazyGetCalendarAvailabilityQuery();
  const [half1Finished, setHalf1Finished] = useState(false);
  const half1Start = useMemo(() => {
    const half1Start = new Date();
    half1Start.setDate(1);
    return half1Start;
  }, []);
  const half1End = useMemo(() => {
    const half1End = new Date(half1Start);
    half1End.setMonth(half1End.getMonth() + 6);
    return half1End;
  }, [half1Start]);
  const half2Start = useMemo(() => {
    const half2Start = new Date(half1End);
    half2Start.setDate(half2Start.getDate() + 1);
    return half2Start;
  }, [half1End]);
  const half2End = useMemo(() => {
    const half2End = new Date(half2Start);
    half2End.setMonth(half2End.getMonth() + 6);
    return half2End;
  }, [half2Start]);
  useEffect(() => {
    getCalendarAvailability({
      startDate: dateToString(half1Start),
      endDate: dateToString(half1End),
    });
  }, [getCalendarAvailability, half1Start, half1End]);
  useEffect(() => {
    if (half1Finished)
      getCalendarAvailability({
        startDate: dateToString(half2Start),
        endDate: dateToString(half2End),
      });
  }, [getCalendarAvailability, half2Start, half2End, half1Finished]);

  useEffect(() => {
    if (
      resultCalendar.data &&
      resultCalendar.status === QueryStatus.fulfilled
    ) {
      const dates: { date: string; price: number }[] = [];
      if (
        resultCalendar.data.room_type_availability?.[0]?.availability_date?.[0]
          .date === undefined
      )
        return;
      const date = new Date(
        resultCalendar.data.room_type_availability[0].availability_date[0].date,
      );
      date.setDate(1);
      const endDate = new Date(date);
      endDate.setMonth(endDate.getMonth() + 6);
      const strEndDate = dateToString(endDate);
      do {
        const strDate = dateToString(date);
        let minPrice = -1;
        resultCalendar.data.room_type_availability.forEach(it => {
          const found = it.availability_date.find(it2 => it2.date === strDate);
          if (
            found !== undefined &&
            (minPrice === -1 || found.price.price_after_tax < minPrice)
          )
            minPrice = found.price.price_after_tax;
        });
        dates.push({ date: strDate, price: minPrice });
        date.setDate(date.getDate() + 1);
      } while (dateToString(date) !== strEndDate);
      const filteredDates = dates.filter(it => it.price !== -1);
      if (!filteredDates.length) {
        return;
      }
      dispatch(
        setCalendar([
          { key: 'base', data: filteredDates },
          ...resultCalendar.data.room_type_availability.map(r => ({
            key: r.id_room_type,
            data: r.availability_date.map(d => ({
              date: d.date,
              price: d.price.price_after_tax,
            })),
          })),
        ]),
      );
      setHalf1Finished(true);
    }
  }, [resultCalendar.data, resultCalendar.status, dispatch]);
};

export default useCalendarDates;
