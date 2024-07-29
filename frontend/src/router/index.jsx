import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import HealingMeetingPage from '@pages/HealingMeetingPage';
import HealingMeetingOverviewPage from '@pages/HealingMeetingOverviewPage';
import SettingSideBar from '@pages/MemorySpacePage/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/MailboxSideBar';
import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import FindPassword from '@components/FindPassword';
import ResetPassword from '@components/ResetPassword';
import MyPage from '@pages/MyPage';
import GuestBoxSideBar from '@pages/MemorySpacePage/GuestBoxSideBar';
import MemorySpaceCreatePage from '@pages/MemorySpacePage/MemorySpaceCreatePage';
import MeetingDetail from '@pages/HealingMeetingOverviewPage/MeetingDetail';
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
            index: true,
            // path: 'setting',
            element: <SettingSideBar />,
          },
          {
            path: 'mailbox',
            element: <MailboxSideBar />,
          },
          {
            path: 'guest-box',
            element: <GuestBoxSideBar />,
          },
        ],
      },
      // { path: '/signin', element: <SigninPage /> },
      //   { path: '/community', element: <CommunityPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/find', element: <FindPassword /> },
      { path: '/reset', element: <ResetPassword /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
];

export default routerInfo;
