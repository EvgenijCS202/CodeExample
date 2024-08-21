import { Colors, Fonts } from '@/consts';
import Dot from './Dot';
import Line from './Line';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store';

const NavBar = () => {
  const location = useLocation();
  const locationNumber = getLocationNumber(location.pathname);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const from = useAppSelector(state => state.paramsStore.from);
  if (locationNumber < 1) return null;
  if (mobile)
    return locationNumber < 4 ? (
      <div
        style={{
          backgroundColor: Colors.white2,
          padding: '4px 8px',
          borderRadius: 100,
          width: 'fit-content',
        }}
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 600,
            fontSize: 14,
            lineHeight: '14px',
            color: Colors.green,
          }}
        >
          {locationNumber}{' '}
          <span
            style={{
              opacity: 0.5,
            }}
          >
            / 3
          </span>
        </span>
      </div>
    ) : null;
  return (
    <div
      style={{
        display: 'flex',
        width: 'fit-content',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <Dot size={12} color={Colors.green} />
      <Line width={40} color={Colors.green} dashed={locationNumber < 2} />
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '16px',
          color: Colors.green,
        }}
      >
        Выбор {from === 'form' ? 'номера' : 'даты'}
      </span>
      <Line
        width={40}
        color={locationNumber < 2 ? Colors.brown : Colors.green}
        dashed={locationNumber < 3}
      />
      <Dot
        size={12}
        color={locationNumber < 2 ? Colors.brown : Colors.green}
        border={locationNumber === 2}
      />
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '16px',
          color: locationNumber < 2 ? Colors.brown : Colors.green,
        }}
      >
        Выбор доп.услуг
      </span>
      <Line
        width={40}
        color={locationNumber < 3 ? Colors.brown : Colors.green}
        dashed={locationNumber < 4}
      />
      <Dot
        size={12}
        color={locationNumber < 3 ? Colors.brown : Colors.green}
        border={locationNumber === 3}
      />
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '16px',
          color: locationNumber < 3 ? Colors.brown : Colors.green,
        }}
      >
        Данные и оплата
      </span>
      <Line
        width={40}
        color={locationNumber < 4 ? Colors.brown : Colors.green}
        dashed={locationNumber < 4}
      />
      <Dot size={12} color={locationNumber < 4 ? Colors.brown : Colors.green} />
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '16px',
          color: locationNumber < 4 ? Colors.brown : Colors.green,
        }}
      >
        Бронирование подтверждено
      </span>
    </div>
  );
};

const getLocationNumber = (path: string): number => {
  const page = path.split('/')?.[1];
  if (!page) return 0;
  switch (page) {
    case 'accommodation':
      return 1;
    case 'services':
      return 2;
    case 'payment':
      return 3;
    default:
      return 0;
  }
};

export default NavBar;
