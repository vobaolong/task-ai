/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App layout for the app
 */

// Components
import AppSideBar from '@/components/AppSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

// Router
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={300} disableHoverableContent>
        <AppSideBar />
        <main className='flex-1'>
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default AppLayout
