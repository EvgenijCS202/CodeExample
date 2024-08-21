import Button from '@/components/baseComponents/Button';
import Input from '@/components/inputs/Input';
import ServicesShort from '@/components/pageComponents/servicesPage/ServicesShort';
import { Colors, Fonts } from '@/consts';
import { VerifyReservationQuery } from '@/interfaces/VerifyReservationQuery';
import { useAppSelector } from '@/store';
import addDays from '@/utils/addDays';
import numWordEnding from '@/utils/numWordEnding';
import { useVerifyReservationMutation } from '@/store/slices/api';
import { Fragment, useEffect, useState } from 'react';
import { QueryStatus } from '@reduxjs/toolkit/query';
import Loading from '@/components/baseComponents/Loading';
import CustomerMainInfo from '@/components/pageComponents/paymentPage/CustomerMainInfo';
import transformRoomsToVerifyQuery from '@/utils/transformRoomsToVerifyQuery';
import Title from '@/components/navigation/Title';

const PaymentPage = () => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const rooms = useAppSelector(state => state.paramsStore.rooms);
  const [verifyReservation, resultVerifyReservation] =
    useVerifyReservationMutation();
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  

  useEffect(() => {
    if (resultVerifyReservation.status !== QueryStatus.uninitialized) return;
    const room_stays: VerifyReservationQuery['hotel_reservations'][number]['room_stays'] =
      transformRoomsToVerifyQuery(rooms, mainData);
    verifyReservation({
      currency: 'RUB',
      hotel_reservations: [
        {
          hotel_ref: { code: '3172' },
          room_stays,
          services: [],
          transfers: [],
        },
      ],
      include_extra_stay_options: true,
      include_guarantee_options: true,
      language: 'ru-ru',
      point_of_sale: {
        integration_key: 'TL-INT-konakovo-camp_2024-04-09',
        referrer_url: 'https://konakovo.camp/',
        source: 'BS-XNP6m',
        source_url: '',
      },
    });
  }, [verifyReservation, rooms, mainData, resultVerifyReservation]);

  useEffect(() => {
    if (mobile) return;
    const onScroll = () => {
      const servicesInfo =
        document.querySelector<HTMLDivElement>('.payment-info');
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

  if (
    !resultVerifyReservation.data &&
    resultVerifyReservation.status === QueryStatus.pending
  )
    return <Loading />;
  if (!resultVerifyReservation.data)
    return 'Похоже что-то кто-то уже успел забронировать эти места';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Title title="Данные и оплата" goBack />
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
              flexDirection: 'column',
              gap: mobile ? 24 : 32,
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Oranienbaum,
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.black,
              }}
            >
              Данные гостей
            </span>
            <CustomerMainInfo
              surname={surname}
              setSurname={setSurname}
              name={name}
              setName={setName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              phone={phone}
              setPhone={setPhone}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span
                style={{
                  fontFamily: Fonts.Manrope,
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: 1,
                  color: Colors.black,
                }}
              >
                Дополнительно
              </span>
              {resultVerifyReservation.data.hotel_reservations?.[0].room_stays.map(
                (rs, ind) => (
                  <Fragment key={ind}>
                    {resultVerifyReservation.data?.hotel_reservations?.[0]
                      .room_stays.length &&
                      resultVerifyReservation.data.hotel_reservations[0]
                        .room_stays.length > 1 && (
                        <span
                          style={{
                            fontFamily: Fonts.Manrope,
                            fontWeight: 500,
                            fontSize: 16,
                            lineHeight: 1,
                            color: Colors.black,
                          }}
                        >{`Номер ${ind + 1}: ${rs.room_types?.[0].name}`}</span>
                      )}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: mobile ? 'column' : 'row',
                        gap: 8,
                      }}
                    >
                      <Input
                        value="18:00"
                        placeholder="Заезд"
                        style={{ width: '100%' }}
                      />
                      <Input
                        value="15:00"
                        placeholder="Выезд"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <Input
                      value=""
                      placeholder="Комментарий отелю"
                      style={{ height: 100 }}
                      multiline
                    />
                  </Fragment>
                ),
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: mobile ? 24 : 32,
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Oranienbaum,
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: Colors.black,
              }}
            >
              Способ оплаты
            </span>
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
                  top: 188,
                  right: 80,
                  width: 333,
                  minWidth: 333,
                  maxHeight: 'calc(100vh - 64px)',
                }),
          }}
          className="payment-info"
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
            // onClick={() => {
            //   if (ind < rooms.length - 1) navigate(`/services/${ind + 2}`);
            //   else navigate('/payment');
            // }}
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

export default PaymentPage;
