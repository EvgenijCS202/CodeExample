export interface HotelInfo {
  hotels: {
    room_types: {
      code: string;
      name: string;
      description: string;
      size: {
        value: number;
        unit: 'square_metre';
      };
      rooms_quantity?: number;
      amenities: {
        category_code: string;
        kind: string;
        name: string;
      }[];
      preferences: {
        category_code: string;
        category_name: string;
        code: string;
        name: string;
      }[];
      images: {
        url: string;
      }[];
      kind: string;
      max_adult_occupancy: number;
      max_extra_bed_occupancy: number;
      max_without_bed_occupancy: number;
      max_occupancy: number;
      accommodate_adults_on_extra_bed: boolean;
      child_bed_age_groups: {
        code: string;
      }[];
      child_extra_bed_age_groups?: {
        code: string;
      }[];
    }[];
    service_categories: {
      code: string;
      name: string;
      description: string;
    }[];
    services: {
      code: string;
      name: string;
      description: string;
      category_code: string;
      charge_type: string;
      kind: string;
      images: {
        url: string;
      }[];
      require_prepayment: boolean;
      require_guaranteed_payment: boolean;
      applicability_type: string;
    }[];
    rate_plans: {
      code: string;
      name: string;
      description: string;
      short_description: string;
      sell_dates: {
        start_date: Date;
        end_date: Date;
      }[];
      currency: string;
      images: {
        url: string;
      }[];
      icon: {
        url: string;
      };
      nonrefundable: boolean;
      cancel_penalty_group: {
        code: string;
        show_description: boolean;
      };
      full_prepayment: boolean;
    }[];
    rate_plan_categories: [];
    amenity_categories: {
      code: string;
      name: string;
    }[];
    timezone: {
      name: string;
      offset: string;
    };
    policy: {
      check_in_time: string;
      check_out_time: string;
    };
    booking_rules: {
      availability_min_date: {
        duration: number;
        time_unit: string;
      };
      availability_max_date: {
        duration: number;
        time_unit: string;
      };
    };
    guarantees: {
      code: string;
      primary_guarantee_code: string;
      payment_system_code: string;
      type: string;
    }[];
    cancel_penalty_groups: {
      code: string;
      cancel_penalties: {
        code: string;
        description: string;
        deadline: {
          offset_drop_time: string;
        };
        time_match: {
          time_unit: string;
          matching: string;
        };
        guests_count_match: {
          matching: string;
        };
        rooms_count_match: {
          matching: string;
        };
        periods: {
          start_date: Date;
        }[];
        penalty: {
          percent: number;
          type: string;
          basis: string;
        };
      }[];
      description: string;
      show_description: boolean;
    }[];
    logo: {
      url: string;
    };
    contact_info: {
      addresses: {
        postal_code: string;
        country_code: string;
        region: string;
        city_name: string;
        address_line: [string];
        remark: string;
        latitude: string;
        longitude: string;
      }[];
      phones: {
        phone_number: string;
        remark: string;
      }[];
      emails: {
        email_address: string;
      }[];
    };
    currency: string;
    transfers: [];
    vehicles: [];
    taxes: [];
    promo_rate_plans: boolean;
    min_guest_age: number;
    age_groups: {
      code: string;
      min_age: number;
      max_age: number;
    }[];
    stay_unit_kind: string;
    description: string;
    stars: number;
    images: string[];
    last_booking_date: string;
    cashback_settings: {
      code: string;
      is_cashback_allowed: boolean;
      type: string;
      booking_period: {
        start_date: Date;
        end_date: Date;
      };
      stay_period: {
        start_date: Date;
        end_date: Date;
      };
      min_los: number;
      min_payment_amount: number;
      is_full_prepayment_required: boolean;
      cashback_percent: number;
      currency: string;
      is_budget_specified: boolean;
    }[];
    code: string;
    name: string;
    type: string;
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
