import { RoomAvailability } from '@/interfaces/RoomAvailability';
import { IParamsStore } from '@/store/slices/params';

const roomRatePlans = (
  rate_plans: RoomAvailability['rooms'][number]['rate_plans'],
  roomsPicked: {
    room_type: string;
    criterion: number;
  }[],
  room_type: string,
  mainData: IParamsStore['mainData'],
) => {
  if (mainData === undefined) return [];
  const roomsRaw = mainData.adults.map((_, ind) => ({
    type: `${mainData.adults[ind]}-${mainData.childrenAge[ind].length}`,
    crit: ind,
  }));
  const rooms = roomsRaw
    .map(it => ({
      type: it.type,
      criterions: roomsRaw.filter(rr => rr.type === it.type).map(rr => rr.crit),
    }))
    .filter((rr, ind, arr) => arr.findIndex(i => i.type === rr.type) === ind);
  if (!roomsRaw.length) return [];
  const roomRatePlansRaw = rooms.map(({ type, criterions }) => {
    const plans = rate_plans.filter(rp => criterions.includes(rp.criterion));
    if (!plans.length) return null;
    const guests = plans[0].guests;
    const guestsAdults = guests.filter(g => g.kind === 'adult').length
      ? guests
          .filter(g => g.kind === 'adult')
          .map(i => i.count)
          .reduce((pr, cur) => pr + cur)
      : 0;
    const guestsExtraAdults = guests.filter(g => g.kind === 'extra_adult')
      .length
      ? guests
          .filter(g => g.kind === 'extra_adult')
          .map(i => i.count)
          .reduce((pr, cur) => pr + cur)
      : 0;
    const children = +type.split('-')[1];
    if (!children)
      return {
        type: `${guestsAdults}-${guestsExtraAdults}-0`,
        criterions,
        price: plans[0].price,
      };
    const extraChild = guests.filter(g => g.kind === 'extra_child').length
      ? guests
          .filter(g => g.kind === 'extra_child')
          .map(i => i.count)
          .reduce((pr, cur) => pr + cur)
      : 0;
    const child = guests.filter(g => g.kind === 'child').length
      ? guests
          .filter(g => g.kind === 'child')
          .map(i => i.count)
          .reduce((pr, cur) => pr + cur)
      : 0;

    return {
      type: `${
        guestsAdults - (children - extraChild - child)
      }-${guestsExtraAdults}-${children}`,
      criterions,
      price: plans[0].price,
    };
  });
  return roomRatePlansRaw
    .filter(i => i !== null)
    .map<{
      type: string;
      count: number;
      price: RoomAvailability['rooms'][number]['rate_plans'][number]['price'];
      isMax: boolean;
      nearestCriterion?: number;
      lastCriterion?: number;
    }>(rrp => {
      const criterionPickedFull = roomsPicked.filter(rp =>
        rrp.criterions.includes(rp.criterion),
      );
      const criterionPicked = criterionPickedFull.map(i => i.criterion);
      const criterionsRemaining = rrp.criterions.filter(
        cr => !criterionPicked.includes(cr),
      );
      if (!criterionsRemaining.length)
        return {
          type: rrp.type,
          count: criterionPickedFull.filter(cp => cp.room_type === room_type)
            .length,
          price: rrp.price,
          lastCriterion: criterionPicked.length
            ? criterionPicked[criterionPicked.length - 1]
            : undefined,
          isMax: true,
        };
      return {
        type: rrp.type,
        count: criterionPickedFull.filter(cp => cp.room_type === room_type)
          .length,
        nearestCriterion: criterionsRemaining[0],
        lastCriterion: criterionPicked.length
          ? criterionPicked[criterionPicked.length - 1]
          : undefined,
        price: rrp.price,
        isMax: false,
      };
    });
};

export default roomRatePlans;
