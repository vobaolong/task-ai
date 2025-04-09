/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project search field component for the app
 */

import { Loader2, Search } from 'lucide-react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type SearchingState = 'idle' | 'loading' | 'searching'

type ProjectSearchFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  searchingState: SearchingState
}

const ProjectSearchField: React.FC<ProjectSearchFieldProps> = ({
  handleChange,
  searchingState
}) => {
  return (
    <div className='relative'>
      <Search
        size={18}
        className='absolute -translate-y-1/2 pointer-events-none top-1/2 left-2 text-muted-foreground'
      />
      <Input
        type='text'
        name='q'
        placeholder='Search projects'
        className='px-8'
        onChange={handleChange}
      />
      <Loader2
        size={18}
        className={cn(
          'absolute hidden right-2 top-2 text-muted-foreground',
          searchingState !== 'idle' && 'block animate-spin'
        )}
      />
    </div>
  )
}

export default ProjectSearchField
