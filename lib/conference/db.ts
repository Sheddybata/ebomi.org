import type { ConferenceRegistrationInput, ConferenceRegistrationRecord, ScanAction } from './types'
import { generateRegistrationId } from './registrationId'
import {
  applyLocalScan,
  getLocalRegistrationById,
  listLocalRegistrations,
  saveLocalConferenceRegistration,
} from './localStore'
import { mapSupabaseRow, type SupabaseRegistrationRow } from './mapRecord'

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) return null
  return { url: url.replace(/\/$/, ''), serviceRoleKey }
}

function useLocalStore() {
  const config = getSupabaseConfig()
  return !config && process.env.NODE_ENV === 'development'
}

function supabaseHeaders(config: { serviceRoleKey: string }, prefer?: string) {
  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  }
}

export function isConferenceDatabaseConfigured(): boolean {
  return getSupabaseConfig() !== null
}

export async function saveConferenceRegistration(
  input: ConferenceRegistrationInput
): Promise<{ registrationId: string }> {
  if (useLocalStore()) {
    return saveLocalConferenceRegistration(input)
  }

  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('DATABASE_NOT_CONFIGURED')
  }

  const registrationId = generateRegistrationId()

  const response = await fetch(`${config.url}/rest/v1/conference_registrations`, {
    method: 'POST',
    headers: supabaseHeaders(config, 'return=representation'),
    body: JSON.stringify({
      registration_id: registrationId,
      conference_slug: input.conferenceSlug,
      name: input.name,
      phone: input.phone,
      email: input.email,
      state: input.state,
      affiliation: input.affiliation,
      occupation: input.occupation,
      needs_accommodation: input.needsAccommodation,
      needs_feeding: input.needsFeeding,
      needs_ride_home: input.needsRideHome,
      heard_about: input.heardAbout,
      checked_in: false,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    if (response.status === 409 || errorText.includes('duplicate')) {
      throw new Error('DUPLICATE_REGISTRATION')
    }
    throw new Error(`Database error: ${response.status}`)
  }

  return { registrationId }
}

export async function listConferenceRegistrations(
  conferenceSlug: string
): Promise<ConferenceRegistrationRecord[]> {
  if (useLocalStore()) {
    return listLocalRegistrations(conferenceSlug)
  }

  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('DATABASE_NOT_CONFIGURED')
  }

  const pageSize = 1000
  const rows: SupabaseRegistrationRow[] = []

  for (let from = 0; ; from += pageSize) {
    const params = new URLSearchParams({
      conference_slug: `eq.${conferenceSlug}`,
      select: '*',
      order: 'created_at.desc',
    })

    const response = await fetch(`${config.url}/rest/v1/conference_registrations?${params}`, {
      headers: {
        ...supabaseHeaders(config),
        Range: `${from}-${from + pageSize - 1}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Database error: ${response.status}`)
    }

    const batch = (await response.json()) as SupabaseRegistrationRow[]
    rows.push(...batch)
    if (batch.length < pageSize) break
  }

  return rows.map(mapSupabaseRow)
}

export async function getConferenceRegistrationById(
  registrationId: string
): Promise<ConferenceRegistrationRecord | null> {
  if (useLocalStore()) {
    return getLocalRegistrationById(registrationId)
  }

  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('DATABASE_NOT_CONFIGURED')
  }

  const params = new URLSearchParams({
    registration_id: `eq.${registrationId}`,
    select: '*',
  })

  const response = await fetch(`${config.url}/rest/v1/conference_registrations?${params}`, {
    headers: supabaseHeaders(config),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Database error: ${response.status}`)
  }

  const rows = (await response.json()) as SupabaseRegistrationRow[]
  return rows[0] ? mapSupabaseRow(rows[0]) : null
}

export async function applyConferenceScan(
  registrationId: string,
  action: ScanAction
): Promise<ConferenceRegistrationRecord> {
  if (useLocalStore()) {
    return applyLocalScan(registrationId, action)
  }

  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('DATABASE_NOT_CONFIGURED')
  }

  const existing = await getConferenceRegistrationById(registrationId)
  if (!existing) {
    throw new Error('NOT_FOUND')
  }

  const now = new Date().toISOString()
  const update: Record<string, string | boolean> = {}

  if (action === 'check_in') {
    if (existing.checkedIn) throw new Error('ALREADY_CHECKED_IN')
    update.checked_in = true
    update.checked_in_at = now
  } else if (action === 'breakfast') {
    if (existing.breakfastAt) throw new Error('MEAL_ALREADY_RECORDED')
    update.breakfast_at = now
  } else if (action === 'lunch') {
    if (existing.lunchAt) throw new Error('MEAL_ALREADY_RECORDED')
    update.lunch_at = now
  } else if (action === 'dinner') {
    if (existing.dinnerAt) throw new Error('MEAL_ALREADY_RECORDED')
    update.dinner_at = now
  }

  const params = new URLSearchParams({
    registration_id: `eq.${registrationId}`,
  })

  const response = await fetch(`${config.url}/rest/v1/conference_registrations?${params}`, {
    method: 'PATCH',
    headers: supabaseHeaders(config, 'return=representation'),
    body: JSON.stringify(update),
  })

  if (!response.ok) {
    throw new Error(`Database error: ${response.status}`)
  }

  const rows = (await response.json()) as SupabaseRegistrationRow[]
  return mapSupabaseRow(rows[0])
}
