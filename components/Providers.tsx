'use client'

import { LanguageProvider } from '@/lib/LanguageContext'
import Navigation from './Navigation'
import Footer from './Footer'
import LoadingScreen from './LoadingScreen'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Lazy load GiveButton (not critical for initial render)
const GiveButton = dynamic(() => import('./GiveButton'), {
  ssr: false,
})

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Only show loading screen on initial page load
  useEffect(() => {
    // Check if we've already loaded before (session storage)
    const hasLoadedBefore = sessionStorage.getItem('ebomi_loaded')
    
    if (hasLoadedBefore) {
      setIsLoading(false)
      setHasLoaded(true)
      return
    }

    // On first load, show loading screen
    setIsLoading(true)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasLoaded(true)
    // Mark as loaded in session storage
    sessionStorage.setItem('ebomi_loaded', 'true')
  }

  return (
    <LanguageProvider>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <GiveButton />
      </div>
    </LanguageProvider>
  )
}
