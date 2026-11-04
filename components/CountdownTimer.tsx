'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-navy" />
          <span className="text-ink font-semibold text-sm sm:text-base">Event has started!</span>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { label: 'Days', shortLabel: 'Days', value: timeLeft.days },
    { label: 'Hours', shortLabel: 'Hrs', value: timeLeft.hours },
    { label: 'Minutes', shortLabel: 'Mins', value: timeLeft.minutes },
    { label: 'Seconds', shortLabel: 'Secs', value: timeLeft.seconds },
  ]

  return (
    <div className="bg-white rounded-xl p-3 sm:p-6 border border-stone-200 overflow-hidden">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-canvas rounded-lg flex items-center justify-center border border-stone-200 flex-shrink-0">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
        </div>
        <div className="min-w-0">
          <div className="text-muted font-semibold text-xs sm:text-sm uppercase tracking-wider">Time Until Event</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            className="bg-canvas rounded-lg px-1 py-2 sm:p-3 text-center border border-stone-200 min-w-0"
          >
            <div className="text-ink text-lg sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 tabular-nums leading-none">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-muted text-[10px] sm:text-sm uppercase tracking-tight sm:tracking-wider leading-tight">
              <span className="sm:hidden">{unit.shortLabel}</span>
              <span className="hidden sm:inline">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
