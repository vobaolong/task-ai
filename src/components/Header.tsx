/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Header component for the app
 */

import { Link } from 'react-router'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 w-full p-4'>
      <div className='container flex items-center justify-between h-16 p-4 border backdrop-blur-3xl rounded-xl'>
        <Link to='/'>
          <Logo />
        </Link>
        <div className='flex items-center gap-4'>
          <Button variant='outline' asChild>
            <Link to='/sign-in'>Sign in</Link>
          </Button>
          <Button asChild>
            <Link to='/sign-up'>Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
