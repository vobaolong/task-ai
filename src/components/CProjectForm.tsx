/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project form component for the app
 */

import type { Project, ProjectForm } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { ChevronDown, Circle, Check, Bot } from 'lucide-react'
import {
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  Command
} from './ui/command'
import { ScrollArea } from './ui/scroll-area'
import { PROJECT_COLORS } from '@/constants'
import { Switch } from './ui/switch'
import { Textarea } from './ui/textarea'

type ProjectFormProps = {
  defaultFormData?: Project
  mode: 'create' | 'update'
  onCancel?: () => void
  onSubmit?: (formData: ProjectForm) => void
}

const DEFAULT_PROJECT_NAME = 'Untitled'
const DEFAULT_PROJECT_COLOR_NAME = 'Slate'
const DEFAULT_PROJECT_COLOR_HEX = '#64748b'

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX
}

const CProjectForm: React.FC<ProjectFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel = () => {},
  onSubmit
}) => {
  const [projectName, setProjectName] = useState<string>(defaultFormData?.name)

  const [projectNameCharCount, setProjectNameCharCount] = useState<number>(
    defaultFormData?.name?.length
  )

  const [projectColorName, setProjectColorName] = useState<string>(
    defaultFormData?.color_name
  )

  const [projectColorHex, setProjectColorHex] = useState<string>(
    defaultFormData?.color_hex
  )

  const [isColorOpen, setIsColorOpen] = useState<boolean>(false)

  const [isAiGenerate, setIsAiGenerate] = useState<boolean>(false)

  const [taskGenPrompt, setTaskGenPrompt] = useState<string>('')

  const [formData, setFormData] = useState<ProjectForm>({
    ...defaultFormData,
    ai_task_gen: isAiGenerate,
    task_gen_prompt: taskGenPrompt
  })

  const handleSubmit = useCallback(() => {
    onSubmit?.(formData)
  }, [formData, onSubmit])

  const handleKeySubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: projectName,
      color_name: projectColorName,
      color_hex: projectColorHex,
      ai_task_gen: isAiGenerate,
      task_gen_prompt: taskGenPrompt
    }))
  }, [
    projectName,
    projectColorName,
    projectColorHex,
    isAiGenerate,
    taskGenPrompt
  ])

  return (
    <Card>
      <CardHeader className='p-4'>
        <CardTitle> {mode === 'create' ? 'Add' : 'Update'} Project </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='grid grid-cols-1 gap-2 p-4'>
        <div className=''>
          <div className=''>
            <Label htmlFor='project-name'>Name</Label>
            <Input
              type='text'
              id='project-name'
              placeholder='Project Name'
              value={projectName}
              className='mt-2 mb-1'
              onInput={(e) => {
                setProjectName(e.currentTarget.value)
                setProjectNameCharCount(e.currentTarget.value.length)
              }}
              maxLength={120}
              onKeyDown={handleKeySubmit}
            />

            <div
              className={cn(
                'text-xs text-muted-foreground max-w-max ms-auto',
                projectNameCharCount >= 110 && 'text-destructive'
              )}
            >
              {projectNameCharCount}/120
            </div>
          </div>
        </div>

        <div className=''>
          <Label htmlFor='color'>Color</Label>
          <Popover modal open={isColorOpen} onOpenChange={setIsColorOpen}>
            <PopoverTrigger asChild>
              <Button id='color' variant='outline' className='w-full mt-2'>
                <Circle fill={projectColorHex} />
                {projectColorName}
                <ChevronDown className='ms-auto' />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align='start'
              className='w-[478px] max-sm:w-[360px] p-0'
            >
              <Command>
                <CommandInput placeholder='Search color...' />
                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No color found</CommandEmpty>
                    <CommandGroup>
                      {PROJECT_COLORS.map(({ name, hex }) => (
                        <CommandItem
                          key={name}
                          onSelect={(value) => {
                            const [name, hex] = value.split('=')
                            setProjectColorName(name)
                            setProjectColorHex(hex)
                            setIsColorOpen(false)
                          }}
                          value={`${name}=${hex}`}
                        >
                          <Circle fill={hex} />
                          {name}
                          {projectColorName === name && (
                            <Check className='ms-auto' />
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {mode === 'create' && (
          <div className='mt-6 border rounded-md'>
            <div className='flex items-center gap-3 px-3 py-2'>
              <Bot className='flex-shrink-0 text-muted-foreground' />
              <div className='space-y-0.5 me-auto'>
                <Label className='block text-sm' htmlFor='ai_generate'>
                  AI Task Generator
                </Label>
                <p className='text-xs text-muted-foreground'>
                  Generate tasks with AI
                </p>
              </div>
              <Switch
                id='ai_generate'
                checked={isAiGenerate}
                onCheckedChange={setIsAiGenerate}
              />
            </div>

            {isAiGenerate && (
              <div className='p-3'>
                <Textarea
                  autoFocus
                  id='task_gen_prompt'
                  placeholder='Tell me about your project. What do you want to achieve?'
                  value={taskGenPrompt}
                  onChange={(e) => setTaskGenPrompt(e.currentTarget.value)}
                  onKeyDown={handleKeySubmit}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>

      <Separator />
      <CardFooter className='flex justify-end gap-3 p-4'>
        <div className='flex items-center gap-2'>
          <Button variant='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={!projectName || (isAiGenerate && !taskGenPrompt)}
            onClick={handleSubmit}
          >
            {mode === 'create' ? 'Add' : 'Update'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CProjectForm
