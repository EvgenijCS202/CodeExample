export interface RoomTypeAvailability {
  hotel: number;
  room_type_availability: {
    availability_date: {
      date: string;
      guests: number;
      is_available: true;
      price: {
        currency: string;
        price_after_tax: number;
        price_before_tax: number;
      };
    }[];
    id_room_type: number;
  }[];
}
