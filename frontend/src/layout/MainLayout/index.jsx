import Header from '@components/Header';
import Footer from '@components/Footer';

import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { instance } from '@/utils/axios';

const MainLayout = () => {
  const fetchUserByAccess = async () => {
    const access = sessionStorage.getItem('access');
    if (!access) return null;
    const res = await instance.get('/api/users/user-info');
    return res.data.result;
  };

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
        <div className="relative grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
