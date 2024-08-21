export interface RoomAvailabilityRaw {
  room_stays: {
    rph: number;
    hotel_ref: {
      code: string;
    }[];
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
    guest_count_info: {
      adults: number;
      children: number;
      guests_count: {
        placement_index: number;
        count: number;
        age_qualifying_code: string;
        age?: number;
      }[];
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
    criterion_ref: number;
    services: {
      age_group?: number;
      applicability_type: string;
      placement_index?: number;
      rph: number;
    }[];
    total: {
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
    stay_dates: {
      start_date: string;
      end_date: string;
    }[];
    transfers: {
      rph: number;
    }[];
    guarantees: {
      code: string;
      type: string;
      has_mir_cashback?: boolean;
    }[];
    restrictions?: {
      restrictions_item: string;
    }[];
  }[];
  transfers: {
    rph: number;
    transfer_code: string;
    vehicles: {
      vehicle_code: string;
      price_before_tax: number;
      price_after_tax: number;
      currency: string;
      taxes: {
        amount: number;
        code: string;
      }[];
    }[];
  }[];
  services: {
    applicability_type: string;
    code: string;
    inclusive: boolean;
    price: {
      price_before_tax: number;
      price_after_tax: number;
      currency: string;
      taxes: {
        amount: number;
        code: string;
      }[];
    };
    rph: number;
  }[];
  room_type_quotas: {
    rph: string;
    quantity: number;
  }[];
  availability_result: {
    criterion_ref: string;
    no_room_type_availability_message: string;
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
