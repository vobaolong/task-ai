/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project delete button component for the app
 */

import type { Project } from '@/types'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import { truncateString } from '@/lib/utils'
import { useFetcher } from 'react-router'
import { useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'

type ProjectDeleteButtonProps = {
  defaultFormData: Project
}

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData
}) => {
  const fetcher = useFetcher()

  const { toast } = useToast()

  const handleDelete = useCallback(async () => {
    const { id, update } = toast({
      title: 'Deleting project',
      duration: Infinity
    })
    try {
      await fetcher.submit(defaultFormData, {
        method: 'DELETE',
        action: '/app/projects',
        encType: 'application/json'
      })
      update({
        id,
        title: 'Project deleted',
        duration: 3000,
        description: `The project ${truncateString(
          defaultFormData.name,
          32
        )} has been deleted`
      })
    } catch (error) {
      console.error(error)
      update({
        id,
        title: 'Failed to delete project',
        duration: 3000,
        description: 'An error occurred while deleting the project'
      })
    }
  }, [defaultFormData])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start px-2 !text-destructive'
        >
          <Trash /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '}
            project will be deleted and all associated data will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='outline'>Cancel</Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button onClick={handleDelete} variant='destructive'>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProjectDeleteButton
