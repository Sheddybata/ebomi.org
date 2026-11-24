'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, Printer } from 'lucide-react'
import ConferenceTag from '@/components/conference/ConferenceTag'
import { displayState } from '@/lib/conference/normalizeState'
import type { ConferenceRegistrationRecord } from '@/lib/conference/types'

async function waitForTagImages() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('.conference-tag img'))
  await Promise.all(
    images.map((image) =>
      image.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            image.onload = () => resolve()
            image.onerror = () => resolve()
          }),
    ),
  )
}

export default function SingleTagPrint({ registrationId }: { registrationId: string }) {
  const [registration, setRegistration] = useState<ConferenceRegistrationRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [printing, setPrinting] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/registrations')
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to load registration.')
        return
      }
      const found = (data.registrations as ConferenceRegistrationRecord[]).find(
        (reg) => reg.registrationId === registrationId,
      )
      if (!found) {
        setError('Registration not found.')
        return
      }
      setRegistration(found)
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }, [registrationId])

  useEffect(() => {
    load()
  }, [load])

  const markPrinted = async () => {
    const response = await fetch('/api/admin/registrations/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationId }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setNotice(data.error || 'Could not mark as printed.')
      return
    }
    setRegistration((prev) =>
      prev ? { ...prev, tagPrintedAt: data.printedAt || new Date().toISOString() } : prev,
    )
    setNotice('Marked as printed.')
  }

  const handlePrint = async () => {
    if (!registration) return
    setPrinting(true)
    setNotice(null)
    try {
      await waitForTagImages()
      window.print()
      await markPrinted()
    } finally {
      setPrinting(false)
    }
  }

  if (loading) return <p className="text-gray-600">Loading ID card...</p>
  if (error || !registration) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error || 'Not found.'}
        </div>
        <Link href="/admin/conference" className="text-navy font-semibold hover:underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 print:hidden">
        <div>
          <Link
            href="/admin/conference"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-navy mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-navy-dark">{registration.name}</h2>
          <p className="text-gray-600 mt-1">
            {[registration.affiliation, displayState(registration.state), registration.registrationId]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <p className="text-sm mt-2">
            Printed:{' '}
            {registration.tagPrintedAt ? (
              <span className="text-green-700 font-semibold">Yes</span>
            ) : (
              <span className="text-gray-500">Not yet</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handlePrint}
            disabled={printing}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-navy text-white font-bold disabled:opacity-60"
          >
            <Printer className="w-4 h-4" />
            {printing ? 'Preparing...' : 'Print / Download this card'}
          </button>
          {!registration.tagPrintedAt ? (
            <button
              type="button"
              onClick={markPrinted}
              className="px-4 py-3 rounded-lg border border-gray-300 text-navy-dark font-semibold bg-white"
            >
              Mark printed only
            </button>
          ) : null}
        </div>
      </div>

      {notice ? (
        <p className="text-sm text-navy print:hidden rounded-lg border border-gray-200 bg-white px-4 py-3">
          {notice}
        </p>
      ) : null}

      <div className="flex justify-center print:block">
        <ConferenceTag registration={registration} />
      </div>
    </div>
  )
}
