import type { ConferenceRegistrationRecord, MealScanRecord, MealType } from './types'

export interface SupabaseRegistrationRow {
  registration_id: string
  conference_slug: string
  name: string
  phone: string
  email: string | null
  state: string
  residential_address?: string | null
  church_denomination?: string | null
  affiliation: string
  occupation: string
  needs_accommodation: boolean
  needs_feeding: boolean
  heard_about: string
  checked_in: boolean
  checked_in_at?: string | null
  breakfast_at?: string | null
  lunch_at?: string | null
  dinner_at?: string | null
  created_at: string
}

export interface SupabaseMealScanRow {
  registration_id: string
  meal_type: MealType
  meal_date: string
  scanned_at: string
}

export function mapMealScanRow(row: SupabaseMealScanRow): MealScanRecord {
  return {
    mealType: row.meal_type,
    mealDate: row.meal_date.slice(0, 10),
    scannedAt: row.scanned_at,
  }
}

export function mapSupabaseRow(
  row: SupabaseRegistrationRow,
  meals: MealScanRecord[] = []
): ConferenceRegistrationRecord {
  return {
    registrationId: row.registration_id,
    conferenceSlug: row.conference_slug,
    name: row.name,
    phone: row.phone,
    email: row.email ?? '',
    state: row.state,
    residentialAddress: row.residential_address ?? '',
    churchDenomination: row.church_denomination ?? '',
    affiliation: row.affiliation as ConferenceRegistrationRecord['affiliation'],
    occupation: row.occupation as ConferenceRegistrationRecord['occupation'],
    needsAccommodation: row.needs_accommodation,
    needsFeeding: row.needs_feeding,
    heardAbout: row.heard_about as ConferenceRegistrationRecord['heardAbout'],
    checkedIn: row.checked_in,
    checkedInAt: row.checked_in_at ?? null,
    meals,
    createdAt: row.created_at,
  }
}
