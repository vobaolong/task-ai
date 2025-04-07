/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Sign up page for the app
 */

import Head from '@/components/Head'
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <>
      <Head title='Create an account | TaskAI & Project Management' />
      <section>
        <div className='container flex justify-center'>
          <SignUp signInUrl='/sign-in' />
        </div>
      </section>
    </>
  )
}

export default SignUpPage
