// home
import HomePage from '@pages/HomePage';
import MainLayout from '@layout/MainLayout';
import NotFound from '@/components/NotFound';

// admin
import NoticeDetail from '@pages/NoticePage/NoticeDetail';
import CreateNotice from '@pages/NoticePage/CreateNotice';
import AdminPage from '@pages/AdminPage';
import NoticePage from '@pages/NoticePage';

// user
import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import MyPage from '@pages/MyPage';
import FindPasswordPage from '@pages/FindPasswordPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import PersonalInfo from '@pages/MyPage/PersonalInfo';

// memorySpace
import MemorySpacePage from '@pages/MemorySpacePage';
import SettingSideBar from '@pages/MemorySpacePage/SideBar/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/SideBar/MailboxSideBar';
import GuestBoxSideBar from '@pages/MemorySpacePage/SideBar/GuestBoxSideBar';
import MemorySpaceCreatePage from '@pages/MemorySpacePage/MemorySpaceCreatePage';

// healing Meeting
import HealingMeetingPage from '@pages/HealingMeetingPage';
import HealingMeetingOverviewPage from '@pages/HealingMeetingOverviewPage';
import MeetingDetail from '@pages/HealingMeetingOverviewPage/MeetingDetail';
import CreatedMeetings from '@pages/MyPage/CreatedMeetings';
import AppliedMeetings from '@pages/MyPage/AppliedMeetings';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // {
      //   path: '/noticeboard',
      //   element: <NoticePage />,
      // },
      {
        path: '/noticeboard',
        children: [
          { index: true, element: <NoticePage /> },
          {
            path: ':pageNumber',
            element: <NoticePage />,
          },
        ],
      },
      {
        path: '/noticeboard/detail/:noticeId',
        element: <NoticeDetail />,
      },
      { path: '/noticeboard/create', element: <CreateNotice /> },
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
      { path: '/404', element: <NotFound /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/find', element: <FindPasswordPage /> },
      { path: '/reset', element: <ResetPasswordPage /> },
      {
        path: '/mypage',
        element: <MyPage />,
        children: [
          // { index: true, element: <PersonalInfo /> },
          {
            path: 'personalInfo',
            element: <PersonalInfo />,
          },
          {
            path: 'createdMeetings',
            element: <CreatedMeetings />,
          },
          {
            path: 'appliedMeetings',
            element: <AppliedMeetings />,
          },
        ],
      },
      { path: '/admin', element: <AdminPage /> },
    ],
  },
];

export default routerInfo;
