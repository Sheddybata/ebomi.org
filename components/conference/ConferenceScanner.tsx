'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import type { ConferenceRegistrationRecord, ScanAction } from '@/lib/conference/types'
import ScanFeedbackPopup, { type ScanPopupState } from '@/components/conference/ScanFeedbackPopup'
import { adminInputClass } from '@/lib/conference/formStyles'

const ACTIONS: { value: ScanAction; label: string }[] = [
  { value: 'check_in', label: 'Check-in' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
]

const SCAN_COOLDOWN_MS = 2500

function popupFromResult(
  action: ScanAction,
  ok: boolean,
  errorMessage: string | undefined,
  registration: ConferenceRegistrationRecord | null
): ScanPopupState {
  const name = registration?.name

  if (ok) {
    if (action === 'check_in') {
      return { type: 'success', title: 'Checked-in', message: 'Successful', name }
    }
    return { type: 'success', title: 'Successful', message: 'Meal collected successfully', name }
  }

  if (errorMessage?.toLowerCase().includes('already checked in')) {
    return { type: 'warning', title: 'Already checked in', message: 'This participant is already checked in.', name }
  }

  if (errorMessage?.toLowerCase().includes('meal has been collected')) {
    return {
      type: 'warning',
      title: 'Meal has been collected',
      message: 'Ticket has been used.',
      name,
    }
  }

  if (
    errorMessage?.toLowerCase().includes('meal') ||
    errorMessage?.toLowerCase().includes('ticket')
  ) {
    return { type: 'warning', title: 'Ticket has been used', message: 'Meal has already been collected.', name }
  }

  if (errorMessage?.toLowerCase().includes('not found')) {
    return { type: 'error', title: 'Not registered', message: 'This QR code was not found.', name }
  }

  return { type: 'error', title: 'Scan failed', message: errorMessage || 'Please try again.', name }
}

const SCANNER_REGION_ID = 'conference-qr-reader'
let cameraSession: Promise<void> = Promise.resolve()

async function stopScannerSafely(scanner: Html5Qrcode | null) {
  if (!scanner) return
  try {
    if (scanner.isScanning) {
      await scanner.stop()
    }
  } catch {
    // html5-qrcode throws if stop() runs before the camera has started
  }
  try {
    scanner.clear()
  } catch {
    // ignore leftover DOM from a previous camera session
  }
}

export default function ConferenceScanner() {
  const [action, setAction] = useState<ScanAction>('check_in')
  const [manualId, setManualId] = useState('')
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [popup, setPopup] = useState<ScanPopupState | null>(null)
  const [lastRegistration, setLastRegistration] = useState<ConferenceRegistrationRecord | null>(null)
  const busyRef = useRef(false)
  const lastScanRef = useRef<{ id: string; at: number } | null>(null)
  const actionRef = useRef(action)
  const processScanRef = useRef<(id: string) => void>(() => {})
  actionRef.current = action

  const dismissPopup = useCallback(() => setPopup(null), [])

  const processScan = useCallback(async (registrationId: string) => {
    const id = registrationId.trim()
    if (!id || busyRef.current) return

    const now = Date.now()
    if (
      lastScanRef.current &&
      lastScanRef.current.id === id &&
      now - lastScanRef.current.at < SCAN_COOLDOWN_MS
    ) {
      return
    }

    busyRef.current = true
    lastScanRef.current = { id, at: now }

    try {
      const response = await fetch('/api/conference/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: id, action: actionRef.current }),
      })
      const result = await response.json()

      if (response.ok) {
        setLastRegistration(result.registration)
        setManualId('')
        setPopup(popupFromResult(actionRef.current, true, undefined, result.registration))
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(200)
        }
      } else {
        if (result.registration) setLastRegistration(result.registration)
        setPopup(popupFromResult(actionRef.current, false, result.error, result.registration ?? null))
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 80, 100])
        }
      }
    } catch {
      setPopup({
        type: 'error',
        title: 'Network error',
        message: 'Could not reach the server. Check your connection.',
      })
    } finally {
      setTimeout(() => {
        busyRef.current = false
      }, SCAN_COOLDOWN_MS)
    }
  }, [])

  processScanRef.current = processScan

  useEffect(() => {
    let cancelled = false
    let scanner: Html5Qrcode | null = null

    const session = cameraSession.then(async () => {
      if (cancelled) return

      const region = document.getElementById(SCANNER_REGION_ID)
      if (!region) {
        setCameraError('Scanner area could not be found. Refresh the page and try again.')
        return
      }

      try {
        scanner = new Html5Qrcode(SCANNER_REGION_ID)
        const isMobile = window.innerWidth < 768
        const qrboxSize = isMobile ? Math.min(window.innerWidth - 80, 280) : 260

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: qrboxSize, height: qrboxSize },
            aspectRatio: 1,
          },
          (decodedText) => {
            if (!cancelled) processScanRef.current(decodedText)
          },
          () => {}
        )

        if (cancelled) {
          await stopScannerSafely(scanner)
          scanner = null
          return
        }

        setScanning(true)
        setCameraError(null)
      } catch {
        await stopScannerSafely(scanner)
        scanner = null
        if (!cancelled) {
          setScanning(false)
          setCameraError(
            'Camera unavailable. Allow camera access, or enter the Registration ID below.'
          )
        }
      }
    })

    cameraSession = session.catch(() => {})

    return () => {
      cancelled = true
      cameraSession = session
        .then(() => stopScannerSafely(scanner))
        .then(() => {
          scanner = null
        })
        .catch(() => {})
    }
  }, [])

  return (
    <div className="space-y-6 text-navy-dark">
      <ScanFeedbackPopup popup={popup} onDismiss={dismissPopup} />

      <p className="text-sm text-gray-600 bg-white border border-gray-200 rounded-lg p-4">
        Open this page on your phone, select an action below, then point the camera at a
        participant&apos;s badge QR code.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ACTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setAction(value)}
            className={`px-3 py-3 rounded-xl text-sm font-bold transition-colors min-h-[52px] ${
              action === value
                ? 'bg-navy text-white shadow-md'
                : 'bg-white border border-gray-200 text-navy-dark hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-navy/20 overflow-hidden bg-black">
        <div id={SCANNER_REGION_ID} className="w-full min-h-[220px]" />
        {!scanning && !cameraError && (
          <p className="p-4 text-center text-white/80 text-sm bg-black">Starting camera...</p>
        )}
        {cameraError && (
          <p className="p-4 text-center text-amber-200 text-sm bg-black">{cameraError}</p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (manualId.trim()) processScan(manualId.trim())
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          placeholder="Enter Registration ID manually"
          className={`${adminInputClass} font-mono text-sm flex-1`}
        />
        <button
          type="submit"
          disabled={!manualId.trim()}
          className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-lg disabled:opacity-60 min-h-[48px]"
        >
          Submit
        </button>
      </form>

      {lastRegistration && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Last scan</p>
          <p className="font-bold text-navy-dark text-lg">{lastRegistration.name}</p>
          <p className="text-sm text-gray-600">
            {lastRegistration.state} · {lastRegistration.affiliation}
          </p>
          <p className="text-xs font-mono mt-2 text-gray-700">{lastRegistration.registrationId}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <StatusPill label="Checked in" active={lastRegistration.checkedIn} />
            <StatusPill label="Breakfast" active={!!lastRegistration.breakfastAt} />
            <StatusPill label="Lunch" active={!!lastRegistration.lunchAt} />
            <StatusPill label="Dinner" active={!!lastRegistration.dinnerAt} />
          </div>
        </div>
      )}
    </div>
  )
}

function StatusPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded-full font-semibold ${
        active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {label}: {active ? 'Yes' : 'No'}
    </span>
  )
}
