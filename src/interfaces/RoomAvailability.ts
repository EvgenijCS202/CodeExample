export interface RoomAvailability {
  rooms: {
    room_type_code: string;
    rate_plans: {
      code: string;
      criterion: number;
      price: {
        price_before_tax: number;
        price_after_tax: number;
        currency: string;
        taxes: {
          amount: number;
          code: string;
        }[];
        discount?: {
          amount: number;
          basic_before_tax: number;
          basic_after_tax: number;
        }[];
      };
      guests: { kind: string; count: number; code: string }[];
    }[];
    raw: {
      guests: {
        placement: {
          index: number;
          kind: string;
          age_group?: number;
          min_age?: number;
          max_age?: number;
        };
        count: number;
        age?: number;
      }[];
      room_types: {
        placements: {
          index: number;
          price_before_tax: number;
          price_after_tax: number;
          kind: string;
          code: string;
          capacity: number;
          rate_plan_code?: string;
          currency: string;
          taxes: {
            amount: number;
            code: string;
          }[];
        }[];
        code: string;
        room_type_quota_rph: string;
        limited_inventory_count: number;
      }[];
      rate_plans: {
        code: string;
        cancel_penalty_group: {
          code: string;
          description: string;
          free_cancellation: boolean;
          show_description: string;
        }[];
      }[];
      placement_rates: {
        room_type_code: string;
        rate_plan_code: string;
        placement: {
          index: number;
          kind: string;
          code: string;
        };
        rates: {
          date: string;
          price_after_tax: number;
          currency: string;
          taxes: {
            amount: number;
            code: string;
          }[];
        }[];
      }[];
    };
    services: {
      code: string;
      prices?: { price: number; age_group: number; placement_index: number }[];
      price?: number;
      inclusive?: boolean;
    }[];
    quantity: number;
  }[];
  errors?: {
    error_code: string;
    message: string;
    lang: string;
    info: string;
  }[];
  warnings?: {
    error_code: string;
    message: string;
    lang: string;
    info: string;
  }[];
}
