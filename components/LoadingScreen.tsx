'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const containerRef = useRef<HTMLDivElement>(null)

  // Ministry Arms Logos
  const ministryLogos = [
    '/arms/tanjuriel.png',
    '/arms/ibbn.png',
    '/arms/DISEF.png',
    '/arms/school.png',
  ]

  // Critical images to preload
  const criticalImages = [
    '/ebomilogo.png',
    '/hero slideshow/1.jpg',
    '/hero slideshow/4.jpg',
    ...ministryLogos,
    '/aboutus.jpg',
    '/ebomitvsection.png',
  ]

  useEffect(() => {
    // Preload images with better error handling
    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        // Use Next.js Image optimization for better performance
        const img = new window.Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // Continue even if image fails
        // Use absolute path for proper loading
        img.src = src.startsWith('/') ? src : `/${src}`
      })
    }

    // Load all images in parallel
    Promise.all(criticalImages.map(loadImage)).then(() => {
      // Ensure minimum 5 seconds display time and at least one full cycle of logos
      const elapsed = Date.now() - startTimeRef.current
      const minDisplayTime = 5000 // 5 seconds
      const minCycleTime = ministryLogos.length * 1500 // Time to see all logos
      const requiredTime = Math.max(minDisplayTime, minCycleTime)
      const remainingTime = Math.max(0, requiredTime - elapsed)
      
      setTimeout(() => {
        // Start fade-out animation
        setIsExiting(true)
        // Complete after fade animation
        setTimeout(() => {
          onComplete()
        }, 500) // Match fade-out duration
      }, remainingTime)
    })
  }, [onComplete, ministryLogos.length])

  // Auto-rotate logos with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ministryLogos.length)
    }, 1500) // Change every 1.5 seconds

    return () => clearInterval(interval)
  }, [ministryLogos.length])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading screen"
      role="status"
    >
      <div className="relative z-10 flex items-center justify-center">
        {/* Logo Carousel */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          {ministryLogos.map((logo, index) => {
            const isActive = index === currentSlide
            
            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
                aria-hidden={!isActive}
              >
                <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-12 md:p-16">
                  <div className="relative w-full h-full drop-shadow-lg">
                    <Image
                      src={logo}
                      alt={`${index === 0 ? 'Tanjuriel Corporations' : index === 1 ? 'IBBN' : index === 2 ? 'DISEF Foundation' : 'EBOMI Group of Schools'} logo`}
                      fill
                      className="object-contain transition-transform duration-300"
                      priority={isActive}
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
