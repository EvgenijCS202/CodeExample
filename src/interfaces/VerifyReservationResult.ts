export interface VerifyReservationResult {
  hotel_reservations: {
    create_date: string;
    customer: {
      confirm_sms: boolean;
      contact_info: {
        phones: [];
        emails: [];
      };
      subscribe_email: boolean;
    };
    guarantee_info: {
      guarantees: [];
    };
    guarantee_options: {
      code: string;
      layout_size: { width: number; height: number };
      logos: { code: string; title: string }[];
      name: string;
      payment_system_code: string;
      prepayment: { amount: number; type: string; currency: 'RUB' };
      primary_guarantee_code: string;
      require_prepayment: boolean;
      site_url: string;
      texts: {
        description: string;
        logos_information: string;
        payment_due_date_description: string;
        payment_system_information: string;
        prepayment_information: string;
      };
      type: string;
    }[];
    hotel_ref: {
      code: '3172';
      name: 'Гостиничный Комплекс  "Конаково Ривер Клаб"';
      stay_unit_kind: 'night';
    };
    language: 'ru';
    last_modification_date: string;
    point_of_sale: {
      integration_key: 'TL-INT-konakovo-camp_2024-04-09';
      referrer_code: 'konakovo.camp';
      source: 'BS-XNP6m';
      source_url: string;
    };
    room_stays: {
      // extra_stay_charge: {}
      extra_stay_charge_options: {
        base_check_in_time: string;
        base_check_out_time: string;
        early_arrival: {
          date: string;
          forbidden: boolean;
          local_time: string;
          price: {
            currency: 'RUB';
            price_after_tax: number;
            price_before_tax: number;
          };
        }[];
        early_arrival_rule_description: string;
        late_departure: {
          date: string;
          forbidden: boolean;
          local_time: string;
          price: {
            currency: 'RUB';
            price_after_tax: number;
            price_before_tax: number;
          };
        }[];
        late_departure_rule_description: string;
      };
      guest_count_info: {
        adults: number;
        children: number;
        guest_counts: {
          age_qualifying_code: string;
          age?: number;
          count: number;
          index: number;
          placement_index: number;
        }[];
      };
      guests: [];
      placement_rates: {
        placement: { index: number; kind: string; code: string };
        rate_plan_code: string;
        rates: {
          date: string;
          price_after_tax: number;
          currency: 'RUB';
        }[];
        room_type_code: string;
      }[];
      rate_plans: {
        cancel_penalty_group: {
          code: string;
          description: string;
          show_description: boolean;
        };
        code: string;
        description: string;
        name: string;
      }[];
      room_types: {
        code: string;
        kind: string;
        name: string;
        placements: {
          capacity: number;
          code: string;
          currency: 'RUB';
          index: number;
          kind: string;
          price_after_tax: number;
          price_before_tax: number;
          rate_plan_code: number;
        }[];
        preferences: [];
      }[];
      services: {
        applicability_type: string;
        charge_type: string;
        code: string;
        description: string;
        inclusive: boolean;
        kind: string;
        name: string;
        placement_index?: number;
        price: {
          price_before_tax: number;
          price_after_tax: number;
          currency: 'RUB';
          taxes: [];
        };
        quantity: number;
      }[];
      stay_dates: {
        start_date: string;
        end_date: string;
      };
      stay_total: {
        price_before_tax: number;
        price_after_tax: number;
        currency: 'RUB';
        taxes: [];
      };
      total: {
        price_before_tax: number;
        price_after_tax: number;
        currency: 'RUB';
        taxes: [];
      };
    }[];
    status: string;
    total: {
      price_before_tax: number;
      price_after_tax: number;
      currency: 'RUB';
      taxes: [];
    };
  }[];
}
