import { RoomAvailability } from '@/interfaces/RoomAvailability';
import { RoomAvailabilityRaw } from '@/interfaces/RoomAvailabilityRaw';

const transformRoomAvailability = (data: RoomAvailabilityRaw) => {
  const roomsPreRaw = data.room_stays
    .filter(
      it =>
        it.rate_plans?.[0].code !== '10400' &&
        it.rate_plans?.[0].code !== '46203' &&
        it.rate_plans?.[0].code !== '46493',
    )
    .map(it => {
      const servicesRaw = it.services.map(srvIt => {
        const srvProps = data.services.find(
          srv => srv.rph === srvIt.rph,
        ) as RoomAvailabilityRaw['services'][number];
        return {
          code: srvProps.code,
          price: srvProps.price.price_after_tax,
          inclusive: srvProps.inclusive,
          age_group:
            srvIt.placement_index !== undefined
              ? srvIt.age_group || 0
              : undefined,
          placement_index: srvIt.placement_index,
        } as Omit<
          RoomAvailability['rooms'][number]['services'][number],
          'prices'
        > & {
          age_group?: number;
          price: number;
          placement_index: number | undefined;
        };
      });

      const guests = it.placement_rates.map(pr => {
        const found = it.guests.filter(
          g => g.placement.index === pr.placement.index,
        );
        return {
          kind: pr.placement.kind,
          count: found.length
            ? found.map(i => i.count).reduce((pr, cur) => pr + cur)
            : 0,
          code: pr.placement.code,
        };
      });
      if (it.room_types?.[0].code === '232663')
        console.log(
          it.guests,
          it.guests.filter(
            (it, ind, arr) =>
              arr.findIndex(
                it2 =>
                  it2.placement.index === it.placement.index &&
                  it2.placement.kind === it2.placement.kind &&
                  it.placement.age_group === it2.placement.age_group,
              ) === ind,
          ),
        );
      const services = servicesRaw
        .filter(
          (it, ind, arr) => arr.findIndex(it2 => it2.code === it.code) === ind,
        )
        .map(it3 => {
          const { age_group, price, placement_index, ...props } = it3;
          const prices = it.guests
            .filter(
              (it, ind, arr) =>
                arr.findIndex(
                  it2 =>
                    it2.placement.index === it.placement.index &&
                    it2.placement.kind === it.placement.kind &&
                    it2.placement.age_group === it.placement.age_group,
                ) === ind,
            )
            .map(it => {
              const found = servicesRaw.find(
                sr =>
                  sr.placement_index === it.placement.index &&
                  sr.code === it3.code,
              );
              return {
                age_group: it.placement.age_group || 0,
                price: found?.price,
                placement_index: found?.placement_index as number,
              };
            })
            .filter(it => it !== undefined);
          return age_group !== undefined
            ? { ...props, prices }
            : { ...props, price };
        });
      const rate_plan = {
        code: it.rate_plans?.[0].code,
        criterion: +it.criterion_ref,
        price: it.total,
        guests,
      };
      return {
        room_type_code: it.room_types?.[0].code,
        rate_plan,
        services,
        quantity:
          data.room_type_quotas.find(
            qt => qt.rph === it.room_types?.[0].room_type_quota_rph,
          )?.quantity || 1,
        raw: {
          guests: it.guests,
          room_types: it.room_types,
          rate_plans: it.rate_plans,
          placement_rates: it.placement_rates,
        },
      };
    });
  const roomsRaw = roomsPreRaw.map(it => {
    const { rate_plan, ...props } = it;
    const rate_plans_raw = roomsPreRaw
      .filter(rr => rr.room_type_code === it.room_type_code)
      .map(i => i.rate_plan);
    const rate_plans = rate_plans_raw
      .filter(
        (rpr, ind, arr) =>
          arr.findIndex(i => i.criterion === rpr.criterion) === ind,
      )
      .map(rpr => ({
        ...rpr,
        price: rate_plans_raw.find(
          i =>
            i.criterion === rpr.criterion &&
            i.price.price_after_tax ===
              Math.min(
                ...rate_plans_raw
                  .filter(i => i.criterion === rpr.criterion)
                  .map(i => i.price.price_after_tax),
              ),
        )?.price,
      }));
    return {
      ...props,
      rate_plans,
    };
  });
  const rooms = roomsRaw.filter(
    (it, ind, arr) =>
      arr.findIndex(i => i.room_type_code === it.room_type_code) === ind,
  );
  return {
    rooms,
    errors: data.errors,
    warnings: data.warnings,
  } as RoomAvailability;
};

export default transformRoomAvailability;
