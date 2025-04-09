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
import { ProjectProvider } from '@/hooks/context/ProjectContext'
import { cn } from '@/lib/utils'
import { AppLoaderData } from '@/routes/loaders/appLoader'

// Router
import { Outlet, useNavigation, useLoaderData } from 'react-router'

const AppLayout = () => {
  const navigation = useNavigation()

  const { projects } = useLoaderData<AppLoaderData>()
  const isLoading = navigation.state === 'loading' && !navigation.formData

  return (
    <ProjectProvider project={projects}>
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
    </ProjectProvider>
  )
}

export default AppLayout
