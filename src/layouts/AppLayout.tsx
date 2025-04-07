/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App layout for the app
 */

// Components
import AppSideBar from '@/components/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

// Router
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarTrigger />
      <div>AppLayout</div>
      <Outlet />
    </SidebarProvider>
  )
}

export default AppLayout
