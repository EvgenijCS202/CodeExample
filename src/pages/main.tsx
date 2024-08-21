import NavBar from '@/components/navigation/NavBar';
import { Colors } from '@/consts';
import { useAppSelector } from '@/store';
import { Outlet } from 'react-router-dom';

const Main = () => {
  const mobile = useAppSelector(state => state.paramsStore.mobile);
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: Colors.white,
        padding: mobile ? '40px 20px' : '40px 80px 80px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: mobile ? 16 : 60,
        boxSizing: 'border-box',
      }}
    >
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
