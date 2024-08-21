import { Colors, dataCodes, Fonts } from '@/consts';
import { useAppSelector } from '@/store';
import ExpandArrowsIcon from '@/assets/icons/expandArrows.svg';
import { AmenityCard } from '@/components/baseComponents/AmenityCard';
import { HotelInfo } from '@/interfaces/HotelInfo';
import { RoomAvailability } from '@/interfaces/RoomAvailability';
import RoomCardButtons from './RoomCardButtons';

interface IRoomCardProps {
  roomHotel: HotelInfo['hotels'][number]['room_types'][number];
  roomAvailable?: RoomAvailability['rooms'][number];
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  last?: boolean;
  onSelect?: (roomType: string) => void;
}
const RoomCard = ({
  roomHotel,
  roomAvailable,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  last = false,
  onSelect,
}: IRoomCardProps) => {
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: mobile ? 'column' : 'row',
        height: mobile
          ? undefined
          : mainData !== undefined &&
            mainData.adults
              .map(
                (_, ind) =>
                  `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
              )
              .filter((i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind)
              .length > 1 &&
            roomAvailable !== undefined &&
            roomAvailable.rate_plans.length > 1
          ? 428 +
            (mainData.adults
              .map(
                (_, ind) =>
                  `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
              )
              .filter((i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind)
              .length -
              1) *
              60
          : 400,
        gap: mobile ? 8 : 12,
      }}
      key={roomHotel.code}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '100%' }}>
          <img
            src={roomHotel.images?.[0].url}
            style={{
              width: '100%',
              height: mobile ? 200 : '100%',
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            backgroundColor: Colors.white2,
            borderRadius: 8,
            padding: mobile ? 20 : '23px 24px',
            boxSizing: 'border-box',
            gap: mobile ? 24 : 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? 12 : 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: Fonts.Oranienbaum,
                  fontWeight: 400,
                  fontSize: mobile ? 24 : 32,
                  lineHeight: mobile ? '24px' : '32px',
                  color: Colors.black,
                  maxWidth: mobile
                    ? document.body.clientWidth - 80
                    : (document.body.clientWidth - 172) / 2 - 48,
                  overflowX: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {roomHotel.name}
              </span>
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: '19.6px',
                  color: Colors.brown,
                  height: mobile ? undefined : 60,
                }}
              >
                {roomHotel.description.length > 200
                  ? roomHotel.description.slice(0, 200) + '...'
                  : roomHotel.description}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <img
                src={ExpandArrowsIcon}
                alt="expArr svg"
                style={{ width: mobile ? 16 : 20, height: mobile ? 16 : 20 }}
              />
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 600,
                  fontSize: mobile ? 14 : 16,
                  lineHeight: mobile ? '22px' : '25.6px',
                  height: mobile ? 22 : 26,
                  color: Colors.black,
                }}
              >{`${roomHotel.size.value} ${
                dataCodes.sizeUnits?.[roomHotel.size.unit] || ''
              }`}</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                flexWrap: 'wrap',
                height: mobile ? undefined : 36,
              }}
            >
              {!!roomHotel.amenities.length &&
                roomHotel.amenities
                  .slice(0, 8)
                  .map(it => <AmenityCard amenity={it} key={it.name} />)}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap:
                roomAvailable !== undefined &&
                roomAvailable.rate_plans.length > 1
                  ? 40
                  : 12,
            }}
          >
            {roomAvailable !== undefined ? (
              mainData !== undefined &&
              mainData.adults
                .map(
                  (_, ind) =>
                    `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
                )
                .filter(
                  (i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind,
                ).length === 1 ? (
                <span
                  style={{
                    fontFamily: Fonts.Manrope,
                    fontWeight: 600,
                    fontSize: mobile ? 24 : 32,
                    lineHeight: mobile ? '24px' : '32px',
                    letterSpacing: 'calc(-1em / 25)',
                    color: Colors.black,
                  }}
                >
                  {roomAvailable.rate_plans[0].price.price_after_tax + ' ₽'}
                </span>
              ) : null
            ) : mobile ? null : (
              <div style={{ height: 32 }} />
            )}
            <RoomCardButtons
              roomHotel={roomHotel}
              roomAvailable={roomAvailable}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onSelect={onSelect}
              last={last}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
