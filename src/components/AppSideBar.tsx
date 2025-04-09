/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App side bar for the app
 */

// Components
import { Link } from 'react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarGroupLabel,
  SidebarGroupAction,
  useSidebar
} from './ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import TaskDialogForm from './TaskDialogForm'
import ProjectFormDialog from './ProjectFormDialog'

import Logo from './Logo'
import { UserButton } from '@clerk/clerk-react'
import { ChevronRight, CirclePlus, Plus } from 'lucide-react'
import { SIDEBAR_LINKS } from '@/constants'
import { useLocation } from 'react-router'
const AppSideBar = () => {
  const location = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link className='p-2' to='/app/inbox'>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Create button */}
              <SidebarMenuItem>
                <TaskDialogForm>
                  <SidebarMenuButton className='!text-primary'>
                    <CirclePlus /> Add task
                  </SidebarMenuButton>
                </TaskDialogForm>
              </SidebarMenuItem>
              {/* Sidebar links */}
              {SIDEBAR_LINKS.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={link.href === location.pathname}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false)
                    }}
                  >
                    <Link to={link.href}>
                      <link.icon /> {link.label}
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className='group/collapsible'>
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className='text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground/80'
            >
              <CollapsibleTrigger className='text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground/80 hover:bg-sidebar-accent'>
                <ChevronRight className='transition-transform me-2 group-data-[state=open]/collapsible:rotate-90' />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <Tooltip>
              <ProjectFormDialog method='POST'>
                <TooltipTrigger>
                  <SidebarGroupAction aria-label='Add project'>
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>

              <TooltipContent side='right'>Add Project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className='text-sm text-muted-foreground'>
                      Click + to add some projects
                    </p>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: 'w-full',
              userButtonTrigger:
                'shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent',
              userButtonBox: 'flex-row-reverse shadow-none gap-2',
              userButtonOuterIdentifier: 'ps-0',
              popoverBox: 'pointer-events-auto'
            }
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar
