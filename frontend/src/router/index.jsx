import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import NoticePage from '@pages/NoticePage';
import NoticeDetail from '@pages/NoticePage/NoticeDetail';
import CreateNotice from '@pages/NoticePage/CreateNotice';
import HealingMeetingPage from '@pages/HealingMeetingPage';
import HealingMeetingOverviewPage from '@pages/HealingMeetingOverviewPage';
import SettingSideBar from '@pages/MemorySpacePage/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/MailboxSideBar';
import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import FindPasswordPage from '@pages/FindPasswordPage';
import ResetPasswordPage from '@pages/ResetPasswordPage';
import MyPage from '@pages/MyPage';
import PersonalInfo from '@pages/MyPage/PersonalInfo';
import CreatedMeetings from '@pages/MyPage/CreatedMeetings';
import AppliedMeetings from '@pages/MyPage/AppliedMeetings';
import GuestBoxSideBar from '@pages/MemorySpacePage/GuestBoxSideBar';
import MemorySpaceCreatePage from '@pages/MemorySpacePage/MemorySpaceCreatePage';
import MeetingDetail from '@pages/HealingMeetingOverviewPage/MeetingDetail';
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
    ],
  },
];

export default routerInfo;
