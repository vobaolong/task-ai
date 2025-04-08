/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Task dialog form for the app
 */

import { PropsWithChildren, useEffect, useState } from 'react'

// Components
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import TaskForm from './TaskForm'
import { useFetcher, useLocation } from 'react-router'
import { startOfToday } from 'date-fns'

const TaskDialogForm: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const fetcher = useFetcher()
  const location = useLocation()

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'q') {
        const target = e.target as HTMLElement
        if (target.localName === 'textarea') return
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='p-0 border-0 !rounded-xl'>
        <TaskForm
          defaultFormData={{
            content: '',
            due_date:
              location.pathname === '/app/today' ? startOfToday() : null,
            projectId: null
          }}
          mode='create'
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'POST',
              encType: 'application/json'
            })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default TaskDialogForm
