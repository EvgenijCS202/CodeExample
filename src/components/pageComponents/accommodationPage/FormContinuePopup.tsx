import { Colors, Fonts } from '@/consts';
import { useAppSelector } from '@/store';
import Button from '@/components/baseComponents/Button';
import { useNavigate } from 'react-router-dom';

const FormContinuePopup = () => {
  const navigate = useNavigate();
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  const from = useAppSelector(state => state.paramsStore.from);
  const mainData = useAppSelector(state => state.paramsStore.mainData);
  const rooms = useAppSelector(state => state.paramsStore.rooms);
  const roomsPicked = rooms.length
    ? rooms.filter(it => it.room_hotel?.code !== undefined).length
    : 0;
  if (
    from !== 'form' ||
    mainData === undefined ||
    roomsPicked !== mainData.adults.length
  )
    return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: mobile ? 20 : 45,
        left: mobile ? 20 : 80,
        width: 'calc(100% - ' + `${mobile ? 40 : 160}` + 'px)',
        backgroundColor: Colors.white3,
        borderRadius: 8,
        display: 'flex',
        boxSizing: 'border-box',
        ...(mobile
          ? {
              flexDirection: 'column',
              gap: 12,
              padding: 16,
            }
          : {
              padding: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }),
        boxShadow: '0px 20px 24px 0px rgba(80, 65, 56, 0.2)',
      }}
    >
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 400,
          fontSize: mobile ? 16 : 24,
          lineHeight: 1,
          color: Colors.black,
        }}
      >
        Вы выбрали{' '}
        <span style={{ fontWeight: 700 }}>
          {roomsPicked} номер
          {roomsPicked === 1 ? '' : roomsPicked > 4 ? 'ов' : 'а'}
        </span>
      </span>
      <Button
        style={{
          padding: mobile ? 16 : undefined,
          height: mobile ? undefined : 58,
          paddingInline: mobile ? undefined : 40,
          cursor: 'pointer',
        }}
        onClick={() => {
          if (!rooms.length) return;
          navigate('/services/1');
        }}
      >
        <span
          style={{
            fontFamily: Fonts.Manrope,
            fontWeight: 700,
            fontSize: mobile ? 14 : 16,
            lineHeight: 1,
            color: '#ffffff',
            letterSpacing: mobile ? '-0.02em' : undefined,
          }}
        >
          Продолжить оформление
        </span>
      </Button>
    </div>
  );
};

export default FormContinuePopup;
