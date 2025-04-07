/* eslint-disable react-hooks/exhaustive-deps */
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
    if (!isLoaded) return
    if (!isSignedIn) {
      if (localStorage.getItem('clerkUserId')) {
        localStorage.removeItem('clerkUserId')
      }
      navigate('/')
      return
    }
    if (isSignedIn) {
      localStorage.setItem('clerkUserId', userId)
      navigate('/app/today')
    }
  }, [isLoaded, isSignedIn, userId])
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

export default AuthSyncPage
