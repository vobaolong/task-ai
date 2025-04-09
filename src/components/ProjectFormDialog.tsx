/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project form dialog component for the app
 */

import { PropsWithChildren, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import CProjectForm from './CProjectForm'
import type { Project } from '@/types'
import { useFetcher } from 'react-router'
import { useToast } from '@/hooks/use-toast'
import { truncateString } from '@/lib/utils'
type ProjectFormDialogProps = {
  defaultFormData?: Project
  children: React.ReactNode
  method: 'PUT' | 'POST'
}

const ProjectFormDialog: React.FC<
  PropsWithChildren<ProjectFormDialogProps>
> = ({ children, method, defaultFormData }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { toast } = useToast()
  const fetcher = useFetcher()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0 !rounded-xl'>
        <CProjectForm
          mode={method === 'PUT' ? 'update' : 'create'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false)

            const { id, update } = toast({
              title: `${method === 'PUT' ? 'Updating' : 'Creating'} project...`,
              description: 'Please wait while we create the project',
              duration: Infinity
            })

            await fetcher.submit(JSON.stringify(data), {
              method,
              action: '/app/projects',
              encType: 'application/json'
            })

            update({
              id,
              title: `${method === 'PUT' ? 'Updated' : 'Created'} project`,
              description: `The project ${truncateString(data.name, 32)}
							${data.ai_task_gen ? 'and its tasks' : ''} ${
                method === 'PUT' ? 'updated' : 'created'
              } successfully`,
              duration: 3000
            })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog
