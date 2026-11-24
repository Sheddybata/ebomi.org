'use client'

import Link from 'next/link'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Printer } from 'lucide-react'
import { adminInputClass, adminSelectClass } from '@/lib/conference/formStyles'
import { MINISTRY_CLASSES } from '@/lib/conference/ministryClasses'
import { displayState } from '@/lib/conference/normalizeState'
import type { ConferenceRegistrationRecord } from '@/lib/conference/types'

type ArrivalFilter = 'all' | 'arrived' | 'not_arrived'

export default function ArrivalSheet() {
  const [registrations, setRegistrations] = useState<ConferenceRegistrationRecord[]>([])
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [arrivalFilter, setArrivalFilter] = useState<ArrivalFilter>('all')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/registrations')
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to load data.')
        return
      }
      setRegistrations(data.registrations)
    } catch {
      setError('Network error while loading registrations.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase()
    return [...registrations]
      .filter((reg) => {
        const state = displayState(reg.state)
        if (classFilter !== 'all' && String(reg.ministryClass) !== classFilter) return false
        if (arrivalFilter === 'arrived' && !reg.checkedIn) return false
        if (arrivalFilter === 'not_arrived' && reg.checkedIn) return false
        if (!query) return true
        return (
          reg.name.toLowerCase().includes(query) ||
          reg.registrationId.toLowerCase().includes(query) ||
          state.toLowerCase().includes(query) ||
          reg.affiliation.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        const byState = displayState(a.state).localeCompare(displayState(b.state), undefined, {
          sensitivity: 'base',
        })
        if (byState !== 0) return byState
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      })
  }, [registrations, search, classFilter, arrivalFilter])

  const arrivedCount = registrations.filter((reg) => reg.checkedIn).length

  const markArrived = async (registrationId: string) => {
    const current = registrations.find((reg) => reg.registrationId === registrationId)
    if (!current || current.checkedIn) return

    setSavingId(registrationId)
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.registrationId === registrationId
          ? { ...reg, checkedIn: true, checkedInAt: new Date().toISOString() }
          : reg
      )
    )

    try {
      const response = await fetch('/api/conference/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId, action: 'check_in' }),
      })
      if (!response.ok && response.status !== 409) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.registrationId === registrationId ? { ...reg, checkedIn: false, checkedInAt: null } : reg
          )
        )
        const data = await response.json().catch(() => ({}))
        setError(data.error || 'Could not mark as arrived.')
      }
    } catch {
      setRegistrations((prev) =>
        prev.map((reg) =>
          reg.registrationId === registrationId ? { ...reg, checkedIn: false, checkedInAt: null } : reg
        )
      )
      setError('Network error while marking arrival.')
    } finally {
      setSavingId(null)
    }
  }

  if (loading) {
    return <p className="text-gray-600">Loading arrival sheet...</p>
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 print:hidden">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-end gap-3 print:hidden">
        <div className="flex-1">
          <label htmlFor="arrival-search" className="block text-xs font-semibold text-gray-500 mb-1">
            Search
          </label>
          <input
            id="arrival-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, ID, state, or affiliation"
            className={adminInputClass}
          />
        </div>
        <div>
          <label htmlFor="arrival-class" className="block text-xs font-semibold text-gray-500 mb-1">
            School of ministry
          </label>
          <select
            id="arrival-class"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className={adminSelectClass}
          >
            <option value="all">All classes</option>
            {MINISTRY_CLASSES.map((ministryClass) => (
              <option key={ministryClass} value={ministryClass}>
                Class {ministryClass}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="arrival-status" className="block text-xs font-semibold text-gray-500 mb-1">
            Arrival
          </label>
          <select
            id="arrival-status"
            value={arrivalFilter}
            onChange={(e) => setArrivalFilter(e.target.value as ArrivalFilter)}
            className={adminSelectClass}
          >
            <option value="all">All</option>
            <option value="not_arrived">Not arrived</option>
            <option value="arrived">Arrived</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-navy text-white font-semibold text-sm min-h-[44px]"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      <p className="text-sm text-gray-600 print:text-black">
        Showing {rows.length} of {registrations.length} · Arrived {arrivedCount}
      </p>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm print:shadow-none print:border-0 print:rounded-none">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 print:text-black">
              <th className="py-3 px-3 w-16">Arrived</th>
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Affiliation</th>
              <th className="py-3 pr-4">State</th>
              <th className="py-3 pr-4">ID number</th>
              <th className="py-3 pr-3">School of ministry</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((reg, index) => {
              const state = displayState(reg.state)
              const previous = rows[index - 1]
              const showStateHeading =
                index === 0 || displayState(previous.state).toLowerCase() !== state.toLowerCase()
              return (
                <Fragment key={reg.registrationId}>
                  {showStateHeading ? (
                    <tr className="bg-gray-50 print:bg-gray-100">
                      <td
                        colSpan={6}
                        className="py-2 px-3 font-bold text-navy-dark print:text-black"
                      >
                        {state}
                      </td>
                    </tr>
                  ) : null}
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={reg.checkedIn}
                        disabled={reg.checkedIn || savingId === reg.registrationId}
                        onChange={() => markArrived(reg.registrationId)}
                        aria-label={`Mark ${reg.name} as arrived`}
                        className="h-5 w-5 accent-navy"
                      />
                    </td>
                    <td className="py-2.5 pr-4 font-medium text-navy-dark print:text-black">
                      <Link
                        href={`/admin/conference/tags/${encodeURIComponent(reg.registrationId)}`}
                        className="hover:underline underline-offset-2 print:no-underline"
                      >
                        {reg.name}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-navy-dark print:text-black">{reg.affiliation}</td>
                    <td className="py-2.5 pr-4 text-navy-dark print:text-black">{state}</td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-navy-dark print:text-black">
                      {reg.registrationId}
                    </td>
                    <td className="py-2.5 pr-3 text-navy-dark whitespace-nowrap print:text-black">
                      {reg.ministryClass ? `Class ${reg.ministryClass}` : '—'}
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="text-center text-gray-500 py-8">No registrations found.</p>
        )}
      </div>
    </div>
  )
}
