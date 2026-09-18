'use client'

import { LanguageProvider } from '@/lib/LanguageContext'
import Navigation from './Navigation'
import Footer from './Footer'
import LoadingScreen from './LoadingScreen'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Lazy load GiveButton (not critical for initial render)
const GiveButton = dynamic(() => import('./GiveButton'), {
  ssr: false,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Only show loading screen on initial public page load — skip it on admin
  useEffect(() => {
    if (isAdmin) {
      setIsLoading(false)
      setHasLoaded(true)
      return
    }

    const hasLoadedBefore = sessionStorage.getItem('ebomi_loaded')
    
    if (hasLoadedBefore) {
      setIsLoading(false)
      setHasLoaded(true)
      return
    }

    setIsLoading(true)
  }, [isAdmin])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasLoaded(true)
    // Mark as loaded in session storage
    sessionStorage.setItem('ebomi_loaded', 'true')
  }

  return (
    <LanguageProvider>
      {isLoading && !isAdmin && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={isLoading && !isAdmin ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {!isAdmin && <Navigation />}
        <main className={isAdmin ? undefined : 'min-h-screen'}>
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <GiveButton />}
      </div>
    </LanguageProvider>
  )
}
