import { useAppDispatch } from '@/store';
import { useLazyGetHotelQuery } from '@/store/slices/api';
import {
  setFrom,
  setHotel,
  setMainData,
  setMobile,
  setRooms,
  setRoomType,
} from '@/store/slices/params';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const IndexPage = () => {
  const [searchParams] = useSearchParams();
  const { platform } = useParams();
  const dispatch = useAppDispatch();
  const [getHotel, resultGetHotel] = useLazyGetHotelQuery();
  const navigate = useNavigate();

  useEffect(() => {
    getHotel();
  }, [getHotel]);

  const rawDate = searchParams.get('date');
  const rawNights = searchParams.get('nights');
  const rawAdults = searchParams.get('adults');
  const rawChildrenAge = searchParams.get('children-age');
  const rawRoomType = searchParams.get('room-type');
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    let correct = false;
    if (rawDate && rawNights && rawAdults) {
      const date = !isNaN(Date.parse(rawDate))
        ? new Date(rawDate.replace('-', '/'))
        : null;
      const nights = !isNaN(+rawNights) ? +rawNights : null;
      const adultsMap = rawAdults.split(',').map(val => {
        if (val !== '' && !isNaN(+val)) return +val;
        return -1;
      });
      const adults =
        adultsMap.findIndex(it => it === -1) === -1 ? adultsMap : null;
      const childrenAge =
        rawChildrenAge !== null
          ? rawChildrenAge.split(',').map(acc =>
              acc
                .split(';')
                .map(val => {
                  if (val !== '' && !isNaN(+val)) return +val;
                  return null;
                })
                .filter(it => it !== null),
            )
          : null;
      if (date !== null && nights !== null && adults !== null) {
        dispatch(
          setMainData({
            date,
            nights,
            adults,
            childrenAge:
              childrenAge !== null ? childrenAge : adults.map(() => []),
          }),
        );
        dispatch(
          setRooms(
            Array(adults.length)
              .fill(null)
              .map(() => ({})),
          ),
        );
        dispatch(setFrom('form'));
        correct = true;
      }
    }
    if (rawRoomType) {
      const roomType = !isNaN(+rawRoomType) ? +rawRoomType : null;
      if (roomType !== null) {
        dispatch(setRoomType(roomType));
        dispatch(setFrom('accommodation'));
        correct = true;
      }
    }
    if (!platform || (platform !== 'd' && platform !== 'm')) correct = false;
    else dispatch(setMobile(platform === 'm'));
    setCorrect(correct);
  }, [
    dispatch,
    platform,
    rawAdults,
    rawChildrenAge,
    rawDate,
    rawNights,
    rawRoomType,
  ]);

  useEffect(() => {
    if (resultGetHotel.data?.hotels?.[0] !== undefined && correct) {
      dispatch(setHotel(resultGetHotel.data.hotels[0]));
      navigate('/accommodation', { replace: true });
    }
  }, [resultGetHotel.data, correct, dispatch, navigate]);

  if (resultGetHotel.isLoading && correct) return null;
  return 'Что-то пошло не так...';
};

export default IndexPage;
