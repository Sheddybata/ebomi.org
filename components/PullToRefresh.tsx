'use client'

import { useState, useEffect, useRef } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: React.ReactNode
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef<number | null>(null)
  const currentY = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const PULL_THRESHOLD = 80
  const MAX_PULL = 120

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null || window.scrollY > 0) return

      currentY.current = e.touches[0].clientY
      const distance = currentY.current - startY.current

      if (distance > 0) {
        e.preventDefault()
        const pull = Math.min(distance * 0.5, MAX_PULL)
        setPullDistance(pull)
      }
    }

    const handleTouchEnd = async () => {
      if (startY.current === null || currentY.current === null) {
        startY.current = null
        currentY.current = null
        return
      }

      const distance = currentY.current - startY.current

      if (distance > PULL_THRESHOLD && window.scrollY === 0) {
        setIsRefreshing(true)
        setPullDistance(0)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      } else {
        setPullDistance(0)
      }

      startY.current = null
      currentY.current = null
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onRefresh])

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1)
  const shouldShowIndicator = pullDistance > 10 || isRefreshing

  return (
    <div ref={containerRef} className="relative">
      {/* Pull to refresh indicator */}
      {shouldShowIndicator && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-md transition-all duration-300"
          style={{
            height: `${Math.min(pullDistance, MAX_PULL)}px`,
            opacity: pullProgress,
            transform: `translateY(${Math.min(pullDistance - 60, 0)}px)`,
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <RefreshCw
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                isRefreshing ? 'animate-spin' : pullProgress >= 1 ? 'rotate-180' : ''
              }`}
            />
            <span className="text-white text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : pullProgress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}
