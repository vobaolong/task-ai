/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Error boundary for the project detail page
 */

import Head from '@/components/Head'
import TopAppBar from '@/components/TopAppBar'
import { pageNotFound } from '@/assets'

const ProjectErrorBoundary = () => {
  return (
    <>
      <Head title='Project not found' />
      <TopAppBar title='Project not found' />
      <div className='container flex flex-col items-center justify-center mx-auto grow'>
        <figure className='mt-10'>
          <img src={pageNotFound} alt='404 page not found' width={360} />
        </figure>
        <h1 className='mt-10 text-2xl font-bold'>Project not found</h1>
        <p className='mt-4 text-sm text-muted-foreground'>
          The project you are looking for does not exist.
        </p>
      </div>
    </>
  )
}

export default ProjectErrorBoundary
