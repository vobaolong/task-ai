/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Error boundary for the app
 */

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { pageNotFound } from '@/assets'

const ErrorBoundary = () => {
  const error = useRouteError()

  return (
    <div className='flex flex-col min-h-[100dvh] overflow-hidden'>
      <Header />
      <div className='container flex flex-col items-center justify-center pt-32 pb-12 grow'>
        <h1 className='text-2xl font-semibold text-center md:text-3xl'>
          {isRouteErrorResponse(error)
            ? 'Hmm... Page not found'
            : 'Oops! Something went wrong'}
        </h1>
        <p className='mt-4 mb-6 text-sm text-center text-muted-foreground sm:text-lg max-w-[55ch]'>
          {isRouteErrorResponse(error)
            ? 'You can get back the track and manage your task with TaskAI.'
            : 'We are working on fixing this issue. Please try again later.'}
        </p>
        <div className='flex gap-4 mt-4'>
          <Button asChild>
            <Link to='/'>Return to home</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link to='/app/inbox'>Inbox</Link>
          </Button>
        </div>

        <figure className='mt-10 max-w-[400px] mx-auto'>
          <img
            width={560}
            height={370}
            src={pageNotFound}
            alt='Page not found'
            className='object-cover w-full h-full'
          />
        </figure>
      </div>
      <Footer />
    </div>
  )
}

export default ErrorBoundary
