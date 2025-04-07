/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Sign in page for the app
 */

import Head from '@/components/Head'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <>
      <Head title='Sign in | TaskAI & Project Management' />
      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/sign-up' />
        </div>
      </section>
    </>
  )
}

export default SignInPage
