'use client'

import { useEffect, useMemo, useState } from 'react'
import { Printer, Search } from 'lucide-react'
import ConferenceTag from '@/components/conference/ConferenceTag'
import RegistrationDateFilter from '@/components/conference/RegistrationDateFilter'
import { filterByRegistrationDate } from '@/lib/conference/dateFilter'
import { adminInputClass, adminSelectClass } from '@/lib/conference/formStyles'
import { displayState } from '@/lib/conference/normalizeState'
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

type PrintedFilter = 'all' | 'printed' | 'not_printed'

export default function ConferenceTagsPrint() {
  const [registrations, setRegistrations] = useState<ConferenceRegistrationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [printing, setPrinting] = useState(false)
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [printedFilter, setPrintedFilter] = useState<PrintedFilter>('not_printed')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

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

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return filterByRegistrationDate(registrations, fromDate, toDate)
      .filter((reg) => {
        if (printedFilter === 'printed' && !reg.tagPrintedAt) return false
        if (printedFilter === 'not_printed' && reg.tagPrintedAt) return false
        if (!query) return true
        const state = displayState(reg.state)
        return (
          reg.name.toLowerCase().includes(query) ||
          reg.registrationId.toLowerCase().includes(query) ||
          state.toLowerCase().includes(query) ||
          reg.affiliation.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
  }, [registrations, fromDate, toDate, printedFilter, search])

  const selectedRegistrations = useMemo(() => {
    return registrations
      .filter((reg) => selectedIds.has(reg.registrationId))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
  }, [registrations, selectedIds])

  const pages = chunkRegistrations(selectedRegistrations, TAGS_PER_PAGE)
  const allVisibleSelected =
    filtered.length > 0 && filtered.every((reg) => selectedIds.has(reg.registrationId))

  const toggleOne = (registrationId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(registrationId)) next.delete(registrationId)
      else next.add(registrationId)
      return next
    })
  }

  const toggleVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) {
        for (const reg of filtered) next.delete(reg.registrationId)
      } else {
        for (const reg of filtered) next.add(reg.registrationId)
      }
      return next
    })
  }

  const clearSelection = () => setSelectedIds(new Set())

  const markPrinted = async (ids: string[]) => {
    const response = await fetch('/api/admin/registrations/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registrationIds: ids }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setNotice(data.error || 'Could not mark tags as printed.')
      return
    }
    const printedAt = data.printedAt || new Date().toISOString()
    const idSet = new Set(ids)
    setRegistrations((prev) =>
      prev.map((reg) => (idSet.has(reg.registrationId) ? { ...reg, tagPrintedAt: printedAt } : reg)),
    )
    setNotice(`Marked ${data.updated ?? ids.length} tag(s) as printed.`)
    setSelectedIds(new Set())
  }

  const handlePrint = async () => {
    if (selectedRegistrations.length === 0) return
    setPrinting(true)
    setNotice(null)
    try {
      await waitForTagImages()
      window.print()
      await markPrinted(selectedRegistrations.map((reg) => reg.registrationId))
    } finally {
      setPrinting(false)
    }
  }

  if (loading) return <p className="text-gray-700">Loading tags...</p>
  if (error) return <div className="text-red-700">{error}</div>

  return (
    <div className="space-y-6 text-navy-dark">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-navy-dark">Print Conference Tags</h2>
          <p className="text-sm text-gray-600 mt-1">
            Search, select the people you want, then print. Up to 4 cards per A4 page.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedIds.size === 0}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-semibold disabled:opacity-50"
          >
            Clear selection
          </button>
          <button
            type="button"
            onClick={handlePrint}
            disabled={selectedIds.size === 0 || printing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-bold rounded-lg hover:bg-navy-light transition-colors min-h-[44px] disabled:opacity-60"
          >
            <Printer className="w-4 h-4" />
            {printing ? 'Preparing...' : `Print selected (${selectedIds.size})`}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-3 print:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, ID, state, or affiliation..."
            className={`${adminInputClass} pl-10 !min-h-[44px] !py-2 text-sm`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RegistrationDateFilter
            registrations={registrations}
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
          />
          <select
            value={printedFilter}
            onChange={(e) => setPrintedFilter(e.target.value as PrintedFilter)}
            className={adminSelectClass}
          >
            <option value="not_printed">Not printed</option>
            <option value="printed">Printed</option>
            <option value="all">All</option>
          </select>
          <button
            type="button"
            onClick={toggleVisible}
            disabled={filtered.length === 0}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold disabled:opacity-50"
          >
            {allVisibleSelected ? 'Unselect visible' : 'Select visible'}
          </button>
          <span className="text-sm text-gray-500">
            {filtered.length} shown · {selectedIds.size} selected
          </span>
        </div>
      </div>

      {notice ? (
        <p className="text-sm rounded-lg border border-gray-200 bg-white px-4 py-3 print:hidden">
          {notice}
        </p>
      ) : null}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden print:hidden">
        <div className="overflow-x-auto max-h-[28rem]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-3 px-3 w-12">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleVisible}
                    disabled={filtered.length === 0}
                    aria-label="Select all visible"
                    className="h-4 w-4 accent-navy"
                  />
                </th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">State</th>
                <th className="py-3 pr-4">Affiliation</th>
                <th className="py-3 pr-4">Class</th>
                <th className="py-3 pr-4">ID</th>
                <th className="py-3 pr-3">Printed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => {
                const checked = selectedIds.has(reg.registrationId)
                return (
                  <tr
                    key={reg.registrationId}
                    className={`border-b border-gray-100 cursor-pointer ${
                      checked ? 'bg-red-50/60' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleOne(reg.registrationId)}
                  >
                    <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(reg.registrationId)}
                        aria-label={`Select ${reg.name}`}
                        className="h-4 w-4 accent-navy"
                      />
                    </td>
                    <td className="py-2.5 pr-4 font-medium text-navy-dark">{reg.name}</td>
                    <td className="py-2.5 pr-4 text-navy-dark">{displayState(reg.state)}</td>
                    <td className="py-2.5 pr-4 text-navy-dark">{reg.affiliation}</td>
                    <td className="py-2.5 pr-4 text-navy-dark whitespace-nowrap">
                      {reg.ministryClass ? `Class ${reg.ministryClass}` : '—'}
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-navy-dark">
                      {reg.registrationId}
                    </td>
                    <td className="py-2.5 pr-3">
                      {reg.tagPrintedAt ? (
                        <span className="text-green-700 font-semibold">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-8">No people match your search.</p>
          )}
        </div>
      </div>

      {selectedRegistrations.length === 0 ? (
        <p className="text-gray-500 print:hidden text-sm">
          Select one or more people above. Search, tick, search again, tick more — then print.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 print:hidden">
            Print preview · {selectedRegistrations.length} card
            {selectedRegistrations.length === 1 ? '' : 's'} ·{' '}
            {pages.length} A4 page{pages.length === 1 ? '' : 's'}
          </p>
          <div className="space-y-6 print:space-y-0">
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="print-tags-page grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center"
              >
                {page.map((registration) => (
                  <ConferenceTag key={registration.registrationId} registration={registration} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
