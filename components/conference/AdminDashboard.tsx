'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { adminSelectClass } from '@/lib/conference/formStyles'
import { filterByRegistrationDate, formatRegistrationDate } from '@/lib/conference/dateFilter'
import RegistrationDateFilter from '@/components/conference/RegistrationDateFilter'
import MealGrid from '@/components/conference/MealGrid'
import { formatCongressDay } from '@/lib/conference/mealDates'
import type { ConferenceRegistrationRecord, ConferenceStats } from '@/lib/conference/types'

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<ConferenceRegistrationRecord[]>([])
  const [stats, setStats] = useState<ConferenceStats | null>(null)
  const [stateFilter, setStateFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
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
      setStats(data.stats)
    } catch {
      setError('Network error while loading registrations.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filtered = useMemo(() => {
    const byDate = filterByRegistrationDate(registrations, fromDate, toDate)
    if (stateFilter === 'all') return byDate
    return byDate.filter((r) => r.state.toLowerCase() === stateFilter.toLowerCase())
  }, [registrations, stateFilter, fromDate, toDate])

  if (loading) {
    return <p className="text-gray-600">Loading registrations...</p>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
    )
  }

  return (
    <div className="space-y-8">
      {stats && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Registered" value={stats.total} />
            <StatCard label="Checked In" value={stats.checkedIn} />
            <StatCard label="Need Feeding" value={stats.needsFeeding} />
            <StatCard label="Need Accommodation" value={stats.needsAccommodation} />
          </div>
          <div>
            <h3 className="font-bold text-navy-dark mb-3">
              Meals today · {formatCongressDay(stats.mealsToday.date)}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Lunch" value={stats.mealsToday.lunch} />
              <StatCard label="Dinner" value={stats.mealsToday.dinner} />
            </div>
          </div>
        </>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Registrations by State">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats?.byState.map(({ state, count }) => (
              <button
                key={state}
                type="button"
                onClick={() => setStateFilter(state)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                <span className="font-medium text-navy-dark">{state}</span>
                <span className="text-gray-600">{count}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Registrations by Affiliation">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats?.byAffiliation.map(({ affiliation, count }) => (
              <div key={affiliation} className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="font-medium text-navy-dark">{affiliation}</span>
                <span className="text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {stats && (
        <Panel title="Meals by day">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="py-2 pr-4">Day</th>
                  <th className="py-2 pr-4">Lunch</th>
                  <th className="py-2">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {stats.mealsByDay.map((day) => (
                  <tr key={day.date} className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-navy-dark">
                      {formatCongressDay(day.date)}
                    </td>
                    <td className="py-2 pr-4 text-navy-dark">{day.lunch}</td>
                    <td className="py-2 text-navy-dark">{day.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      <Panel
        title="All Registrants"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <RegistrationDateFilter
              registrations={registrations}
              fromDate={fromDate}
              toDate={toDate}
              onFromChange={setFromDate}
              onToChange={setToDate}
            />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className={adminSelectClass}
            >
              <option value="all">All states</option>
              {stats?.byState.map(({ state }) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={loadData}
              className="text-sm px-3 py-2 rounded-lg bg-navy text-white font-semibold"
            >
              Refresh
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Registered</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">State</th>
                <th className="py-2 pr-4">Church</th>
                <th className="py-2 pr-4">Affiliation</th>
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Check-in</th>
                <th className="py-2">Meals</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={reg.registrationId} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-navy-dark">{reg.name}</td>
                  <td className="py-3 pr-4 text-navy-dark whitespace-nowrap">
                    {formatRegistrationDate(reg.createdAt)}
                  </td>
                  <td className="py-3 pr-4 text-navy-dark whitespace-nowrap">{reg.phone}</td>
                  <td className="py-3 pr-4 text-navy-dark">{reg.state}</td>
                  <td className="py-3 pr-4 text-navy-dark">{reg.churchDenomination}</td>
                  <td className="py-3 pr-4 text-navy-dark">{reg.affiliation}</td>
                  <td className="py-3 pr-4 font-mono text-xs text-navy-dark">{reg.registrationId}</td>
                  <td className="py-3 pr-4">
                    {reg.checkedIn ? (
                      <span className="text-green-700 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="py-3">
                    <MealGrid meals={reg.meals} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-8">No registrations found.</p>
          )}
        </div>
      </Panel>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-navy-dark mt-1">{value}</p>
    </div>
  )
}

function Panel({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-bold text-navy-dark">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
