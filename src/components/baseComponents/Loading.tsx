import { Colors, Fonts } from '@/consts';
import LoadingSvg from '@/assets/icons/loading.svg';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        height: 320,
        backgroundColor: Colors.white2,
        borderRadius: 8,
      }}
    >
      <img className={styles['image']} src={LoadingSvg} />
      <span
        style={{
          fontFamily: Fonts.Manrope,
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.4,
          color: Colors.brown,
        }}
      >
        Загружаем доступные номера
      </span>
    </div>
  );
};

export default Loading;
