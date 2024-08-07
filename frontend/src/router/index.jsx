// gaurd
import AuthGuard from './AuthGuard';
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
import MemorySpaceOverviewPage from '@pages/MemorySpaceOverviewPage';

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
      { path: '*', element: <NotFound /> },
      { index: true, element: <HomePage /> },
      // {
      //   path: '/noticeboard',
      //   element: <NoticePage />,
      // },

      // notice
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

      // 치유 모임
      {
        path: '/healingmeeting',
        element: (
          <AuthGuard auth={true}>
            <HealingMeetingPage />
          </AuthGuard>
        ),
      },
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

      // 추억공간

      {
        path: '/memoryspaceoverview',
        element: <MemorySpaceOverviewPage />,
      },
      {
        path: '/memoryspacecreate',
        element: (
          <AuthGuard auth={true}>
            <MemorySpaceCreatePage />,
          </AuthGuard>
        ),
      },
      {
        path: '/memoryspace',
        element: <MemorySpacePage />,
        children: [
          {
            path: ':userId',
            children: [
              {
                path: 'setting',
                element: (
                  <AuthGuard auth={true}>
                    <SettingSideBar />
                  </AuthGuard>
                ),
              },
              {
                path: 'mailbox',
                element: (
                  <AuthGuard auth={true}>
                    <MailboxSideBar />
                  </AuthGuard>
                ),
              },
              {
                index: true,
                element: <GuestBoxSideBar />,
              },
            ],
          },
        ],
      },

      // 유저
      {
        path: '/signin',
        element: (
          <AuthGuard auth={false}>
            <SignInPage />
          </AuthGuard>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthGuard auth={false}>
            <SignUpPage />
          </AuthGuard>
        ),
      },
      { path: '/find', element: <FindPasswordPage /> },
      { path: '/reset', element: <ResetPasswordPage /> },
      {
        path: '/mypage',
        element: (
          <AuthGuard auth={true}>
            <MyPage />
          </AuthGuard>
        ),

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
      {
        path: '/admin/:pageIndex',
        element: (
          <AuthGuard auth={true}>
            <AdminPage />
          </AuthGuard>
        ),
      },
    ],
  },
];

export default routerInfo;
