/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Root layout for the app
 */

import { Outlet, useNavigation } from 'react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { logo } from '@/assets'
import { Loader2 } from 'lucide-react'

const RootLayout = () => {
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading' && !navigation.formData
  return (
    <div className='relative isolate flex flex-col min-h-[100dvh] overflow-hidden'>
      <Header />
      <main className='grid items-center grid-cols-1 pb-16 grow pt-36'>
        <Outlet />
      </main>
      <Footer />
      <div className='absolute left-0 h-10 origin-top-left rotate-45 bg-primary/20 top-20 w-80 blur-3xl'></div>
      <div className='absolute right-0 h-10 origin-top-right -rotate-45 bg-primary/20 top-20 w-80 blur-3xl'></div>

      {/* Loader */}
      {isLoading && (
        <div className='fixed top-0 left-0 z-50 h-[100vh] bg-background flex flex-col items-center justify-center gap-5	'>
          <img src={logo} alt='TaskAI' width={64} height={64} />
          <Loader2 className='animate-spin text-muted-foreground' />
        </div>
      )}
    </div>
  )
}

export default RootLayout
