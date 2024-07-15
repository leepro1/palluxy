import Header from '@components/Header';
import Footer from '@components/Footer';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="bg-main-background flex min-h-screen flex-col bg-cover">
      <div className="grow">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
