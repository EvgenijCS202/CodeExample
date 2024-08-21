import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarDate } from '@/hooks/useCalendarDates';
import { HotelInfo } from '@/interfaces/HotelInfo';
import { RoomAvailability } from '@/interfaces/RoomAvailability';

export interface MainData {
  date: Date;
  nights: number;
  adults: number[];
  childrenAge: number[][];
}
export interface ParamService {
  id: string;
  count?: number;
  counts?: { age_group: number; count: number; placement_index: number }[];
}
export interface IParamsStore {
  mainData?: MainData;
  roomType?: number;
  from: 'form' | 'accommodation';
  mobile: boolean;
  rooms: {
    room_hotel?: HotelInfo['hotels'][number]['room_types'][number];
    room_available?: RoomAvailability['rooms'][number];
    price?: RoomAvailability['rooms'][number]['rate_plans'][number]['price'];
    services?: {
      food: ParamService[];
      others: ParamService[];
    };
  }[];
  hotel?: HotelInfo['hotels'][number];
  calendar: {
    base: { [key: string]: Omit<CalendarDate, 'date'> };
    [key: number]: { [key: string]: Omit<CalendarDate, 'date'> };
  };
}
const initialState: IParamsStore = {
  from: 'form',
  mobile: false,
  rooms: [],
  calendar: { base: {} },
};

export const paramsStore = createSlice({
  name: 'paramsStore',
  initialState,
  reducers: {
    setMainData(state, action: PayloadAction<MainData | undefined>) {
      state.mainData = action.payload;
    },

    setRoomType(state, action: PayloadAction<number>) {
      state.roomType = action.payload;
    },

    setFrom(state, action: PayloadAction<'form' | 'accommodation'>) {
      state.from = action.payload;
    },

    setMobile(state, action: PayloadAction<boolean>) {
      state.mobile = action.payload;
    },

    setRooms(state, action: PayloadAction<IParamsStore['rooms']>) {
      state.rooms = action.payload;
    },

    setHotel(state, action: PayloadAction<HotelInfo['hotels'][number]>) {
      state.hotel = action.payload;
    },

    setCalendar(
      state,
      action: PayloadAction<{ key: number | 'base'; data: CalendarDate[] }[]>,
    ) {
      action.payload.forEach(({ key, data }) => {
        const newDates = data.length
          ? data
              .map(it => ({ [it.date]: { price: it.price } }))
              .reduce((pr, cur) => ({ ...pr, ...cur }))
          : {};
        state.calendar = {
          ...state.calendar,
          [key]: { ...state.calendar[key], ...newDates },
        };
      });
    },
  },
});

export const {
  setMainData,
  setRoomType,
  setFrom,
  setMobile,
  setRooms,
  setHotel,
  setCalendar,
} = paramsStore.actions;
