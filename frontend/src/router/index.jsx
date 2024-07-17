import HomePage from '@pages/HomePage';
import MemorySpacePage from '@pages/MemorySpacePage';
import MainLayout from '@layout/MainLayout';
import SettingSideBar from '@pages/MemorySpacePage/SettingSideBar';
import MailboxSideBar from '@pages/MemorySpacePage/MailboxSideBar';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
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
    ],
  },
];

export default routerInfo;
