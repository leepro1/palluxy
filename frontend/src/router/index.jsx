import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import HealingMeetingPage from '@pages/HealingMeetingPage';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/memoryspace', element: <MemorySpacePage /> },
      { path: '/healingmeeting', element: <HealingMeetingPage /> },
      //   { path: '/signin', element: <SigninPage /> },
      //   { path: '/community', element: <CommunityPage /> },
    ],
  },
];

export default routerInfo;
