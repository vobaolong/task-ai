/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App side bar for the app
 */

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
  SidebarMenuBadge
} from './ui/sidebar'
import Logo from './Logo'
import { UserButton } from '@clerk/clerk-react'
import { CirclePlus } from 'lucide-react'
import { SIDEBAR_LINKS } from '@/constants'

const AppSideBar = () => {
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
              <SidebarMenuItem>
                <SidebarMenuButton className='!text-primary'>
                  <CirclePlus /> Add task
                </SidebarMenuButton>
              </SidebarMenuItem>
              {SIDEBAR_LINKS.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild>
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
