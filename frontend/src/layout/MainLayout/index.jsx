import Header from '@components/Header';
import Footer from '@components/Footer';

import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByAccess } from '@api/user';

const MainLayout = () => {
  useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserByAccess,
    staleTime: Infinity,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed left-0 top-0 -z-20 min-h-screen w-screen bg-main-background bg-cover"></div>
      <div className="flex grow flex-col">
        <Header />
        <div className="read-only: grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
