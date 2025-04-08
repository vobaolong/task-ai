/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Task create button component
 */

import { CirclePlus } from 'lucide-react'
import { Button } from './ui/button'

type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      className='justify-start w-full px-0 mb-4'
      variant='link'
      {...props}
    >
      <CirclePlus /> Add Task
    </Button>
  )
}

export default TaskCreateButton
