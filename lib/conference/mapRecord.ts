import type { ConferenceRegistrationRecord } from './types'

export interface SupabaseRegistrationRow {
  registration_id: string
  conference_slug: string
  name: string
  phone: string
  email: string
  state: string
  affiliation: string
  occupation: string
  needs_accommodation: boolean
  needs_feeding: boolean
  needs_ride_home: boolean
  heard_about: string
  checked_in: boolean
  checked_in_at?: string | null
  breakfast_at: string | null
  lunch_at: string | null
  dinner_at: string | null
  created_at: string
}

export function mapSupabaseRow(row: SupabaseRegistrationRow): ConferenceRegistrationRecord {
  return {
    registrationId: row.registration_id,
    conferenceSlug: row.conference_slug,
    name: row.name,
    phone: row.phone,
    email: row.email,
    state: row.state,
    affiliation: row.affiliation as ConferenceRegistrationRecord['affiliation'],
    occupation: row.occupation as ConferenceRegistrationRecord['occupation'],
    needsAccommodation: row.needs_accommodation,
    needsFeeding: row.needs_feeding,
    needsRideHome: row.needs_ride_home,
    heardAbout: row.heard_about as ConferenceRegistrationRecord['heardAbout'],
    checkedIn: row.checked_in,
    checkedInAt: row.checked_in_at ?? null,
    breakfastAt: row.breakfast_at,
    lunchAt: row.lunch_at,
    dinnerAt: row.dinner_at,
    createdAt: row.created_at,
  }
}
