import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import IndexPage from './pages';
import AccommodationPage from './pages/accommodation';
import ServicesPage from './pages/services';
import PaymentPage from './pages/payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: ':platform',
        element: <IndexPage />,
      },
      {
        path: 'accommodation',
        element: <AccommodationPage />,
      },
      {
        path: 'services/:ind',
        element: <ServicesPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: '*',
    element: 'Что-то пошло не так',
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
