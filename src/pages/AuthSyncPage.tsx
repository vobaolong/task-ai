/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Auth Sync page for the app
 */

import Head from '@/components/Head'
import { SignIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const AuthSyncPage = () => {
  const navigate = useNavigate()
  const { isSignedIn, isLoaded, userId } = useAuth()

  useEffect(() => {
    const syncAuth = async () => {
      if (!isLoaded) return

      // If user is signed in, save ID and redirect
      if (isSignedIn && userId) {
        localStorage.setItem('clerkUserId', userId)
        navigate('/app/today', { replace: true })
        return
      }

      // If user is not signed in, clear storage and redirect
      if (isLoaded && !isSignedIn) {
        localStorage.removeItem('clerkUserId')
        navigate('/', { replace: true })
      }
    }

    syncAuth()
  }, [isLoaded, isSignedIn, userId, navigate])

  // Show loading state while checking auth
  if (!isLoaded) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-8 h-8 border-b-2 rounded-full animate-spin border-primary'></div>
      </div>
    )
  }

  // Only show sign in form if not signed in
  if (!isSignedIn) {
    return (
      <>
        <Head title='Auth Sync | TaskAI & Project Management' />
        <section>
          <div className='container flex justify-center'>
            <SignIn signUpUrl='/sign-up' />
          </div>
        </section>
      </>
    )
  }

  return null
}

export default AuthSyncPage
