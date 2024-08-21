import { HotelInfo } from '@/interfaces/HotelInfo';
import { RoomAvailability } from '@/interfaces/RoomAvailability';
import { RoomTypeAvailability } from '@/interfaces/RoomTypeAvailability';
import { VerifyReservationQuery } from '@/interfaces/VerifyReservationQuery';
import { VerifyReservationResult } from '@/interfaces/VerifyReservationResult';
import transformRoomAvailability from '@/utils/transformRoomAvailability';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost/';
export const basePort = 5174;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    timeout: 5000,
    prepareHeaders: headers => {
      headers.append(
        'Authorization',
        'Basic dXNlcjpwNFZuOGFla2Z0dm1jYnRXZVRUdFh5S1FnTXVldmRqemVoejdvOGNVM2Jn',
      );
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json, text/plain, */*');
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: builder => ({
    getHotel: builder.query<HotelInfo, void>({
      query: () =>
        'ChannelDistributionApi/BookingForm/hotel_info?language=ru-ru&hotels[0].code=3172&point_of_sale.source=BS-XNP6m',
    }),
    getRooms: builder.query<
      RoomAvailability,
      {
        startDate: string;
        endDate: string;
        adults: number[];
        children: number[][];
      }
    >({
      query: ({ startDate, endDate, adults, children }) =>
        'ChannelDistributionApi/BookingForm/hotel_availability?' +
        'include_rates=true&include_transfers=true&include_all_placements=false&include_promo_restricted=true&point_of_sale.source=BS-XNP6m' +
        '&language=ru-ru' +
        adults
          .map((it, ind) =>
            availabilityCriterion(ind, startDate, endDate, it, children[ind]),
          )
          .reduce((pr, cur) => `${pr}${cur}`),
      transformResponse: transformRoomAvailability,
    }),
    getCalendarAvailability: builder.query<
      RoomTypeAvailability,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `ChannelDistributionApi/AvailabilityCalendar/room_type_availability_2?start_date=${startDate}&end_date=${endDate}&hotel=3172&max_nights=21&aggregate_dates=true&shared=false&point_of_sale.source=BS-XNP6m`,
    }),
    verifyReservation: builder.mutation<
      VerifyReservationResult,
      VerifyReservationQuery
    >({
      query: body => ({
        url: 'ChannelDistributionApi/BookingForm/verify_reservation',
        method: 'POST',
        body,
      }),
    }),
  }),
});

const availabilityCriterion = (
  num: number,
  start: string,
  end: string,
  adults: number,
  children: number[],
) => {
  return (
    `&criterions[${num}].hotels[0].code=3172` +
    `&criterions[${num}].dates=${start};${end}&criterions[${num}].adults=${adults}` +
    (children.length
      ? `&criterions[${num}].children=` +
        children.map(it => `${it}`).reduce((pr, cur) => `${pr};${cur}`)
      : '')
  );
};

export const {
  useLazyGetHotelQuery,
  useLazyGetRoomsQuery,
  useLazyGetCalendarAvailabilityQuery,
  useVerifyReservationMutation,
} = api;
