/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Skeleton for the task card
 */

import { Skeleton } from './ui/skeleton'

const TaskCardSkeleton = () => {
  return (
    <div className='grid grid-cols-[max-content,1fr] gap-3 border-b	items-center pt-2 pb-3.5'>
      <Skeleton className='w-5 h-5 rounded-full' />
      <Skeleton className='h-3 me-10' />
    </div>
  )
}

export default TaskCardSkeleton
