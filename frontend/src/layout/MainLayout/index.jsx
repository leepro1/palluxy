import Header from '@components/Header';
import Footer from '@components/Footer';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 top-0 -z-20 min-h-screen w-screen bg-main-background bg-cover"></div>
      <div className="flex grow flex-col">
        <Header />
        <div className="relative grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
