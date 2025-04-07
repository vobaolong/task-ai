/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Main entry point for the app
 */

import App from '@/App'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

export default router
