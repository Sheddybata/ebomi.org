'use client'

import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useEffect } from 'react'

export type ScanPopupType = 'success' | 'warning' | 'error'

export interface ScanPopupState {
  type: ScanPopupType
  title: string
  message: string
  name?: string
}

interface ScanFeedbackPopupProps {
  popup: ScanPopupState | null
  onDismiss: () => void
}

export default function ScanFeedbackPopup({ popup, onDismiss }: ScanFeedbackPopupProps) {
  useEffect(() => {
    if (!popup) return
    const timer = setTimeout(onDismiss, 2800)
    return () => clearTimeout(timer)
  }, [popup, onDismiss])

  if (!popup) return null

  const styles = {
    success: {
      bg: 'bg-green-600',
      icon: CheckCircle,
    },
    warning: {
      bg: 'bg-amber-500',
      icon: AlertTriangle,
    },
    error: {
      bg: 'bg-red-600',
      icon: XCircle,
    },
  }[popup.type]

  const Icon = styles.icon

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      onClick={onDismiss}
      role="dialog"
      aria-live="assertive"
    >
      <div
        className={`${styles.bg} text-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-modal-fade-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon className="w-16 h-16 mx-auto mb-4" strokeWidth={2.5} />
        <h3 className="text-2xl sm:text-3xl font-bold mb-2">{popup.title}</h3>
        {popup.name && <p className="text-lg font-semibold mb-2 opacity-95">{popup.name}</p>}
        <p className="text-base opacity-90">{popup.message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 font-semibold text-sm"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
