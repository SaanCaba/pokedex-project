import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import Error from '../pages/Error';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />
  },
  {
    path: '/favorites',
    element: (
      <Layout>
        <Favorites />
      </Layout>
    )
  },
  {
    path: '*',
    element: (
      <Layout>
        <Error />
      </Layout>
    )
  }
]);

export default router;
