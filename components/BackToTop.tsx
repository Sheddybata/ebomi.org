'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 sm:right-6 z-40 bg-navy text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-navy-light transition-all duration-300 hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
      aria-label="Back to top"
      style={{ bottom: 'max(8rem, calc(env(safe-area-inset-bottom, 2rem) + 6rem))' }}
    >
      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  )
}
