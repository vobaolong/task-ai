/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Main entry point for the app
 */

// Pages
import HomePage from '@/pages/HomePage'
import SignUpPage from '@/pages/SignUpPage'
import SignInPage from '@/pages/SignInPage'
import AuthSyncPage from '@/pages/AuthSyncPage'
import InboxPage from '@/pages/InboxPage'
import ErrorBoundary from '@/pages/ErrorBoundary'

// Layouts
import AppLayout from '@/layouts/AppLayout'
import RootLayout from '@/layouts/RootLayout'

// Router
import { createBrowserRouter, RouteObject } from 'react-router'
import appAction from '@/routes/actions/appAction'
import inboxTaskLoader from '@/routes/loaders/inboxLoader'
import TodayTaskPage from '@/pages/TodayTaskPage'
import todayTaskLoader from './loaders/todayTaskLoader'
import upcomingTaskLoader from './loaders/upcomingTaskLoader'
import UpcomingTaskPage from '@/pages/UpcomingTaskPage'
import CompletedTaskPage from '@/pages/CompletedTaskPage'
import completedTaskLoader from './loaders/completedTaskLoader'
import projectAction from './actions/projectAction'
import ProjectPage from '@/pages/ProjectPage'
import projectsLoader from './loaders/projectsLoader'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import projectDetailLoader from './loaders/projectDetailLoader'
import appLoader from './loaders/appLoader'
import ProjectErrorBoundary from '@/pages/ProjectErrorBoundary'

const rootRouteChildren: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/sign-in',
    element: <SignInPage />
  },
  {
    path: '/auth-sync',
    element: <AuthSyncPage />
  }
]

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
    loader: inboxTaskLoader
  },
  {
    path: 'today',
    element: <TodayTaskPage />,
    loader: todayTaskLoader
  },
  {
    path: 'upcoming',
    element: <UpcomingTaskPage />,
    loader: upcomingTaskLoader
  },
  {
    path: 'completed',
    element: <CompletedTaskPage />,
    loader: completedTaskLoader
  },
  {
    path: 'projects',
    element: <ProjectPage />,
    action: projectAction,
    loader: projectsLoader
  },
  {
    path: 'projects/:projectId',
    element: <ProjectDetailPage />,
    loader: projectDetailLoader,
    errorElement: <ProjectErrorBoundary />
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: rootRouteChildren
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
    loader: appLoader
  }
])

export default router
