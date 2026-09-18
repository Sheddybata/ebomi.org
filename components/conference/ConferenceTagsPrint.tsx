'use client'

import { useEffect, useMemo, useState } from 'react'
import ConferenceTag from '@/components/conference/ConferenceTag'
import RegistrationDateFilter from '@/components/conference/RegistrationDateFilter'
import { filterByRegistrationDate } from '@/lib/conference/dateFilter'
import type { ConferenceRegistrationRecord } from '@/lib/conference/types'

const TAGS_PER_PAGE = 4

function chunkRegistrations(
  registrations: ConferenceRegistrationRecord[],
  size: number
): ConferenceRegistrationRecord[][] {
  const pages: ConferenceRegistrationRecord[][] = []
  for (let i = 0; i < registrations.length; i += size) {
    pages.push(registrations.slice(i, i + size))
  }
  return pages
}

async function waitForTagImages() {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('.conference-tag img'))
  await Promise.all(
    images.map(
      (image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.onload = () => resolve()
              image.onerror = () => resolve()
            })
    )
  )
}

export default function ConferenceTagsPrint() {
  const [registrations, setRegistrations] = useState<ConferenceRegistrationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [printing, setPrinting] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/admin/registrations')
        const data = await response.json()
        if (!response.ok) {
          setError(data.error || 'Failed to load registrations.')
          return
        }
        setRegistrations(data.registrations)
      } catch {
        setError('Network error.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handlePrint = async () => {
    setPrinting(true)
    try {
      await waitForTagImages()
      window.print()
    } finally {
      setPrinting(false)
    }
  }

  const filtered = useMemo(
    () => filterByRegistrationDate(registrations, fromDate, toDate),
    [registrations, fromDate, toDate]
  )
  const pages = chunkRegistrations(filtered, TAGS_PER_PAGE)

  if (loading) return <p className="text-gray-700">Loading tags...</p>
  if (error) return <div className="text-red-700">{error}</div>

  return (
    <div className="space-y-6 text-navy-dark">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <h2 className="text-2xl font-bold text-navy-dark">Print Conference Tags</h2>
        <div className="flex flex-wrap items-center gap-3">
          <RegistrationDateFilter
            registrations={registrations}
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
          />
          <button
            type="button"
            onClick={handlePrint}
            disabled={filtered.length === 0 || printing}
            className="px-6 py-3 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors min-h-[48px] disabled:opacity-60"
          >
            {printing ? 'Preparing...' : 'Print Tags'}
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 print:hidden">
          {registrations.length === 0
            ? 'No registrations yet.'
            : 'No tags match the selected dates.'}
        </p>
      ) : (
        <div className="space-y-6 print:space-y-0">
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="print-tags-page grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
              {page.map((registration) => (
                <ConferenceTag key={registration.registrationId} registration={registration} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
