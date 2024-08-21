import { Colors, Fonts } from '@/consts';
import { Tooltip } from 'antd';
import { useAppSelector } from '@/store';
import king_bed from '@/assets/icons/amenities/king_bed.svg';
import bathrobe from '@/assets/icons/amenities/bathrobe.svg';
import slippers from '@/assets/icons/amenities/slippers.svg';
import bath_towels from '@/assets/icons/amenities/bath_towels.svg';
import beauty_aids from '@/assets/icons/amenities/beauty_aids.svg';
import shower from '@/assets/icons/amenities/shower.svg';
import closet_for_clothes from '@/assets/icons/amenities/closet_for_clothes.svg';
import table from '@/assets/icons/amenities/table.svg';
import chairs from '@/assets/icons/amenities/chairs.svg';
import nightstands from '@/assets/icons/amenities/nightstands.svg';
import armchair from '@/assets/icons/amenities/armchair.svg';
import dinner_zone from '@/assets/icons/amenities/dinner_zone.svg';
import flatware from '@/assets/icons/amenities/flatware.svg';
import kitchenette from '@/assets/icons/amenities/kitchenette.svg';
import floor_to_ceiling_windows from '@/assets/icons/amenities/floor_to_ceiling_windows.svg';
import minibar from '@/assets/icons/amenities/minibar.svg';
import cookware from '@/assets/icons/amenities/cookware.svg';
import wifi_internet from '@/assets/icons/amenities/wifi_internet.svg';
import hairdryer from '@/assets/icons/amenities/hairdryer.svg';
import journal_table from '@/assets/icons/amenities/journal_table.svg';
import mirror from '@/assets/icons/amenities/mirror.svg';
import sofa_bed from '@/assets/icons/amenities/sofa_bed.svg';
import forest_view from '@/assets/icons/amenities/forest_view.svg';
import two_double_beds from '@/assets/icons/amenities/two_double_beds.svg';
import working_table from '@/assets/icons/amenities/working_table.svg';
import soft_furniture from '@/assets/icons/amenities/soft_furniture.svg';
import hangers from '@/assets/icons/amenities/hangers.svg';
import two_bedrooms from '@/assets/icons/amenities/two_bedrooms.svg';
import kitchen_utensils from '@/assets/icons/amenities/kitchen_utensils.svg';
import kitchen from '@/assets/icons/amenities/kitchen.svg';
import river_view from '@/assets/icons/amenities/river_view.svg';
import set_of_dishes from '@/assets/icons/amenities/set_of_dishes.svg';
import washing_machine from '@/assets/icons/amenities/washing_machine.svg';
import { HotelInfo } from '@/interfaces/HotelInfo';

export const AmenityCard = ({
  amenity,
  full = false,
}: {
  amenity: HotelInfo['hotels'][number]['room_types'][number]['amenities'][number];
  full?: boolean;
}) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const icon = getIconSrc(amenity.kind);
  if (icon === null) return null;
  if (full)
    return (
      <div
        style={{
          display: 'flex',
          padding: 8,
          backgroundColor: Colors.white3,
          borderRadius: 100,
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <img
          src={icon}
          style={{ width: mobile ? 16 : 20, height: mobile ? 16 : 20 }}
        />
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 600,
            fontSize: mobile ? 12 : 14,
            lineHeight: 1.4,
            color: Colors.brown,
          }}
        >
          {amenity.name}
        </span>
      </div>
    );
  return (
    <Tooltip title={amenity.name} key={amenity.name}>
      <div
        style={{
          display: 'flex',
          padding: 8,
          backgroundColor: Colors.white3,
          borderRadius: 100,
        }}
      >
        <img
          src={icon}
          style={{ width: mobile ? 12 : 20, height: mobile ? 12 : 20 }}
        />
      </div>
    </Tooltip>
  );
};

const getIconSrc = (amenityCat: string) => {
  switch (amenityCat) {
    case 'king_bed':
      return king_bed;
    case 'bathrobe':
      return bathrobe;
    case 'slippers':
      return slippers;
    case 'bath_towels':
      return bath_towels;
    case 'beauty_aids':
      return beauty_aids;
    case 'shower':
      return shower;
    case 'closet_for_clothes':
      return closet_for_clothes;
    case 'table':
      return table;
    case 'chairs':
      return chairs;
    case 'nightstands':
      return nightstands;
    case 'armchair':
      return armchair;
    case 'dinner_zone':
      return dinner_zone;
    case 'flatware':
      return flatware;
    case 'kitchenette':
      return kitchenette;
    case 'floor_to_ceiling_windows':
      return floor_to_ceiling_windows;
    case 'minibar':
      return minibar;
    case 'cookware':
      return cookware;
    case 'wifi_internet':
      return wifi_internet;
    case 'hairdryer':
      return hairdryer;
    case 'journal_table':
      return journal_table;
    case 'mirror':
      return mirror;
    case 'sofa_bed':
      return sofa_bed;
    case 'forest_view':
      return forest_view;
    case 'two_double_beds':
      return two_double_beds;
    case 'working_table':
      return working_table;
    case 'soft_furniture':
      return soft_furniture;
    case 'hangers':
      return hangers;
    case 'two_bedrooms':
      return two_bedrooms;
    case 'kitchen_utensils':
      return kitchen_utensils;
    case 'kitchen':
      return kitchen;
    case 'river_view':
      return river_view;
    case 'set_of_dishes':
      return set_of_dishes;
    case 'washing_machine':
      return washing_machine;
    default:
      return null;
  }
};
