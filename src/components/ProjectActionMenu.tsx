/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project action menu component for the app
 */

import type { Project } from '@/types'
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import ProjectFormDialog from './ProjectFormDialog'
import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import ProjectDeleteButton from './ProjectDeleteButton'

interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog method='PUT' defaultFormData={defaultFormData}>
            <Button
              variant='ghost'
              size='sm'
              className='justify-start w-full px-2'
            >
              <Pencil /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectActionMenu
