import UserSvg from '@/assets/icons/user2.svg';
import UsersSvg from '@/assets/icons/users.svg';
import PlusSvg from '@/assets/icons/+.svg';
import ChildSvg from '@/assets/icons/child.svg';
import { Colors, Fonts } from '@/consts';

interface IRatePlanIconsProps {
  type: string;
}
const RatePlanIcons = ({ type }: IRatePlanIconsProps) => {
  const [adults, extraAdults, children] = type.split('-').map(i => +i);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
      }}
    >
      {adults > 2 ? (
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 500,
            fontSize: 20,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: Colors.green,
          }}
        >
          {adults}
        </span>
      ) : null}
      {adults === 2 ? <img src={UsersSvg} /> : <img src={UserSvg} />}
      {extraAdults > 0 ? (
        <>
          <img src={PlusSvg} />
          {extraAdults > 2 ? (
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 500,
                fontSize: 20,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.green,
              }}
            >
              {extraAdults}
            </span>
          ) : null}
          {extraAdults === 2 ? <img src={UsersSvg} /> : <img src={UserSvg} />}
        </>
      ) : null}
      {children > 0 ? (
        <>
          <img src={PlusSvg} />
          {children > 1 ? (
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 500,
                fontSize: 20,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.green,
              }}
            >
              {children}
            </span>
          ) : null}
          <img src={ChildSvg} />
        </>
      ) : null}
    </div>
  );
};

export default RatePlanIcons;
