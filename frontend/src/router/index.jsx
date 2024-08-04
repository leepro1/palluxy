import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import HealingMeetingPage from '@pages/HealingMeetingPage';
import HealingMeetingOverviewPage from '@pages/HealingMeetingOverviewPage';
import SettingSideBar from '@pages/MemorySpacePage/SideBar/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/SideBar/MailboxSideBar';
import SignIn from '@components/SignIn';
import SignUp from '@components/SignUp';
import FindPassword from '@components/FindPassword';
import ResetPassword from '@components/ResetPassword';
import GuestBoxSideBar from '@pages/MemorySpacePage/SideBar/GuestBoxSideBar';
import MemorySpaceCreatePage from '@pages/MemorySpacePage/MemorySpaceCreatePage';
import MeetingDetail from '@pages/HealingMeetingOverviewPage/MeetingDetail';
import NotFound from '@/components/NotFound';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/healingmeeting', element: <HealingMeetingPage /> },
      {
        path: '/meetingoverview',
        children: [
          {
            path: ':pageIndex',
            element: <HealingMeetingOverviewPage />,
          },
          {
            path: 'detail/:meetingId',
            element: <MeetingDetail />,
          },
        ],
      },
      //   { path: '/signin', element: <SigninPage /> },
      {
        path: '/memoryspacecreate',
        element: <MemorySpaceCreatePage />,
      },
      {
        path: '/memoryspace',
        element: <MemorySpacePage />,
        children: [
          {
            path: ':userId',
            children: [
              {
                // index: true,
                path: 'setting',
                element: <SettingSideBar />,
              },
              {
                path: 'mailbox',
                element: <MailboxSideBar />,
              },
              {
                index: true,
                // path: 'guest-box',
                element: <GuestBoxSideBar />,
              },
            ],
          },
        ],
      },
      // { path: '/signin', element: <SigninPage /> },
      //   { path: '/community', element: <CommunityPage /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/find', element: <FindPassword /> },

      { path: '/404', element: <NotFound /> },
    ],
  },
];

export default routerInfo;
