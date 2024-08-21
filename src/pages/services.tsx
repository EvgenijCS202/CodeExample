import { AmenityCard } from '@/components/baseComponents/AmenityCard';
import ServicesShort from '@/components/pageComponents/servicesPage/ServicesShort';
import { Colors, dataCodes, Fonts } from '@/consts';
import { useAppDispatch, useAppSelector } from '@/store';
import addDays from '@/utils/addDays';
import getNumText from '@/utils/getNumText';
import numWordEnding from '@/utils/numWordEnding';
import { useNavigate, useParams } from 'react-router-dom';
import ExpandArrowsIcon from '@/assets/icons/expandArrows.svg';
import Services from '@/components/pageComponents/servicesPage/Services';
import { Fragment, useEffect } from 'react';
import { setRooms } from '@/store/slices/params';
import Button from '@/components/baseComponents/Button';
import Title from '@/components/navigation/Title';

const ServicesPage = () => {
  const { ind: indRaw } = useParams();
  const navigate = useNavigate();
  const ind = indRaw !== undefined && !isNaN(+indRaw) ? +indRaw - 1 : null;
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.paramsStore.rooms);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const hotel = useAppSelector(state => state.paramsStore.hotel);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const roomHotel =
    ind !== null && ind < rooms.length && ind >= 0
      ? rooms[ind].room_hotel
      : undefined;
  const hotelFoodService =
    hotel?.services.filter(it => it.category_code === '6215') || [];
  const hotelFoodServiceIds = hotelFoodService.map(it => it.code);
  const hotelOthersService =
    hotel?.services.filter(it => it.category_code !== '6215') || [];
  const hotelOthersServiceIds = hotelOthersService.map(it => it.code);
  useEffect(() => {
    if (mobile) return;
    const onScroll = () => {
      const servicesInfo =
        document.querySelector<HTMLDivElement>('.services-info');
      if (!servicesInfo) return;
      if (document.documentElement.scrollTop < 156) {
        servicesInfo.style.top = `${
          32 + (156 - document.documentElement.scrollTop)
        }px`;
      } else servicesInfo.style.top = '32px';
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [mobile]);

  useEffect(() => {
    setTimeout(() =>
      document.documentElement.scroll({ top: 0, behavior: 'smooth' }),
    );
  }, [indRaw]);

  if (ind === null || !rooms.length || roomHotel === undefined) return;
  if (ind > rooms.length) return 'Что-то пошло не так';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Title
        title={
          'Выберите услуги' +
          (rooms.length > 1 ? ` для ${getNumText(ind + 1)} номера` : '')
        }
        goBack
      />

      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 40 : 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: mobile ? 40 : 60,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: mobile ? 'column' : 'row',
              gap: mobile ? 8 : 12,
              height: mobile ? undefined : 336,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <img
                src={roomHotel.images[0].url}
                style={{
                  display: 'flex',
                  width: '100%',
                  height: mobile ? 200 : '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
                padding: mobile ? 20 : '23px 24px',
                boxSizing: 'border-box',
                backgroundColor: Colors.white2,
                borderRadius: 8,
                gap: mobile ? 24 : undefined,
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Oranienbaum,
                      fontWeight: 400,
                      fontSize: mobile ? 24 : 32,
                      lineHeight: mobile ? '24px' : '32px',
                      color: Colors.black,
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
                      height: mobile ? undefined : 80,
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
                    style={{
                      width: mobile ? 16 : 20,
                      height: mobile ? 16 : 20,
                    }}
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
                  }}
                >
                  {!!roomHotel.amenities.length &&
                    roomHotel.amenities
                      .slice(0, 8)
                      .map(it => <AmenityCard amenity={it} key={it.name} />)}
                </div>
              </div>
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: Colors.black,
                }}
              >
                {rooms[ind].price?.price_after_tax + ' ₽'}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? 32 : 40,
            }}
          >
            {!!rooms[ind].room_available?.services.filter(it =>
              hotelFoodServiceIds.includes(it.code),
            ).length && (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <span
                  style={{
                    fontFamily: Fonts.Oranienbaum,
                    fontWeight: 400,
                    fontSize: 32,
                    lineHeight: 1,
                    color: Colors.black,
                  }}
                >
                  Питание
                </span>
                <Services
                  availableServices={rooms[ind].room_available?.services.filter(
                    it => hotelFoodServiceIds.includes(it.code),
                  )}
                  services={rooms[ind].services?.food || []}
                  hotelServices={hotelFoodService}
                  addService={(id, age_group) => {
                    const { services, ...other } = rooms[ind];
                    if (services === undefined) return;
                    const foundInd = services.food.findIndex(
                      ser => ser.id === id,
                    );
                    if (foundInd !== -1) {
                      if (age_group === undefined) {
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food,
                                  {
                                    id,
                                    count:
                                      (services.food[foundInd].count || 0) + 1,
                                  },
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      } else {
                        if (!services.food[foundInd].counts) return;
                        const counts = [
                          ...services.food[foundInd].counts.filter(
                            c =>
                              !age_group.map(ag => ag.id).includes(c.age_group),
                          ),
                          ...age_group.map(ag => {
                            const ag_found = services.food[
                              foundInd
                            ].counts?.find(c => c.age_group === ag.id);
                            return {
                              age_group: ag.id,
                              count:
                                ag_found === undefined
                                  ? ag.count
                                  : ag.count + ag_found.count,
                              placement_index: ag.placement_index,
                            };
                          }),
                        ];
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food.slice(0, foundInd),
                                  {
                                    id: services.food[foundInd].id,
                                    counts,
                                  },
                                  ...services.food.slice(foundInd + 1),
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      }
                    } else
                      dispatch(
                        setRooms([
                          ...rooms.slice(0, ind),
                          {
                            ...other,
                            services: {
                              food: [
                                ...services.food,
                                age_group !== undefined
                                  ? {
                                      id,
                                      counts: age_group.map(i => ({
                                        age_group: i.id,
                                        count: i.count,
                                        placement_index: i.placement_index,
                                      })),
                                    }
                                  : { id, count: 1 },
                              ],
                              others: services.others,
                            },
                          },
                          ...rooms.slice(ind + 1),
                        ]),
                      );
                  }}
                  removeService={(id, age_group) => {
                    const { services, ...other } = rooms[ind];
                    if (services === undefined) return;
                    const foundInd = services?.food.findIndex(
                      ser => ser.id === id,
                    );
                    if (foundInd === -1) return;
                    if (age_group !== undefined) {
                      if (!services.food[foundInd].counts) return;
                      const counts = [
                        ...services.food[foundInd].counts.filter(
                          c =>
                            !age_group.map(ag => ag.id).includes(c.age_group),
                        ),
                        ...age_group
                          .map(ag => {
                            const ag_found = services.food[
                              foundInd
                            ].counts?.find(c => c.age_group === ag.id);
                            if (
                              ag_found === undefined ||
                              ag_found.count - ag.count < 1
                            )
                              return null;
                            return {
                              age_group: ag.id,
                              count: ag_found.count - ag.count,
                              placement_index: ag_found.placement_index,
                            };
                          })
                          .filter(it => it !== null),
                      ];
                      if (counts.length)
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food.slice(0, foundInd),
                                  {
                                    id: services.food[foundInd].id,
                                    counts,
                                  },
                                  ...services.food.slice(foundInd + 1),
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      else
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food.slice(0, foundInd),
                                  ...services.food.slice(foundInd + 1),
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                    } else {
                      if (services.food[foundInd].count === undefined) return;
                      if (services.food[foundInd].count > 1)
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food.slice(0, foundInd),
                                  {
                                    id: services.food[foundInd].id,
                                    count: services.food[foundInd].count - 1,
                                  },
                                  ...services.food.slice(foundInd + 1),
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      else
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: [
                                  ...services.food.slice(0, foundInd),
                                  ...services.food.slice(foundInd + 1),
                                ],
                                others: services.others,
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                    }
                  }}
                  guests={
                    mainData !== undefined
                      ? [
                          {
                            age_group: 0,
                            count: mainData.adults[ind],
                          },
                          {
                            age_group: 1420,
                            count: mainData.childrenAge[ind].filter(
                              age => age >= 6 && age < 12,
                            ).length,
                          },
                          {
                            age_group: 1419,
                            count: mainData.childrenAge[ind].filter(
                              age => age >= 0 && age < 6,
                            ).length,
                          },
                        ].filter(i => i.count)
                      : []
                  }
                  nights={mainData?.nights || 1}
                />
              </div>
            )}
            {!!rooms[ind].room_available?.services.filter(it =>
              hotelOthersServiceIds.includes(it.code),
            ).length && (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <span
                  style={{
                    fontFamily: Fonts.Oranienbaum,
                    fontWeight: 400,
                    fontSize: 32,
                    lineHeight: 1,
                    color: Colors.black,
                  }}
                >
                  Дополнительные услуги
                </span>
                <Services
                  availableServices={rooms[ind].room_available?.services.filter(
                    it => hotelOthersServiceIds.includes(it.code),
                  )}
                  services={rooms[ind].services?.others || []}
                  hotelServices={hotelOthersService}
                  addService={(id, age_group) => {
                    const { services, ...other } = rooms[ind];
                    if (services === undefined) return;
                    const foundInd = services.others.findIndex(
                      ser => ser.id === id,
                    );
                    if (foundInd !== -1) {
                      if (age_group === undefined) {
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others,
                                  {
                                    id,
                                    count:
                                      (services.others[foundInd].count || 0) +
                                      1,
                                  },
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      } else {
                        if (!services.others[foundInd].counts) return;
                        const counts = [
                          ...services.others[foundInd].counts.filter(
                            c =>
                              !age_group.map(ag => ag.id).includes(c.age_group),
                          ),
                          ...age_group.map(ag => {
                            const ag_found = services.others[
                              foundInd
                            ].counts?.find(c => c.age_group === ag.id);
                            return {
                              age_group: ag.id,
                              count:
                                ag_found === undefined
                                  ? ag.count
                                  : ag.count + ag_found.count,
                              placement_index: ag.placement_index,
                            };
                          }),
                        ];
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others.slice(0, foundInd),
                                  {
                                    id: services.others[foundInd].id,
                                    counts,
                                  },
                                  ...services.others.slice(foundInd + 1),
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      }
                    } else
                      dispatch(
                        setRooms([
                          ...rooms.slice(0, ind),
                          {
                            ...other,
                            services: {
                              food: services.food,
                              others: [
                                ...services.others,
                                age_group !== undefined
                                  ? {
                                      id,
                                      counts: age_group.map(i => ({
                                        age_group: i.id,
                                        count: i.count,
                                        placement_index: i.placement_index,
                                      })),
                                    }
                                  : { id, count: 1 },
                              ],
                            },
                          },
                          ...rooms.slice(ind + 1),
                        ]),
                      );
                  }}
                  removeService={(id, age_group) => {
                    const { services, ...other } = rooms[ind];
                    if (services === undefined) return;
                    const foundInd = services?.others.findIndex(
                      ser => ser.id === id,
                    );
                    if (foundInd === -1) return;
                    if (age_group !== undefined) {
                      if (!services.others[foundInd].counts) return;
                      const counts = [
                        ...services.others[foundInd].counts.filter(
                          c =>
                            !age_group.map(ag => ag.id).includes(c.age_group),
                        ),
                        ...age_group
                          .map(ag => {
                            const ag_found = services.others[
                              foundInd
                            ].counts?.find(c => c.age_group === ag.id);
                            if (
                              ag_found === undefined ||
                              ag_found.count - ag.count < 1
                            )
                              return null;
                            return {
                              age_group: ag.id,
                              count: ag_found.count - ag.count,
                              placement_index: ag_found.placement_index,
                            };
                          })
                          .filter(it => it !== null),
                      ];
                      if (counts.length)
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others.slice(0, foundInd),
                                  {
                                    id: services.others[foundInd].id,
                                    counts,
                                  },
                                  ...services.others.slice(foundInd + 1),
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      else
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others.slice(0, foundInd),
                                  ...services.others.slice(foundInd + 1),
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                    } else {
                      if (services.others[foundInd].count === undefined) return;
                      if (services.others[foundInd].count > 1)
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others.slice(0, foundInd),
                                  {
                                    id: services.others[foundInd].id,
                                    count: services.others[foundInd].count - 1,
                                  },
                                  ...services.others.slice(foundInd + 1),
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                      else
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, ind),
                            {
                              ...other,
                              services: {
                                food: services.food,
                                others: [
                                  ...services.others.slice(0, foundInd),
                                  ...services.others.slice(foundInd + 1),
                                ],
                              },
                            },
                            ...rooms.slice(ind + 1),
                          ]),
                        );
                    }
                  }}
                  guests={
                    mainData !== undefined
                      ? [
                          {
                            age_group: 0,
                            count: mainData.adults[ind],
                          },
                          {
                            age_group: 1420,
                            count: mainData.childrenAge[ind].filter(
                              age => age >= 6 && age < 12,
                            ).length,
                          },
                          {
                            age_group: 1419,
                            count: mainData.childrenAge[ind].filter(
                              age => age >= 0 && age < 6,
                            ).length,
                          },
                        ].filter(i => i.count)
                      : []
                  }
                  nights={mainData?.nights || 1}
                />
              </div>
            )}
          </div>
        </div>
        {!mobile && <div style={{ width: 333, minWidth: 333 }} />}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: mobile ? 20 : 24,
            padding: 24,
            paddingRight: 10,
            borderRadius: 8,
            backgroundColor: Colors.white2,
            boxSizing: 'border-box',
            height: 'fit-content',
            ...(mobile
              ? {
                  width: '100%',
                }
              : {
                  position: 'fixed',
                  top: 32,
                  right: 80,
                  width: 333,
                  minWidth: 333,
                  maxHeight: 'calc(100vh - 64px)',
                }),
          }}
          className="services-info"
        >
          <span
            style={{
              fontFamily: Fonts.Oranienbaum,
              fontWeight: 400,
              fontSize: 32,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: Colors.black,
              marginRight: 14,
            }}
          >
            Ваше бронирование
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? 16 : 24,
              ...(mobile
                ? { marginRight: 14 }
                : {
                    overflowY: 'auto',
                    paddingRight: 10,
                  }),
            }}
            className={mobile ? undefined : 'scroll-container'}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: mobile ? 16 : 20,
              }}
            >
              {rooms.length > 1 ? (
                rooms.map((r, ind) => (
                  <Fragment key={ind}>
                    {ind > 0 && (
                      <div
                        style={{
                          width: '100%',
                          borderTop: '1px solid ' + Colors.white5,
                        }}
                      />
                    )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 20,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 700,
                            fontSize: mobile ? 14 : 16,
                            lineHeight: 1,
                            color: Colors.brown,
                          }}
                        >
                          {r.room_hotel?.name}
                        </span>
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 700,
                            fontSize: mobile ? 14 : 16,
                            lineHeight: 1,
                            color: Colors.black,
                          }}
                        >
                          {r.price?.price_after_tax}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 400,
                            fontSize: mobile ? 14 : 16,
                            lineHeight: 1,
                            color: Colors.brown,
                          }}
                        >
                          {mainData !== undefined
                            ? `${mainData.date.toLocaleString('ru-ru', {
                                day: 'numeric',
                                month: 'long',
                              })} — ${addDays(
                                mainData.date,
                                mainData.nights,
                              ).toLocaleString('ru-ru', {
                                day: 'numeric',
                                month: 'long',
                              })}`
                            : ''}
                        </span>
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 700,
                            fontSize: mobile ? 14 : 16,
                            lineHeight: 1,
                            color: Colors.brown,
                          }}
                        >
                          {mainData !== undefined
                            ? `${mainData.nights} ноч${numWordEnding(
                                mainData.nights,
                                ['ь', 'и', 'ей'],
                              )}`
                            : ''}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: Fonts.Manrope,
                          fontWeight: 400,
                          fontSize: mobile ? 14 : 16,
                          lineHeight: 1,
                          color: Colors.brown,
                        }}
                      >
                        {mainData !== undefined
                          ? `${mainData.adults?.[ind]} взрослы${numWordEnding(
                              mainData.adults?.[ind] || 1,
                              ['й', 'х', 'х'],
                            )}` +
                            (mainData.childrenAge?.[ind]?.length > 0
                              ? `, ${
                                  mainData.childrenAge[ind].length
                                } ${numWordEnding(
                                  mainData.childrenAge[ind].length,
                                  ['ребенок', 'ребенка', 'детей'],
                                )}`
                              : '')
                          : ''}
                      </span>
                    </div>
                  </Fragment>
                ))
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: Fonts.Manrope,
                        fontWeight: 400,
                        fontSize: mobile ? 14 : 16,
                        lineHeight: 1,
                        color: Colors.brown,
                      }}
                    >
                      {mainData !== undefined
                        ? `${mainData.date.toLocaleString('ru-ru', {
                            day: 'numeric',
                            month: 'long',
                          })} — ${addDays(
                            mainData.date,
                            mainData.nights,
                          ).toLocaleString('ru-ru', {
                            day: 'numeric',
                            month: 'long',
                          })}`
                        : ''}
                    </span>
                    <span
                      style={{
                        fontFamily: Fonts.Manrope,
                        fontWeight: 700,
                        fontSize: mobile ? 14 : 16,
                        lineHeight: 1,
                        color: Colors.brown,
                      }}
                    >
                      {mainData !== undefined
                        ? `${mainData.nights} ноч${numWordEnding(
                            mainData.nights,
                            ['ь', 'и', 'ей'],
                          )}`
                        : ''}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 400,
                      fontSize: mobile ? 14 : 16,
                      lineHeight: 1,
                      color: Colors.brown,
                    }}
                  >
                    {mainData !== undefined
                      ? `${mainData.adults?.[0]} взрослы${numWordEnding(
                          mainData.adults?.[0] || 1,
                          ['й', 'х', 'х'],
                        )}` +
                        (mainData.childrenAge?.[0]?.length > 0
                          ? `, ${
                              mainData.childrenAge[0].length
                            } ${numWordEnding(mainData.childrenAge[0].length, [
                              'ребенок',
                              'ребенка',
                              'детей',
                            ])}`
                          : '')
                      : ''}
                  </span>
                </>
              )}
            </div>
            {rooms.length &&
            rooms
              .map(i => i.services?.food || [])
              .reduce((pr, cur) => [...pr, ...cur]).length ? (
              <>
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid ' + Colors.white5,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: mobile ? 16 : 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 700,
                      fontSize: mobile ? 14 : 16,
                      lineHeight: 1,
                      color: Colors.black,
                    }}
                  >
                    Питание
                  </span>
                  <ServicesShort
                    services={rooms
                      .map(i => i.services?.food || [])
                      .reduce((pr, cur) => [...pr, ...cur])}
                  />
                </div>
              </>
            ) : null}
            {rooms.length &&
            rooms
              .map(i => i.services?.others || [])
              .reduce((pr, cur) => [...pr, ...cur]).length ? (
              <>
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid ' + Colors.white5,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: mobile ? 16 : 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 700,
                      fontSize: mobile ? 14 : 16,
                      lineHeight: 1,
                      color: Colors.black,
                    }}
                  >
                    Дополнительные услуги
                  </span>
                  <ServicesShort
                    services={rooms
                      .map(i => i.services?.others || [])
                      .reduce((pr, cur) => [...pr, ...cur])}
                  />
                </div>
              </>
            ) : null}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              paddingRight: 14,
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: mobile ? 20 : 24,
                lineHeight: 1,
                color: Colors.black,
              }}
            >
              Итого
            </span>
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: mobile ? 20 : 24,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.black,
              }}
            >
              {rooms.length
                ? rooms
                    .map(r => {
                      if (r.price === undefined) return 0;

                      const foodServices = r.services?.food.map(s => {
                        const avService = r.room_available?.services.find(
                          ras => ras.code === s.id,
                        );
                        const avCounts = s.counts?.map(
                          sc =>
                            (avService?.prices?.find(
                              apr => apr.age_group === sc.age_group,
                            )?.price || 0) * sc.count,
                        );
                        return (
                          (avService?.price || 0) * (s.count || 0) +
                          (avCounts?.length
                            ? avCounts.reduce((pr, cur) => pr + cur)
                            : 0)
                        );
                      });
                      const otherServices = r.services?.others.map(s => {
                        const avService = r.room_available?.services.find(
                          ras => ras.code === s.id,
                        );
                        const avCounts = s.counts?.map(
                          sc =>
                            (avService?.prices?.find(
                              apr => apr.age_group === sc.age_group,
                            )?.price || 0) * sc.count,
                        );
                        return (
                          (avService?.price || 0) * (s.count || 0) +
                          (avCounts?.length
                            ? avCounts.reduce((pr, cur) => pr + cur)
                            : 0)
                        );
                      });
                      return (
                        r.price.price_after_tax +
                        (foodServices?.length
                          ? foodServices.reduce((pr, cur) => pr + cur)
                          : 0) +
                        (otherServices?.length
                          ? otherServices.reduce((pr, cur) => pr + cur)
                          : 0)
                      );
                    })
                    .reduce((pr, cur) => pr + cur)
                : 0}{' '}
              ₽
            </span>
          </div>
          <Button
            style={{
              marginRight: 14,
              height: mobile ? 46 : 58,
              cursor: 'pointer',
            }}
            onClick={() => {
              if (ind < rooms.length - 1) navigate(`/services/${ind + 2}`);
              else navigate('/payment');
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: 16,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              Продолжить
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
