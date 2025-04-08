/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Top app bar component for the app
 */

// Components
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { SidebarTrigger } from './ui/sidebar'
import Kbd from './Kbd'

// Hooks
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TopAppBarProps = {
  title: string
  taskCount?: number
}

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70)
    listener()
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  return (
    <div
      className={cn(
        'sticky top-0 z-40 grid grid-cols-[40px,minmax(0,1fr),40px] items-center h-14 bg-background px-4',
        showTitle && 'border-b'
      )}
    >
      <Tooltip>
        <TooltipTrigger>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle sidebar</p>
          <Kbd kbdList={['Ctrl', 'B']} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'max-w-[480px] mx-auto text-center transition-[transform,opacity]',
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        )}
      >
        <h1 className='text-lg font-semibold truncate'>{title}</h1>
        {taskCount && (
          <p className='text-sm text-muted-foreground'>{taskCount} tasks</p>
        )}
      </div>
    </div>
  )
}

export default TopAppBar
