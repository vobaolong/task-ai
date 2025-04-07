/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Logo component for the app
 */

import { logo } from '@/assets'

const Logo = () => {
  return (
    <div className='flex items-center gap-2 text-lg font-semibold'>
      <img src={logo} alt='TaskAI Logo' className='w-6 h-6' />
      <span>TaskAI</span>
    </div>
  )
}

export default Logo
