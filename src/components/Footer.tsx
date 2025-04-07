/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Footer component for the app
 */

import { SOCIAL_LINKS } from '@/constants'
import { Separator } from './ui/separator'
const Footer = () => {
  return (
    <footer className='p-4 pb-0'>
      <div className='container flex flex-col items-center justify-center gap-4 py-4 border border-b-0 min-h-16 bg-background rounded-t-xl lg:flex-row lg:justify-between'>
        <p className='text-sm'>&copy; 2025 DanielDev</p>
        <ul className='flex flex-wrap items-center gap-4'>
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li className='flex items-center gap-2' key={href}>
              <a
                className='text-sm text-muted-foreground hover:text-foreground'
                href={href}
                target='_blank'
                rel='noopener noreferrer'
              >
                {label}
              </a>
              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator orientation='vertical' className='h-4 mx-3' />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
