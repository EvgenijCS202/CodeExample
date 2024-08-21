import { ChevronLeftSvg } from '@/assets/icons/chevron_left';
import { Colors, Fonts } from '@/consts';
import { useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';

interface ITitleProps {
  title: string;
  goBack?: boolean;
}
const Title = ({ title, goBack = false }: ITitleProps) => {
  const navigate = useNavigate();
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
      {goBack && (
        <div
          style={{
            display: 'flex',
            width: mobile ? 32 : 40,
            height: mobile ? 32 : 40,
            borderRadius: 20,
            backgroundColor: Colors.white2,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        >
          <ChevronLeftSvg style={{ stroke: Colors.green, marginRight: 3 }} />
        </div>
      )}
      <span
        style={{
          fontFamily: Fonts.Oranienbaum,
          fontWeight: 400,
          fontSize: mobile ? 32 : 40,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: Colors.black,
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default Title;
