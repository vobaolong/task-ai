/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Task card component
 */

import { Models } from 'appwrite'
import { Button } from './ui/button'
import { cn, formatCustomDate, getTaskDueDateColorClass } from '@/lib/utils'
import { CalendarDays, Check, Edit, Hash, Inbox, Trash2 } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import TaskForm from './TaskForm'
import { useState } from 'react'
import { useFetcher } from 'react-router'

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

  return (
    <>
      {!showTaskForm && (
        <div className='group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b'>
          <Button
            className={cn(
              'group/button rounded-full w-5 h-5 mt-2',
              completed && 'bg-border'
            )}
            variant='outline'
            size='icon'
            role='checkbox'
            aria-checked={completed}
            aria-describedby={`Mark task as ${
              completed ? 'incomplete' : 'complete'
            }`}
          >
            <Check
              strokeWidth={4}
              className={cn(
                '!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity',
                completed ? 'opacity-100' : 'opacity-0'
              )}
            />
          </Button>
          <Card className='rounded-none py-2 space-y-1.5 border-none'>
            <CardContent className='p-0'>
              <p
                id='task-content'
                className={cn(
                  'text-sm max-md:text-xs',
                  completed && 'line-through text-muted-foreground'
                )}
              >
                {content}
              </p>
            </CardContent>
            <CardFooter className='flex gap-4 p-0'>
              {dueDate && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs text-muted-foreground',
                    getTaskDueDateColorClass(dueDate, completed)
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(dueDate)}
                </div>
              )}
              <div className='grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto'>
                <div className='text-right truncate'>
                  {project?.name || 'Inbox'}
                </div>
                {project ? (
                  <Hash size={14} />
                ) : (
                  <Inbox className='text-muted-foreground' size={14} />
                )}
              </div>
            </CardFooter>
          </Card>
          <div className='absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hsl(var(--background))] flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100'>
            {!completed && (
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  className='w-6 h-6 text-muted-foreground'
                  size='icon'
                  aria-label='Delete task'
                >
                  <Trash2 className='text-red-500' size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
      {showTaskForm && (
        <TaskForm
          defaultFormData={{
            id,
            content,
            due_date: dueDate,
            projectId: project?.$id || null,
            completed
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
