/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App side bar for the app
 */

// Components
import { Link, useLoaderData } from 'react-router'
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
  useSidebar,
  SidebarMenuSubButton,
  SidebarMenuAction
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
import {
  ChevronRight,
  CirclePlus,
  Plus,
  Hash,
  MoreHorizontal
} from 'lucide-react'
import { SIDEBAR_LINKS } from '@/constants'
import { useLocation } from 'react-router'
import { useProject } from '@/hooks/context/ProjectContext'
import ProjectActionMenu from './ProjectActionMenu'

const AppSideBar = () => {
  const location = useLocation()
  const { taskCounts } = useLoaderData()
  const { isMobile, setOpenMobile } = useSidebar()
  const projects = useProject()

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
              {SIDEBAR_LINKS.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.href === location.pathname}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false)
                    }}
                  >
                    <Link to={item.href}>
                      <item.icon /> {item.label}
                    </Link>
                  </SidebarMenuButton>
                  {item.href === '/app/inbox' &&
                    Boolean(taskCounts.inboxTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.inboxTasks}
                      </SidebarMenuBadge>
                    )}
                  {item.href === '/app/today' &&
                    Boolean(taskCounts.todayTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.todayTasks}
                      </SidebarMenuBadge>
                    )}
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
                  {projects?.documents
                    .slice(0, 5)
                    .map(({ $id, name, color_hex, color_name }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false)
                          }}
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <Hash color={color_hex} />
                            <span className='truncate'>{name}</span>
                          </Link>
                        </SidebarMenuSubButton>

                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_hex,
                            color_name
                          }}
                          side='right'
                          align='start'
                        >
                          <SidebarMenuAction
                            aria-label='More options'
                            showOnHover
                            className='bg-sidebar-accent'
                          >
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects?.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className='text-primary-foreground'
                        isActive={location.pathname === '/app/projects'}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false)
                        }}
                      >
                        <Link to='/app/projects'>
                          <p className='text-sm text-muted-foreground'>
                            View all projects
                          </p>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className='text-sm text-muted-foreground'>
                        Click + to add some projects
                      </p>
                    </SidebarMenuItem>
                  )}
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
