import { Colors, dataCodes, Fonts } from '@/consts';
import CrossIcon from '@/assets/icons/cross2.svg';
import HomeSvg from '@/assets/icons/Home.svg';
import UserSvg from '@/assets/icons/User.svg';
import { useAppSelector } from '@/store';
import { HotelInfo } from '@/interfaces/HotelInfo';
import ImageHorList from '@/components/baseComponents/ImageHorList';
import { AmenityCard } from '@/components/baseComponents/AmenityCard';

interface IAboutRoomProps {
  roomHotel: HotelInfo['hotels'][number]['room_types'][number];
  hide: () => void;
}
const AboutRoom = ({ roomHotel, hide }: IAboutRoomProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <>
      <div
        style={{
          padding: mobile ? '40px 20px 0px' : '40px 40px 0px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
        }}
        onClick={hide}
      >
        <span
          style={{
            fontFamily: Fonts.Oranienbaum,
            fontWeight: 400,
            fontSize: mobile ? 32 : 40,
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {roomHotel.name}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: mobile ? 32 : 40,
            height: mobile ? 32 : 40,
            backgroundColor: Colors.white,
            borderRadius: 100,
            cursor: 'pointer',
          }}
        >
          <img
            src={CrossIcon}
            style={mobile ? { transform: 'scale(0.8)' } : undefined}
          />
        </div>
      </div>
      <ImageHorList
        images={roomHotel.images}
        imageSize={
          mobile ? { width: 240, height: 200 } : { width: 320, height: 260 }
        }
      />
      {!!roomHotel.amenities.length && (
        <div
          style={{
            marginInline: mobile ? 20 : 40,
            width: 'calc(100% - ' + `${mobile ? 40 : 80}` + 'px)',
            padding: 16,
            borderRadius: 8,
            backgroundColor: Colors.white,
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            flexWrap: 'wrap',
            boxSizing: 'border-box',
          }}
        >
          {roomHotel.amenities.map((it, ind) => (
            <AmenityCard amenity={it} full key={ind} />
          ))}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          paddingInline: mobile ? 20 : 40,
          width: '100%',
          boxSizing: 'border-box',
          flexDirection: mobile ? 'column' : 'row',
          gap: 20,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              <img src={HomeSvg} style={{ width: 20, height: 20 }} />
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: Colors.black2,
                }}
              >
                Площадь:
              </span>
            </div>
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.6,
                color: Colors.black2,
                opacity: 0.6,
              }}
            >
              {`${roomHotel.size.value} ${
                dataCodes.sizeUnits?.[roomHotel.size.unit] || ''
              }`}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
              }}
            >
              <img src={UserSvg} style={{ width: 20, height: 20 }} />
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: Colors.black2,
                }}
              >
                Вместимость:
              </span>
            </div>
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.6,
                color: Colors.black2,
                opacity: 0.6,
              }}
            >
              {`${roomHotel.max_occupancy}`}
            </span>
          </div>
          {roomHotel.max_occupancy !== roomHotel.max_adult_occupancy &&
            roomHotel.max_extra_bed_occupancy > 0 && (
              <div style={{ paddingLeft: 24 }}>
                <span
                  style={{
                    fontFamily: Fonts.Manrope,
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: Colors.brown3,
                  }}
                >{`${roomHotel.max_adult_occupancy} основн${
                  roomHotel.max_adult_occupancy === 1 ? 'ое' : 'ых'
                } мест${
                  roomHotel.max_adult_occupancy === 1
                    ? 'о'
                    : roomHotel.max_adult_occupancy > 4
                    ? ''
                    : 'а'
                } + ${roomHotel.max_extra_bed_occupancy} доп. мест${
                  roomHotel.max_extra_bed_occupancy === 1 ? 'о' : 'а'
                }`}</span>
              </div>
            )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.4,
              color: Colors.black,
            }}
          >
            {roomHotel.description}
          </span>
        </div>
      </div>
    </>
  );
};

export default AboutRoom;
