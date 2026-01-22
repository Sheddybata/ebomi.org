'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
  autoScroll?: boolean
  scrollSpeed?: number
  pauseOnHover?: boolean
  pauseOnTouch?: boolean
  onScroll?: (scrollLeft: number) => void
  scrollRef?: React.RefObject<HTMLDivElement> | React.MutableRefObject<HTMLDivElement | null>
}

export default function HorizontalScroll({
  children,
  className = '',
  autoScroll = false,
  scrollSpeed = 0.5,
  pauseOnHover = true,
  pauseOnTouch = true,
  onScroll,
  scrollRef,
}: HorizontalScrollProps) {
  const internalRef = useRef<HTMLDivElement>(null)
  const containerRef = scrollRef || internalRef
  const [isPaused, setIsPaused] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const scrollStartX = useRef<number | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || !containerRef.current || isPaused || isTouching) return

    const scrollContainer = containerRef.current
    let scrollPosition = scrollContainer.scrollLeft
    let animationFrameId: number

    const scroll = () => {
      if (scrollContainer && !isPaused && !isTouching) {
        scrollPosition += scrollSpeed
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

        if (scrollPosition >= maxScroll) {
          scrollPosition = 0 // Reset to start for infinite loop
        }

        scrollContainer.scrollLeft = scrollPosition
        if (onScroll) onScroll(scrollPosition)
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [autoScroll, scrollSpeed, isPaused, isTouching, onScroll])

  // Handle touch events for better mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    const touch = e.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    scrollStartX.current = containerRef.current.scrollLeft

    if (pauseOnTouch) {
      setIsTouching(true)
      setIsPaused(true)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || touchStartX.current === null || touchStartY.current === null) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    // Determine if this is primarily a horizontal or vertical gesture
    const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY)

    if (isHorizontalGesture && scrollStartX.current !== null) {
      // Horizontal scroll - allow it and prevent default to stop page scroll
      e.preventDefault()
      containerRef.current.scrollLeft = scrollStartX.current - deltaX
      if (onScroll) onScroll(containerRef.current.scrollLeft)
    }
    // If vertical gesture, don't prevent default - let page scroll naturally
  }

  const handleTouchEnd = () => {
    touchStartX.current = null
    touchStartY.current = null
    scrollStartX.current = null

    if (pauseOnTouch) {
      // Resume after a short delay
      setTimeout(() => {
        setIsTouching(false)
        setIsPaused(false)
      }, 500)
    }
  }

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true)
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false)
  }

  const handleScroll = () => {
    if (containerRef.current && onScroll) {
      onScroll(containerRef.current.scrollLeft)
    }
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onScroll={handleScroll}
      className={`flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x-proximity snap-start horizontal-scroll-touch ${className}`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {children}
    </div>
  )
}
