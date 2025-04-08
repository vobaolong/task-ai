/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Task card component
 */

import { Models } from 'appwrite'
import { Button } from './ui/button'
import {
  cn,
  formatCustomDate,
  getTaskDueDateColorClass,
  truncateString
} from '@/lib/utils'
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import TaskForm from './TaskForm'
import { useCallback, useState } from 'react'
import { useFetcher, useLocation } from 'react-router'
import { Task } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from './ui/toast'
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

type TaskCardProps = {
  id: string
  content: string
  completed: boolean
  dueDate: Date
  project: Models.Document | null
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  content,
  completed,
  dueDate,
  project
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const fetcher = useFetcher()
  const { toast } = useToast()
  const fetcherTask = fetcher.json as Task
  const location = useLocation()
  const task: Task = Object.assign(
    {
      id,
      content,
      completed,
      due_date: dueDate,
      project
    },
    fetcherTask
  )

  const handleCompleteTask = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        action: '/app',
        method: 'PUT',
        encType: 'application/json'
      })
    },
    [task.completed, task.id]
  )

  return (
    <>
      {!showTaskForm && (
        <div className='group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b'>
          <Button
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              task.completed && 'bg-border'
            )}
            variant='outline'
            size='icon'
            role='checkbox'
            aria-checked={task.completed}
            aria-describedby={`Mark task as ${
              task.completed ? 'incomplete' : 'complete'
            }`}
            onClick={async () => {
              await handleCompleteTask(!task.completed)
              if (!task.completed) {
                toast({
                  title: '1 task completed',
                  action: (
                    <ToastAction
                      altText='Undo'
                      onClick={handleCompleteTask.bind(null, false)}
                    >
                      Undo
                    </ToastAction>
                  )
                })
              }
            }}
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                task.completed ? 'opacity-100' : 'opacity-0'
              )}
            />
          </Button>
          <Card className='rounded-none py-2 space-y-1.5 border-none'>
            <CardContent className='p-0'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:text-xs',
                  task.completed && 'line-through text-muted-foreground'
                )}
              >
                {task.content}
              </p>
            </CardContent>
            <CardFooter className='flex gap-4 p-0'>
              {task.due_date && location.pathname !== '/app/today' && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(task.due_date, task.completed)
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(task.due_date)}
                </div>
              )}
              {location.pathname !== '/app/inbox' &&
                location.pathname !== `/app/projects/${project?.$id}` && (
                  <div className='grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto'>
                    <div className='text-right truncate'>
                      {task.project?.name || 'Inbox'}
                    </div>
                    {task.project ? (
                      <Hash size={14} />
                    ) : (
                      <Inbox className='text-muted-foreground' size={14} />
                    )}
                  </div>
                )}
            </CardFooter>
          </Card>
          <div className='absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100'>
            {!task.completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    className='w-6 h-6 text-muted-foreground'
                    size='icon'
                    aria-label='Edit task'
                    onClick={() => setShowTaskForm(true)}
                  >
                    <Edit size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='ghost'
                      className='w-6 h-6 text-muted-foreground'
                      size='icon'
                      aria-label='Delete task'
                    >
                      <Trash2 className='text-red-500' size={14} />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete task</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The <strong>{truncateString(task.content, 48)}</strong> task
                    will be deleted permanently.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      fetcher.submit(JSON.stringify({ id: task.id }), {
                        action: '/app',
                        method: 'DELETE',
                        encType: 'application/json'
                      })
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
      {showTaskForm && (
        <TaskForm
          defaultFormData={{
            ...task,
            project: project && project.$id
          }}
          mode='update'
          className='my-1'
          onCancel={() => setShowTaskForm(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: '/app',
              method: 'PUT',
              encType: 'application/json'
            })

            setShowTaskForm(false)
          }}
        />
      )}
    </>
  )
}

export default TaskCard
