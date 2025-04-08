/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App layout for the app
 */

// Components
import AppSideBar from '@/components/AppSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

// Router
import { Outlet, useNavigation } from 'react-router'

const AppLayout = () => {
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading' && !navigation.formData

  return (
    <>
      <SidebarProvider>
        <TooltipProvider delayDuration={300} disableHoverableContent>
          <AppSideBar />
          <main
            className={cn(
              'flex-1',
              isLoading && 'opacity-50 pointer-events-none'
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  )
}

export default AppLayout
