/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Page component for the app
 */

import type { PropsWithChildren } from 'react'

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='container md:max-w-screen-md'>{children}</div>
}

const PageHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='pt-2 pb-3 space-y-2 lg:px-10 md:px-4'>{children}</div>
}

const PageContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className='text-2xl font-semibold'>{children}</h1>
}

const PageList: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className='pt-2 pb-20 md:px-4 lg:px-10'>{children}</div>
}

export { Page, PageHeader, PageContent, PageList }
