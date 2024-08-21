import { Colors, Fonts } from '@/consts';
import { HotelInfo } from '@/interfaces/HotelInfo';
import { RoomAvailability } from '@/interfaces/RoomAvailability';
import { ParamService } from '@/store/slices/params';
import UUserSvg from '@/assets/icons/u_user.svg';
import numWordEnding from '@/utils/numWordEnding';
import checkCircleSvg from '@/assets/icons/check_circle.svg';
import Button from '../../baseComponents/Button';
import NumPicker from '../../inputs/NumPicker';
import { useAppSelector } from '@/store';

interface IServicesProps {
  availableServices: RoomAvailability['rooms'][number]['services'];
  services: ParamService[];
  hotelServices: HotelInfo['hotels'][number]['services'];
  addService: (
    id: string,
    age_group?: { id: number; count: number; placement_index: number }[],
  ) => void;
  removeService: (
    id: string,
    age_group?: { id: number; count: number }[],
  ) => void;
  guests: { age_group: number; count: number }[];
  nights: number;
}
const Services = ({
  availableServices,
  services,
  hotelServices,
  addService,
  removeService,
  guests,
  nights,
}: IServicesProps) => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <>
      {availableServices.map(availableService => {
        const hotelService = hotelServices.find(
          it => it.code === availableService.code,
        );
        const service = services.find(it => it.id === availableService.code);
        if (hotelService === undefined) return null;
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? 24 : 32,
              padding: mobile ? 20 : 24,
              boxSizing: 'border-box',
              width: '100%',
              backgroundColor: Colors.white2,
              borderRadius: 8,
            }}
            key={availableService.code}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: mobile ? 8 : 16,
              }}
            >
              <span
                style={{
                  fontFamily: Fonts.Inter,
                  fontWeight: 500,
                  fontSize: mobile ? 16 : 24,
                  lineHeight: 1.2,
                  color: Colors.black,
                }}
              >
                {hotelService.name}
              </span>
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 400,
                  fontSize: mobile ? 14 : 16,
                  lineHeight: mobile ? 1.4 : 1,
                  color: Colors.brown,
                }}
              >
                {hotelService.description}
              </span>
            </div>
            {availableService.prices !== undefined ? (
              service?.counts !== undefined ? (
                availableService.prices?.map((pr, ind) => {
                  const count = service.counts?.find(
                    c => c.age_group === pr.age_group,
                  );
                  if (!pr) return null;
                  return (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: mobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: mobile ? 'flex-start' : 'center',
                        borderTop: '1px solid ' + Colors.white5,
                        paddingTop: 24,
                        gap: mobile ? 16 : undefined,
                      }}
                      key={ind}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 7,
                          alignItems: 'center',
                        }}
                      >
                        <img src={UUserSvg} />
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 600,
                            fontSize: 16,
                            lineHeight: 1,
                            color: Colors.green,
                          }}
                        >{`За ${count?.count || 1} ${numWordEnding(
                          count?.count || 1,
                          pr.age_group === 1419
                            ? [
                                'ребенка (0-6 лет)',
                                'ребенка (0-6 лет)',
                                'детей (0-6 лет)',
                              ]
                            : pr.age_group === 1420
                            ? [
                                'ребенка (6-12 лет)',
                                'ребенка (6-12 лет)',
                                'детей (6-12 лет)',
                              ]
                            : ['взрослого', 'взрослых', 'взрослых'],
                        )}, ${nights} ноч${numWordEnding(nights, [
                          'ь',
                          'и',
                          'ей',
                        ])}`}</span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: mobile ? 'column' : 'row',
                          gap: 16,
                          alignItems: mobile ? 'flex-start' : 'center',
                          width: mobile ? '100%' : undefined,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: Fonts.Inter,
                            fontWeight: 600,
                            fontSize: mobile ? 20 : 24,
                            lineHeight: 1,
                            color: Colors.black,
                          }}
                        >
                          {pr.price !== 0
                            ? `${
                                count?.count !== undefined
                                  ? pr.price * count.count
                                  : pr.price
                              } ₽`
                            : 'Бесплатно'}
                        </span>
                        <NumPicker
                          value={count?.count || 0}
                          style={{
                            width: mobile ? '100%' : 155,
                            padding: 0,
                            border: 'none',
                          }}
                          buttonsStyle={{
                            width: mobile ? 46 : 48,
                            height: mobile ? 46 : 48,
                            borderRadius: 8,
                          }}
                          textStyle={{
                            fontFamily: Fonts.Inter,
                            fontSize: mobile ? 20 : 24,
                            color: Colors.green,
                          }}
                          buttonTextStyle={{ fontSize: 24 }}
                          min={0}
                          max={
                            guests.find(g => pr.age_group === g.age_group)
                              ?.count
                          }
                          onChange={val => {
                            if (!count || val > count.count) {
                              addService(availableService.code, [
                                {
                                  id: pr.age_group,
                                  count: 1,
                                  placement_index: pr.placement_index,
                                },
                              ]);
                              return;
                            }
                            if (val < count.count) {
                              removeService(availableService.code, [
                                { id: pr.age_group, count: 1 },
                              ]);
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: mobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: mobile ? 'flex-start' : 'center',
                    borderTop: '1px solid ' + Colors.white5,
                    paddingTop: 24,
                    gap: mobile ? 16 : undefined,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 7,
                      alignItems: 'center',
                    }}
                  >
                    <img src={UUserSvg} />
                    <span
                      style={{
                        fontFamily: Fonts.Manrope,
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: 1,
                        color: Colors.brown,
                      }}
                    >{`За ${
                      guests.length
                        ? guests.map(i => i.count).reduce((pr, cur) => pr + cur)
                        : 0
                    } гост${numWordEnding(
                      guests.length
                        ? guests.map(i => i.count).reduce((pr, cur) => pr + cur)
                        : 0,
                      ['я', 'ей', 'ей'],
                    )}, ${nights} ноч${numWordEnding(nights, [
                      'ь',
                      'и',
                      'ей',
                    ])}`}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: mobile ? 'column' : 'row',
                      gap: 16,
                      alignItems: mobile ? 'flex-start' : 'center',
                      width: mobile ? '100%' : undefined,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: Fonts.Inter,
                        fontWeight: 600,
                        fontSize: mobile ? 20 : 24,
                        lineHeight: 1,
                        color: Colors.black,
                      }}
                    >
                      {guests.length
                        ? guests
                            .map(
                              i =>
                                (availableService.prices?.find(
                                  pr => pr.age_group === i.age_group,
                                )?.price || 0) * i.count,
                            )
                            .reduce((pr, cur) => pr + cur)
                        : 0}{' '}
                      ₽
                    </span>
                    <Button
                      style={{
                        height: mobile ? 46 : 48,
                        cursor: 'pointer',
                        ...(mobile ? { width: '100%' } : { paddingInline: 40 }),
                      }}
                      onClick={() =>
                        addService(
                          availableService.code,
                          guests.map(g => ({
                            id: g.age_group,
                            count: g.count,
                            placement_index:
                              availableService.prices?.find(
                                pr => pr.age_group === g.age_group,
                              )?.placement_index || 0,
                          })),
                        )
                      }
                    >
                      <span
                        style={{
                          fontFamily: Fonts.Manrope,
                          fontWeight: 700,
                          fontSize: mobile ? 14 : 16,
                          lineHeight: 1,
                          letterSpacing: '-0.02em',
                          color: '#ffffff',
                        }}
                      >
                        Добавить
                      </span>
                    </Button>
                  </div>
                </div>
              )
            ) : null}
            {availableService.price !== undefined ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: mobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  alignItems: mobile ? 'flex-start' : 'center',
                  borderTop: '1px solid ' + Colors.white5,
                  paddingTop: 24,
                  gap: mobile ? 16 : undefined,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 7,
                    alignItems: 'center',
                  }}
                >
                  <img src={UUserSvg} />
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 600,
                      fontSize: 16,
                      lineHeight: 1,
                      color:
                        service?.count !== undefined && service.count > 0
                          ? Colors.green
                          : Colors.brown,
                    }}
                  >
                    За 1 для всех гостей
                  </span>
                </div>
                {availableService.inclusive ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      height: mobile ? 46 : 48,
                      backgroundColor: 'rgba(13, 136, 129, 0.4)',
                      borderRadius: 8,
                      ...(mobile ? { width: '100%' } : { paddingInline: 40 }),
                    }}
                  >
                    <span
                      style={{
                        fontFamily: Fonts.Manrope,
                        fontWeight: 700,
                        fontSize: mobile ? 14 : 16,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        color: Colors.green,
                      }}
                    >
                      Услуга включена
                    </span>
                    <img src={checkCircleSvg} />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: mobile ? 'column' : 'row',
                      gap: 16,
                      alignItems: mobile ? 'flex-start' : 'center',
                      width: mobile ? '100%' : undefined,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: Fonts.Inter,
                        fontWeight: 600,
                        fontSize: mobile ? 20 : 24,
                        lineHeight: 1,
                        color: Colors.black,
                      }}
                    >
                      {availableService.price} ₽
                    </span>
                    {service?.count !== undefined && service.count > 0 ? (
                      <NumPicker
                        value={service.count}
                        style={{
                          width: mobile ? '100%' : 155,
                          padding: 0,
                          border: 'none',
                        }}
                        buttonsStyle={{
                          width: mobile ? 46 : 48,
                          height: mobile ? 46 : 48,
                          borderRadius: 8,
                        }}
                        textStyle={{
                          fontFamily: Fonts.Inter,
                          fontSize: mobile ? 20 : 24,
                          color: Colors.green,
                        }}
                        buttonTextStyle={{ fontSize: 24 }}
                        min={0}
                        max={1}
                        onChange={val => {
                          if (service.count === undefined) return;
                          if (val > service.count) {
                            addService(availableService.code);
                            return;
                          }
                          if (val < service.count)
                            removeService(availableService.code);
                        }}
                      />
                    ) : (
                      <Button
                        style={{
                          height: mobile ? 46 : 48,
                          cursor: 'pointer',
                          ...(mobile
                            ? { width: '100%' }
                            : { paddingInline: 40 }),
                        }}
                        onClick={() => addService(availableService.code)}
                      >
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 700,
                            fontSize: mobile ? 14 : 16,
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                          }}
                        >
                          Добавить
                        </span>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Services;
