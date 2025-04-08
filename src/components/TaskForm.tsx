/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Task form for the app
 */

// Icons
import {
  CalendarIcon,
  ChevronDown,
  Hash,
  Inbox,
  X,
  SendHorizonal
} from 'lucide-react'

// Components
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Textarea } from './ui/textarea'
import { Calendar } from './ui/calendar'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Separator } from './ui/separator'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './ui/command'
import { ScrollArea } from './ui/scroll-area'
import type { TaskForm } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import * as chrono from 'chrono-node'
import { cn, formatCustomDate, getTaskDueDateColorClass } from '@/lib/utils'

type TaskFormProps = {
  defaultFormData?: TaskForm
  className?: string
  mode: 'create' | 'update'
  onCancel?: () => void
  onSubmit?: (formData: TaskForm) => void
}

const DEFAULT_FORM_DATA: TaskForm = {
  content: '',
  due_date: null,
  project: null
}

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit
}) => {
  const [taskContent, setTaskContent] = useState(defaultFormData.content)
  const [dueDate, setDueDate] = useState(defaultFormData.due_date)
  const [project, setProject] = useState(defaultFormData.project)
  const [dueDateOpen, setDueDateOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(false)
  const [formData, setFormData] = useState(defaultFormData)

  const handleSubmit = useCallback(() => {
    if (!taskContent) return
    if (onSubmit) {
      onSubmit(formData)
    }
    setTaskContent('')
  }, [taskContent, onSubmit, formData])

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: taskContent,
      due_date: dueDate,
      project: project
    }))
  }, [taskContent, dueDate, project])

  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent)
    if (chronoParsed.length > 0) {
      const lastDate = chronoParsed[chronoParsed.length - 1]
      setDueDate(lastDate.date())
    }
  }, [taskContent])

  return (
    <Card className={cn('focus-within:border-foreground/50', className)}>
      <CardContent className='p-2'>
        <Textarea
          autoFocus
          placeholder='After finishing the project, take a tour'
          className='resize-none !border-0 !ring-0 mb-2 p-1'
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />

        <div className='rounded-md ring-1 ring-border max-w-max'>
          <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
            <PopoverTrigger asChild>
              <Button
                className={cn(getTaskDueDateColorClass(dueDate, false))}
                type='button'
                variant='ghost'
                size='sm'
              >
                <CalendarIcon />
                {dueDate ? formatCustomDate(dueDate) : 'Due date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                initialFocus
                disabled={{ before: new Date() }}
                onSelect={(selected) => {
                  setDueDate(selected || null)
                  setDueDateOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='px-2 -ms-2'
                  variant='ghost'
                  size='sm'
                  aria-label='Remove due date'
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className='grid grid-cols-[minmax(0,1fr),max-content] gap-2 p-2'>
        <Popover modal open={projectOpen} onOpenChange={setProjectOpen}>
          <PopoverTrigger asChild>
            <Button
              role='combobox'
              className='max-w-max'
              variant='ghost'
              size='sm'
              aria-expanded={projectOpen}
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent className='w-[240px] p-0' align='start'>
            <Command>
              <CommandInput placeholder='Search...' />
              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found.</CommandEmpty>

                  <CommandGroup heading='Folders'>
                    <CommandItem>
                      <Hash /> Project 01
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 02
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className='flex items-center gap-2'>
          <Button variant='secondary' onClick={onCancel}>
            <span className='max-md:hidden'>Cancel</span>
            <X className='md:hidden' />
          </Button>
          <Button disabled={!taskContent} onClick={handleSubmit}>
            <span className='max-md:hidden'>
              {mode === 'create' ? 'Add Task' : 'Save'}
            </span>
            <SendHorizonal className='md:hidden' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskForm
