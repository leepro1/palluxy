import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import HealingMeetingPage from '@pages/HealingMeetingPage';
import HealingMeetingOverviewPage from '@pages/HealingMeetingOverviewPage';
import SettingSideBar from '@pages/MemorySpacePage/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/MailboxSideBar';
import SignIn from '@components/SignIn';
import SignUp from '@components/SignUp';
import ResetPassword from '../components/ResetPassword.jsx';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/healingmeeting', element: <HealingMeetingPage /> },
      { path: '/meetingoverview', element: <HealingMeetingOverviewPage /> },
      //   { path: '/signin', element: <SigninPage /> },
      {
        path: '/memoryspace',
        element: <MemorySpacePage />,
        children: [
          {
            index: true,
            // path: 'setting',
            element: <SettingSideBar />,
          },
          {
            path: 'mailbox',
            element: <MailboxSideBar />,
          },
        ],
      },
      // { path: '/signin', element: <SigninPage /> },
      //   { path: '/community', element: <CommunityPage /> },
      { path: '/signin', element: <SignIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/reset', element: <ResetPassword /> },
    ],
  },
];

export default routerInfo;
