import { Colors, Fonts } from '@/consts';
import { useAppSelector } from '@/store';
import { ParamService } from '@/store/slices/params';

interface IServicesShortProps {
  services: ParamService[];
}
const ServicesShort = ({ services }: IServicesShortProps) => {
  const hotel = useAppSelector(state => state.paramsStore.hotel);
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const servicesCodes = services.map(it => it.id);
  const mappedServices = hotel?.services
    .filter(it => servicesCodes.includes(it.code))
    .map(it => {
      const foundService = services.filter(s => s.id === it.code).length
        ? services
            .filter(s => s.id === it.code)
            .reduce((pr, cur) => ({
              id: it.code,
              count:
                pr.count !== undefined && cur.count !== undefined
                  ? pr.count + cur.count
                  : undefined,
              counts:
                pr.counts !== undefined && cur.counts !== undefined
                  ? [
                      ...pr.counts.filter(prc =>
                        cur.counts
                          ?.map(crc => crc.age_group)
                          .includes(prc.age_group),
                      ),
                      ...cur.counts.map(crc => ({
                        age_group: crc.age_group,
                        count:
                          (pr.counts?.find(
                            prc => prc.age_group === crc.age_group,
                          )?.count || 0) + crc.count,
                        placement_index: crc.placement_index,
                      })),
                    ]
                  : undefined,
            }))
        : undefined;
      if (foundService === undefined) return { ...it, count: 0 };
      if (foundService.counts !== undefined)
        return {
          ...it,
          count: foundService.counts.length
            ? foundService.counts
                .map(s => s.count || 0)
                .reduce((pr, cur) => pr + cur)
            : 0,
        };
      if (foundService.count !== undefined)
        return {
          ...it,
          count: foundService.count,
        };
      return {
        ...it,
        count: 0,
      };
    });
  if (mappedServices === undefined || !mappedServices.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {mappedServices.map(it => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: mobile ? 12 : 16,
          }}
          key={it.code}
        >
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 400,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1.4,
              color: Colors.brown,
            }}
          >{`${it.name}`}</span>
          <span
            style={{
              fontFamily: Fonts.Manrope,
              fontWeight: 700,
              fontSize: mobile ? 14 : 16,
              lineHeight: 1,
              color: Colors.brown,
            }}
          >{`x${it.count}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ServicesShort;
