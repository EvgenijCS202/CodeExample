export interface VerifyReservationQuery {
  currency: 'RUB';
  hotel_reservations: {
    hotel_ref: { code: '3172' };
    room_stays: {
      guest_count_info: {
        guest_counts: {
          age_qualifying_code: string;
          age?: number;
          count: number;
          index: number;
          placement_index: number;
        }[];
      };
      rate_plans: { code: string }[];
      room_types: {
        code: string;
        placements: {
          code: string;
          index: number;
          kind: string;
        }[];
        preferences: [];
      }[];
      services: {
        code: string;
        placement_index?: number;
        quantity: number;
      }[];
      stay_dates: {
        start_date: string;
        end_date: string;
      };
    }[];
    services: [];
    transfers: [];
  }[];
  include_extra_stay_options: boolean;
  include_guarantee_options: boolean;
  language: 'ru-ru';
  point_of_sale: {
    integration_key: 'TL-INT-konakovo-camp_2024-04-09';
    referrer_url: 'https://konakovo.camp/';
    source: 'BS-XNP6m';
    source_url: string;
  };
}
