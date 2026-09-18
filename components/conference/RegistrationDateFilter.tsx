'use client'

import { adminSelectClass } from '@/lib/conference/formStyles'
import { uniqueRegistrationDates } from '@/lib/conference/dateFilter'
import type { ConferenceRegistrationRecord } from '@/lib/conference/types'

const dateInputClass = `${adminSelectClass} min-w-[150px]`

export default function RegistrationDateFilter({
  registrations,
  fromDate,
  toDate,
  onFromChange,
  onToChange,
}: {
  registrations: ConferenceRegistrationRecord[]
  fromDate: string
  toDate: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
}) {
  const dates = uniqueRegistrationDates(registrations)
  const selectedDay = fromDate && fromDate === toDate ? fromDate : ''

  return (
    <div className="flex flex-wrap items-center gap-2 print:hidden">
      <label className="text-sm font-semibold text-navy-dark">From</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => onFromChange(e.target.value)}
        className={dateInputClass}
      />
      <label className="text-sm font-semibold text-navy-dark">To</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => onToChange(e.target.value)}
        className={dateInputClass}
      />
      {dates.length > 0 && (
        <select
          value={selectedDay}
          onChange={(e) => {
            const value = e.target.value
            if (!value) {
              onFromChange('')
              onToChange('')
              return
            }
            onFromChange(value)
            onToChange(value)
          }}
          className={adminSelectClass}
        >
          <option value="">All dates</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </option>
          ))}
        </select>
      )}
      {(fromDate || toDate) && (
        <button
          type="button"
          onClick={() => {
            onFromChange('')
            onToChange('')
          }}
          className="text-sm px-3 py-2 rounded-lg border border-gray-300 bg-white text-navy-dark font-semibold min-h-[44px]"
        >
          Clear
        </button>
      )}
    </div>
  )
}
