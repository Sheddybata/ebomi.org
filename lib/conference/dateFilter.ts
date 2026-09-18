import type { ConferenceRegistrationRecord } from './types'

/** Local calendar date (YYYY-MM-DD) from a registration timestamp */
export function registrationDateKey(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatRegistrationDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function uniqueRegistrationDates(registrations: ConferenceRegistrationRecord[]): string[] {
  const dates = new Set<string>()
  for (const registration of registrations) {
    const key = registrationDateKey(registration.createdAt)
    if (key) dates.add(key)
  }
  return Array.from(dates).sort((a, b) => b.localeCompare(a))
}

export function filterByRegistrationDate(
  registrations: ConferenceRegistrationRecord[],
  fromDate: string,
  toDate: string
): ConferenceRegistrationRecord[] {
  if (!fromDate && !toDate) return registrations
  return registrations.filter((registration) => {
    const key = registrationDateKey(registration.createdAt)
    if (!key) return false
    if (fromDate && key < fromDate) return false
    if (toDate && key > toDate) return false
    return true
  })
}
