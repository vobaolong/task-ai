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
    path: '/app/inbox',
    element: <InboxPage />
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
    children: appRouteChildren
  }
])

export default router
