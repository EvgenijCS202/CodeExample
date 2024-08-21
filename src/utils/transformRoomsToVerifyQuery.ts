import { IParamsStore } from '@/store/slices/params';
import dateToString from './dateToString';
import addDays from './addDays';

const transformRoomsToVerifyQuery = (
  rooms: IParamsStore['rooms'],
  mainData: IParamsStore['mainData'],
) => {
  return rooms
    .map(r => {
      if (
        r.room_available === undefined ||
        r.services === undefined ||
        mainData === undefined
      )
        return null;
      const foodServicesRaw: {
        code: string;
        quantity: number;
        placement_index?: number;
      }[][] = r.services.food.map(s => {
        if (s.count !== undefined) {
          if (
            (
              r.room_available?.services
                .filter(s => s.inclusive === true)
                .map(s => s.code) || []
            ).includes(s.id)
          )
            return [];
          return [{ code: s.id, quantity: s.count }];
        }
        if (s.counts !== undefined)
          return s.counts
            .filter(
              (c, ind, arr) =>
                arr.findIndex(
                  c2 => c2.placement_index === c.placement_index,
                ) === ind,
            )
            .map(c => {
              if (s.counts === undefined) return { code: s.id, quantity: 0 };
              return {
                code: s.id,
                quantity: s.counts
                  .filter(c2 => c2.placement_index === c.placement_index)
                  .map(c2 => c2.count)
                  .reduce((pr, cur) => pr + cur),
                placement_index: c.placement_index,
              };
            });
        return [];
      });
      const otherServicesRaw: {
        code: string;
        quantity: number;
        placement_index?: number;
      }[][] = r.services.others.map(s => {
        if (s.count !== undefined) {
          if (
            (
              r.room_available?.services
                .filter(s => s.inclusive === true)
                .map(s => s.code) || []
            ).includes(s.id)
          )
            return [];
          return [{ code: s.id, quantity: s.count }];
        }
        if (s.counts !== undefined)
          return s.counts
            .filter(
              (c, ind, arr) =>
                arr.findIndex(
                  c2 => c2.placement_index === c.placement_index,
                ) === ind,
            )
            .map(c => {
              if (s.counts === undefined) return { code: s.id, quantity: 0 };
              return {
                code: s.id,
                quantity: s.counts
                  .filter(c2 => c2.placement_index === c.placement_index)
                  .map(c2 => c2.count)
                  .reduce((pr, cur) => pr + cur),
                placement_index: c.placement_index,
              };
            });
        return [];
      });
      return {
        guest_count_info: {
          guest_counts: r.room_available.raw.guests
            .filter(
              (it, ind, arr) =>
                arr.findIndex(
                  it2 =>
                    it2.placement.index === it.placement.index &&
                    it2.placement.kind === it.placement.kind &&
                    it2.placement.age_group === it.placement.age_group,
                ) === ind,
            )
            .map((g, ind) => {
              const counts = r.room_available?.raw.guests.filter(
                g2 =>
                  g2.placement.index === g.placement.index &&
                  g2.placement.kind === g.placement.kind &&
                  g2.placement.age_group === g.placement.age_group,
              );
              return {
                index: ind + 1,
                count: counts?.length
                  ? counts.map(i => i.count).reduce((pr, cur) => pr + cur)
                  : 0,
                ...(g.age !== undefined
                  ? { age_qualifying_code: 'child', age: g.age }
                  : { age_qualifying_code: 'adult' }),
                placement_index: g.placement.index,
              } as {
                age_qualifying_code: string;
                age?: number;
                index: number;
                count: number;
                placement_index: number;
              };
            }),
        },
        rate_plans: r.room_available.raw.rate_plans.map(rp => ({
          code: rp.code,
        })),
        room_types: r.room_available.raw.room_types.map(rt => ({
          code: rt.code,
          placements: rt.placements.map(pl => ({
            index: pl.index,
            kind: pl.kind,
            code: pl.code,
          })),
          preferences: [] as [],
        })),
        services: [
          ...(foodServicesRaw.length
            ? foodServicesRaw.reduce((pr, cur) => [...pr, ...cur])
            : []),
          ...(otherServicesRaw.length
            ? otherServicesRaw.reduce((pr, cur) => [...pr, ...cur])
            : []),
        ],
        stay_dates: {
          start_date: `${dateToString(mainData.date)} 18:00:00`,
          end_date: `${dateToString(
            addDays(mainData.date, mainData.nights),
          )} 15:00:00`,
        },
      };
    })
    .filter(it => it !== null);
};

export default transformRoomsToVerifyQuery;
