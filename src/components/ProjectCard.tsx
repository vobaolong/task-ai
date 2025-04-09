/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project card component for the app
 */

import type { Models } from 'appwrite'
import { Hash, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router'
import ProjectActionMenu from './ProjectActionMenu'

type ProjectCardProps = {
  project: Models.Document
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className='relative flex items-center gap-3 px-2 rounded-lg group/card h-14 hover:bg-secondary'>
      <Hash size={16} color={project.color_hex} className='shrink-0' />
      <p className='text-sm truncate max-w-[48ch]'>{project.name}</p>

      <ProjectActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_name: project.color_name,
          color_hex: project.color_hex
        }}
      >
        <Button
          variant='ghost'
          size='icon'
          className='relative z-20 opacity-0 shrink-0 ms-auto group-hover/card:opacity-100 max-md:opacity-100'
          aria-label='More options'
        >
          <MoreHorizontal />
        </Button>
      </ProjectActionMenu>

      <Link
        className='absolute inset-0 z-10'
        to={`/app/projects/${project.$id}`}
      />
    </div>
  )
}

export default ProjectCard
