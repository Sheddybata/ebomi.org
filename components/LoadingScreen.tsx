'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  // Critical images to preload
  const criticalImages = [
    '/ebomilogo.png',
    '/hero slideshow/1.jpg',
    '/hero slideshow/4.jpg',
    '/aboutus.jpg',
    '/ebomitvsection.png',
  ]

  useEffect(() => {
    // Preload images with better error handling
    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // Continue even if image fails
        img.src = src.startsWith('/') ? src : `/${src}`
      })
    }

    // Load all images in parallel
    Promise.all(criticalImages.map(loadImage)).then(() => {
      // Ensure minimum 2 seconds display time for smooth experience
      const elapsed = Date.now() - startTimeRef.current
      const minDisplayTime = 2000 // 2 seconds
      const remainingTime = Math.max(0, minDisplayTime - elapsed)
      
      setTimeout(() => {
        // Start fade-out animation
        setIsExiting(true)
        // Complete after fade animation
        setTimeout(() => {
          onComplete()
        }, 500) // Match fade-out duration
      }, remainingTime)
    })
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-navy via-navy-light to-navy-dark flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading screen"
      role="status"
    >
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated EBOMI Logo */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gold/20 rounded-full animate-pulse blur-2xl"></div>
          
          {/* Rotating ring */}
          <div className="absolute inset-0 border-4 border-gold/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 border-4 border-gold/20 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
          
          {/* Logo with bounce animation */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full p-8 sm:p-12 md:p-16">
              <Image
                src="/ebomilogo.png"
                alt="EBOMI Logo"
                fill
                className="object-contain drop-shadow-2xl animate-bounce-slow"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
              />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
