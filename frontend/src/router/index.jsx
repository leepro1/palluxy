import HomePage from '@pages/HomePage';
import MainLayout from '@layout/MainLayout';

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      //   { path: '/signup', element: <SignupPage /> },
      //   { path: '/signin', element: <SigninPage /> },
      //   { path: '/community', element: <CommunityPage /> },
    ],
  },
];

export default routerInfo;
