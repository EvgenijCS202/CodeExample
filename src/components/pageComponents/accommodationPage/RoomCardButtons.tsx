import { useAppDispatch, useAppSelector } from '@/store';
import Button from '@/components/baseComponents/Button';
import { HotelInfo } from '@/interfaces/HotelInfo';
import { Colors, Fonts } from '@/consts';
import { useDropDown } from '@/hooks/useDropDown';
import AboutRoom from './AboutRoom';
import { RoomAvailability } from '@/interfaces/RoomAvailability';
import { useMemo, useState } from 'react';
import BanSvg from '@/assets/icons/ban.svg';
import DatePickerMobile from '@/components/inputs/DatePickerMobile';
import DatePickerDesktop from '@/components/inputs/DatePickerDesktop';
import { setRooms } from '@/store/slices/params';
import NumPicker from '@/components/inputs/NumPicker';
import roomRatePlans from '@/utils/roomRatePlans';
import RatePlanIcons from './RatePlanIcons';

interface IRoomCardButtonsProps {
  roomHotel: HotelInfo['hotels'][number]['room_types'][number];
  roomAvailable?: RoomAvailability['rooms'][number];
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  onSelect?: (roomType: string) => void;
  last?: boolean;
}
const RoomCardButtons = ({
  roomHotel,
  roomAvailable,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onSelect,
  last = false,
}: IRoomCardButtonsProps) => {
  const dispatch = useAppDispatch();
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const from = useAppSelector(state => state.paramsStore.from);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const rooms = useAppSelector(state => state.paramsStore.rooms);
  const hotel = useAppSelector(state => state.paramsStore.hotel);
  const count = rooms.filter(
    it => it.room_hotel?.code === roomHotel.code,
  ).length;
  const totalCount = rooms.filter(
    it => it.room_hotel?.code !== undefined,
  ).length;

  const { DropDownProvider, DropDown, show, hide } = useDropDown();
  const {
    DropDownProvider: DropDownProviderCal,
    DropDown: DropDownCal,
    show: showCal,
    hide: hideCal,
  } = useDropDown();

  const [diff, setDiff] = useState(0);
  const LeftButton = useMemo(() => {
    if (from === 'form') {
      if (roomAvailable === undefined) {
        if (
          startDate !== undefined &&
          endDate !== undefined &&
          setStartDate !== undefined &&
          setEndDate !== undefined
        )
          return (
            <DropDownProviderCal
              style={{
                display: 'block',
                overflowX: 'visible',
                width: '100%',
              }}
            >
              <Button
                style={{
                  paddingBlock: mobile ? 13 : 19,
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: Colors.white,
                }}
                onClick={() => {
                  if (startDate !== null) {
                    const curDate = new Date();
                    if (curDate.getFullYear() === startDate.getFullYear())
                      setDiff(startDate.getMonth() - curDate.getMonth());
                    else
                      setDiff(12 + startDate.getMonth() - curDate.getMonth());
                  } else setDiff(0);
                  showCal();
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: Fonts.Manrope,
                      fontWeight: 700,
                      fontSize: mobile ? 14 : 16,
                      lineHeight: mobile ? '14px' : '16px',
                      letterSpacing: 'calc(-0.02em)',
                      color: Colors.brown4,
                    }}
                  >
                    Выбрать другие даты
                  </span>
                  <img src={BanSvg} />
                </div>
              </Button>
              {mobile ? (
                <DropDownCal
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: Colors.white3,
                    marginTop: 0,
                    borderRadius: 0,
                    display: 'flex',
                    padding: 0,
                  }}
                >
                  <DatePickerMobile
                    hide={hideCal}
                    startDate={startDate}
                    endDate={endDate}
                    onSelect={(start, end) => {
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    roomType={+roomHotel.code}
                  />
                </DropDownCal>
              ) : (
                <DropDownCal
                  style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    width: 720,
                    gap: 20,
                    right: 0,
                    ...(last ? { bottom: 64 } : {}),
                  }}
                >
                  <DatePickerDesktop
                    hide={hideCal}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    diff={diff}
                    setDiff={setDiff}
                    roomType={+roomHotel.code}
                  />
                </DropDownCal>
              )}
            </DropDownProviderCal>
          );
        return null;
      }
      if (
        mainData !== undefined &&
        mainData.adults
          .map(
            (_, ind) =>
              `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
          )
          .filter((i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind)
          .length > 1
      )
        return null;
      if (count === 0)
        return (
          <Button
            style={{
              paddingBlock: mobile ? 16 : 21,
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (mainData === undefined) return;
              if (totalCount >= mainData.adults.length) return;
              const ind = rooms.findIndex(
                it => it.room_hotel?.code === undefined,
              );
              if (ind === -1) return;
              const foodServices =
                hotel?.services
                  .filter(it => it.category_code === '6215')
                  .map(it => it.code) || [];
              dispatch(
                setRooms([
                  ...rooms.slice(0, ind),
                  {
                    room_hotel: roomHotel,
                    room_available: roomAvailable,
                    price: roomAvailable.rate_plans[0].price,
                    services: {
                      food: [
                        ...roomAvailable.services
                          .filter(
                            it =>
                              it.inclusive === true &&
                              foodServices.includes(it.code),
                          )
                          .map(it => ({
                            id: it.code,
                            count: 1,
                          })),
                      ],
                      others: [
                        ...roomAvailable.services
                          .filter(
                            it =>
                              it.inclusive === true &&
                              !foodServices.includes(it.code),
                          )
                          .map(it => ({
                            id: it.code,
                            count: 1,
                          })),
                      ],
                    },
                  },
                  ...rooms.slice(ind + 1),
                ]),
              );
            }}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: mobile ? 14 : 16,
                lineHeight: mobile ? '14px' : '16px',
                letterSpacing: 'calc(-1em / 50)',
                color: '#fff',
              }}
            >
              Выбрать
            </span>
          </Button>
        );
      return (
        <NumPicker
          value={count}
          onChange={val => {
            if (val < count) {
              const ind = rooms.findIndex(
                it => it.room_hotel?.code === roomHotel.code,
              );
              if (ind === -1) return;
              dispatch(
                setRooms([...rooms.slice(0, ind), {}, ...rooms.slice(ind + 1)]),
              );
            } else {
              const ind = rooms.findIndex(
                it => it.room_hotel?.code === undefined,
              );
              if (ind === -1) return;
              const foodServices =
                hotel?.services
                  .filter(it => it.category_code === '6215')
                  .map(it => it.code) || [];
              dispatch(
                setRooms([
                  ...rooms.slice(0, ind),
                  {
                    room_hotel: roomHotel,
                    room_available: roomAvailable,
                    price: roomAvailable.rate_plans[0].price,

                    services: {
                      food: [
                        ...roomAvailable.services
                          .filter(
                            it =>
                              it.inclusive === true &&
                              foodServices.includes(it.code),
                          )
                          .map(it => ({
                            id: it.code,
                            count: 1,
                          })),
                      ],
                      others: [
                        ...roomAvailable.services
                          .filter(
                            it =>
                              it.inclusive === true &&
                              !foodServices.includes(it.code),
                          )
                          .map(it => ({
                            id: it.code,
                            count: 1,
                          })),
                      ],
                    },
                  },
                  ...rooms.slice(ind + 1),
                ]),
              );
            }
          }}
          style={{
            width: '100%',
            border: 'none',
            padding: 0,
            boxSizing: 'border-box',
          }}
          buttonsStyle={{ width: 48, height: 48 }}
          textStyle={{
            fontSize: 24,
            lineHeight: 1,
            color: Colors.green,
          }}
          buttonTextStyle={{ fontSize: 24 }}
          min={0}
          rightDisabled={
            totalCount === mainData?.adults.length ||
            count >= roomAvailable.quantity
          }
        />
      );
    }
    if (onSelect !== undefined)
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            style={{
              paddingBlock: mobile ? 16 : 21,
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => onSelect(roomHotel.code)}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: mobile ? 14 : 16,
                lineHeight: mobile ? '14px' : '16px',
                letterSpacing: 'calc(-1em / 50)',
                color: '#fff',
              }}
            >
              Выбрать
            </span>
          </Button>
        </div>
      );
    return null;
  }, [
    mobile,
    from,
    mainData,
    rooms,
    roomHotel,
    roomAvailable,
    DropDownCal,
    DropDownProviderCal,
    showCal,
    hideCal,
    count,
    totalCount,
    diff,
    dispatch,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    hotel?.services,
    last,
    onSelect,
  ]);

  const RightButton = useMemo(
    () => (
      <div style={{ width: '100%' }}>
        <DropDownProvider>
          <Button
            style={{
              paddingBlock: mobile ? 16 : 21,
              width: '100%',
              backgroundColor: 'inherit',
              border: '1px solid ' + Colors.green,
              boxSizing: 'border-box',
              cursor: 'pointer',
              height:
                mainData !== undefined &&
                mainData.adults
                  .map(
                    (_, ind) =>
                      `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
                  )
                  .filter(
                    (i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind,
                  ).length > 1 &&
                roomAvailable !== undefined &&
                roomAvailable.rate_plans.length > 1
                  ? 48
                  : undefined,
            }}
            onClick={show}
          >
            <span
              style={{
                fontFamily: Fonts.Manrope,
                fontWeight: 700,
                fontSize: mobile ? 14 : 16,
                lineHeight: mobile ? '14px' : '16px',
                letterSpacing: 'calc(-1em / 50)',
                color: Colors.green,
              }}
            >
              Подробнее
            </span>
          </Button>
          <DropDown
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              backgroundColor: Colors.white3,
              marginTop: 0,
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              gap: mobile ? 20 : 32,
              overflowY: 'auto',
            }}
          >
            <AboutRoom roomHotel={roomHotel} hide={hide} />
          </DropDown>
        </DropDownProvider>
      </div>
    ),
    [
      DropDown,
      DropDownProvider,
      show,
      hide,
      mobile,
      roomHotel,
      mainData,
      roomAvailable,
    ],
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          gap: 8,
        }}
      >
        {LeftButton}
        {RightButton}
      </div>
      {from === 'form' &&
      roomAvailable !== undefined &&
      roomAvailable.rate_plans.length &&
      mainData !== undefined &&
      mainData.adults
        .map(
          (_, ind) =>
            `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
        )
        .filter((i1, ind, arr) => arr.findIndex(i2 => i2 === i1) === ind)
        .length > 1 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {roomRatePlans(
            roomAvailable.rate_plans,
            rooms
              .map((it, ind) => ({
                room_type: it.room_available?.room_type_code,
                criterion: ind,
              }))
              .filter(it => it.room_type !== undefined) as {
              room_type: string;
              criterion: number;
            }[],
            roomAvailable.room_type_code,
            mainData,
          ).map((i, key) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={key}
            >
              <RatePlanIcons type={i.type} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
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
                  {i.price.price_after_tax} ₽
                </span>
                {i.count === 0 ? (
                  <Button
                    style={{ width: 160, height: 48, cursor: 'pointer' }}
                    onClick={() => {
                      if (i.nearestCriterion === undefined) return;
                      const foodServices =
                        hotel?.services
                          .filter(it => it.category_code === '6215')
                          .map(it => it.code) || [];
                      dispatch(
                        setRooms([
                          ...rooms.slice(0, i.nearestCriterion),
                          {
                            room_hotel: roomHotel,
                            room_available: roomAvailable,
                            price: i.price,
                            services: {
                              food: [
                                ...roomAvailable.services
                                  .filter(
                                    it =>
                                      it.inclusive === true &&
                                      foodServices.includes(it.code),
                                  )
                                  .map(it => ({
                                    id: it.code,
                                    count: 1,
                                  })),
                              ],
                              others: [
                                ...roomAvailable.services
                                  .filter(
                                    it =>
                                      it.inclusive === true &&
                                      !foodServices.includes(it.code),
                                  )
                                  .map(it => ({
                                    id: it.code,
                                    count: 1,
                                  })),
                              ],
                            },
                          },
                          ...rooms.slice(i.nearestCriterion + 1),
                        ]),
                      );
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
                      Выбрать
                    </span>
                  </Button>
                ) : (
                  <NumPicker
                    value={i.count}
                    min={0}
                    max={i.isMax ? i.count : undefined}
                    onChange={val => {
                      if (val < i.count) {
                        if (i.lastCriterion === undefined) return;
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, i.lastCriterion),
                            {},
                            ...rooms.slice(i.lastCriterion + 1),
                          ]),
                        );
                        return;
                      }
                      if (val > i.count) {
                        if (i.nearestCriterion === undefined) return;
                        const foodServices =
                          hotel?.services
                            .filter(it => it.category_code === '6215')
                            .map(it => it.code) || [];
                        dispatch(
                          setRooms([
                            ...rooms.slice(0, i.nearestCriterion),
                            {
                              room_hotel: roomHotel,
                              room_available: roomAvailable,
                              price: i.price,
                              services: {
                                food: [
                                  ...roomAvailable.services
                                    .filter(
                                      it =>
                                        it.inclusive === true &&
                                        foodServices.includes(it.code),
                                    )
                                    .map(it => ({
                                      id: it.code,
                                      count: 1,
                                    })),
                                ],
                                others: [
                                  ...roomAvailable.services
                                    .filter(
                                      it =>
                                        it.inclusive === true &&
                                        !foodServices.includes(it.code),
                                    )
                                    .map(it => ({
                                      id: it.code,
                                      count: 1,
                                    })),
                                ],
                              },
                            },
                            ...rooms.slice(i.nearestCriterion + 1),
                          ]),
                        );
                        return;
                      }
                    }}
                    style={{ width: 160, padding: 0, border: 'none' }}
                    buttonsStyle={{ width: 48, height: 48, borderRadius: 8 }}
                    textStyle={{ fontSize: 24, color: Colors.green }}
                    buttonTextStyle={{ fontSize: 24 }}
                    rightDisabled={
                      totalCount === mainData?.adults.length ||
                      count >= roomAvailable.quantity
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default RoomCardButtons;
