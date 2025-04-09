/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Home page for the app
 */

import { heroBannerLg, heroBannerSm } from '@/assets'
import Head from '@/components/Head'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

const HomePage = () => {
  return (
    <>
      <Head title='TaskAI - AI-Powered & Project Manager' />
      <section>
        <div className='container !px-8 grid grid-cols-1 gap-8 items-center xl:gap-12 xl:grid-cols-[1fr_1.5fr]'>
          <div className='flex flex-col items-center space-y-4 text-center lg:text-left lg:items-start lg:space-y-6'>
            <h1 className='max-w-[22ch] text-4xl font-semibold md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl'>
              Simplify <span className='text-primary'>Your</span> Projects and
              Life with
              <span className='text-primary'> TaskAI</span>
            </h1>
            <p className='text-foreground/80 max-w-[40ch] md:text-lg lg:text-xl'>
              TaskAI is a project manager that helps you manage your projects
              and life with AI.
            </p>
            <Button asChild size={'lg'}>
              <Link to='/sign-up'>Start for free</Link>
            </Button>
          </div>
          <figure className='bg-secondary rounded-2xl overflow-hidden aspect-square max-md:max-w-[480px] max-md:mx-auto md:aspect-video'>
            <img
              src={heroBannerSm}
              width={480}
              height={480}
              alt='TaskAI'
              className='md:hidden'
            />
            <img
              src={heroBannerLg}
              width={960}
              height={540}
              alt='TaskAI'
              className='max-md:hidden'
            />
          </figure>
        </div>
      </section>
    </>
  )
}

export default HomePage
