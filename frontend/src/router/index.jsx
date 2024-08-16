/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { lazy } from 'react';

// gaurd
import AuthGuard from '@router/AuthGuard';
import LazyLoadRoutes from '@router/LazyLoadRoutes';

// home
const HomePage = lazy(() => import('@pages/HomePage'));
import MainLayout from '@layout/MainLayout';
import NotFound from '@/components/NotFound';

// admin
const NoticeDetail = lazy(() => import('@pages/NoticePage/NoticeDetail'));
const AdminPage = lazy(() => import('@pages/AdminPage'));
const NoticePage = lazy(() => import('@pages/NoticePage'));

// user
const SignInPage = lazy(() => import('@pages/SignInPage'));
const SignUpPage = lazy(() => import('@pages/SignUpPage'));
const MyPage = lazy(() => import('@pages/MyPage'));
const FindPasswordPage = lazy(() => import('@pages/FindPasswordPage'));
const ResetPasswordPage = lazy(() => import('@pages/ResetPasswordPage'));
const PersonalInfo = lazy(() => import('@pages/MyPage/PersonalInfo'));

// memorySpace
const MemorySpacePage = lazy(() => import('@pages/MemorySpacePage'));
const SettingSideBar = lazy(
  () => import('@pages/MemorySpacePage/SideBar/SettingSideBar'),
);
const UsageTipSideBar = lazy(
  () => import('@pages/MemorySpacePage/SideBar/UsageTipSideBar'),
);
const GuestBoxSideBar = lazy(
  () => import('@pages/MemorySpacePage/SideBar/GuestBoxSideBar'),
);
const MemorySpaceCreatePage = lazy(
  () => import('@pages/MemorySpacePage/MemorySpaceCreatePage'),
);
const MemorySpaceOverviewPage = lazy(
  () => import('@pages/MemorySpaceOverviewPage'),
);

// healing Meeting
const HealingMeetingPage = lazy(() => import('@pages/HealingMeetingPage'));
const HealingMeetingOverviewPage = lazy(
  () => import('@pages/HealingMeetingOverviewPage'),
);
const MeetingDetail = lazy(
  () => import('@pages/HealingMeetingOverviewPage/MeetingDetail'),
);
const CreatedMeetings = lazy(() => import('@pages/MyPage/CreatedMeetings'));
const AppliedMeetings = lazy(() => import('@pages/MyPage/AppliedMeetings'));

const routerInfo = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <NotFound /> },
      {
        index: true,
        element: (
          <LazyLoadRoutes>
            <HomePage />
          </LazyLoadRoutes>
        ),
      },

      // notice
      {
        path: '/noticeboard',
        children: [
          {
            index: true,
            element: (
              <LazyLoadRoutes>
                <NoticePage />
              </LazyLoadRoutes>
            ),
          },
          {
            path: ':pageNumber',
            element: (
              <LazyLoadRoutes>
                <NoticePage />
              </LazyLoadRoutes>
            ),
          },
        ],
      },
      {
        path: '/noticeboard/detail/:noticeId',
        element: (
          <LazyLoadRoutes>
            <NoticeDetail />
          </LazyLoadRoutes>
        ),
      },

      // 치유 모임
      {
        path: '/healingmeeting',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={true}>
              <HealingMeetingPage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/meetingoverview',
        children: [
          {
            path: ':pageIndex',
            element: (
              <LazyLoadRoutes>
                <HealingMeetingOverviewPage />
              </LazyLoadRoutes>
            ),
          },
          {
            path: 'detail/:meetingId',
            element: (
              <LazyLoadRoutes>
                <MeetingDetail />
              </LazyLoadRoutes>
            ),
          },
        ],
      },

      // 추억공간

      {
        path: '/memoryspaceoverview',
        element: (
          <LazyLoadRoutes>
            <MemorySpaceOverviewPage />
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/memoryspacecreate',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={true}>
              <MemorySpaceCreatePage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/memoryspace',
        element: (
          <LazyLoadRoutes>
            <MemorySpacePage />
          </LazyLoadRoutes>
        ),
        children: [
          {
            path: ':userId',
            children: [
              {
                path: 'setting',
                element: (
                  <LazyLoadRoutes>
                    <AuthGuard auth={true}>
                      <SettingSideBar />
                    </AuthGuard>
                  </LazyLoadRoutes>
                ),
              },
              {
                path: 'usage',
                element: (
                  <LazyLoadRoutes>
                    <AuthGuard auth={true}>
                      <UsageTipSideBar />
                    </AuthGuard>
                  </LazyLoadRoutes>
                ),
              },
              {
                path: 'guestBox',
                element: (
                  <LazyLoadRoutes>
                    <GuestBoxSideBar />
                  </LazyLoadRoutes>
                ),
              },
            ],
          },
        ],
      },

      // 유저
      {
        path: '/signin',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={false}>
              <SignInPage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/signup',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={false}>
              <SignUpPage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/find',
        element: (
          <LazyLoadRoutes>
            <FindPasswordPage />
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/reset',
        element: (
          <LazyLoadRoutes>
            <ResetPasswordPage />
          </LazyLoadRoutes>
        ),
      },
      {
        path: '/mypage',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={true}>
              <MyPage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),

        children: [
          // { index: true, element: <PersonalInfo /> },
          {
            path: 'personalInfo',
            element: (
              <LazyLoadRoutes>
                <PersonalInfo />
              </LazyLoadRoutes>
            ),
          },
          {
            path: 'createdMeetings',
            element: (
              <LazyLoadRoutes>
                <CreatedMeetings />
              </LazyLoadRoutes>
            ),
          },
          {
            path: 'appliedMeetings',
            element: (
              <LazyLoadRoutes>
                <AppliedMeetings />
              </LazyLoadRoutes>
            ),
          },
        ],
      },
      {
        path: '/admin/:pageIndex',
        element: (
          <LazyLoadRoutes>
            <AuthGuard auth={true}>
              <AdminPage />
            </AuthGuard>
          </LazyLoadRoutes>
        ),
      },
    ],
  },
];

export default routerInfo;
