import type {
  ConferenceRegistrationInput,
  ConferenceRegistrationRecord,
  MealScanRecord,
  MealType,
  ScanAction,
} from './types'
import { generateRegistrationId } from './registrationId'
import {
  applyLocalScan,
  getLocalRegistrationById,
  listLocalRegistrations,
  saveLocalConferenceRegistration,
} from './localStore'
import {
  mapMealScanRow,
  mapSupabaseRow,
  type SupabaseMealScanRow,
  type SupabaseRegistrationRow,
} from './mapRecord'
import { todayInLagos } from './mealDates'

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

async function registrationAlreadyExists(
  config: { url: string; serviceRoleKey: string },
  input: ConferenceRegistrationInput
): Promise<boolean> {
  const quotedPhone = `"${input.phone.replace(/"/g, '')}"`
  const phoneParams = new URLSearchParams({
    conference_slug: `eq.${input.conferenceSlug}`,
    phone: `eq.${quotedPhone}`,
    select: 'registration_id',
    limit: '1',
  })
  const phoneResponse = await fetch(
    `${config.url}/rest/v1/conference_registrations?${phoneParams}`,
    { headers: supabaseHeaders(config), cache: 'no-store' }
  )
  if (phoneResponse.ok) {
    const rows = (await phoneResponse.json()) as { registration_id: string }[]
    if (rows.length > 0) return true
  }

  if (!input.email) return false

  const emailParams = new URLSearchParams({
    conference_slug: `eq.${input.conferenceSlug}`,
    email: `eq.${input.email}`,
    select: 'registration_id',
    limit: '1',
  })
  const emailResponse = await fetch(
    `${config.url}/rest/v1/conference_registrations?${emailParams}`,
    { headers: supabaseHeaders(config), cache: 'no-store' }
  )
  if (!emailResponse.ok) return false
  const emailRows = (await emailResponse.json()) as { registration_id: string }[]
  return emailRows.length > 0
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

  if (await registrationAlreadyExists(config, input)) {
    throw new Error('DUPLICATE_REGISTRATION')
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
      residential_address: input.residentialAddress,
      church_denomination: input.churchDenomination,
      affiliation: input.affiliation,
      occupation: input.occupation,
      needs_accommodation: input.needsAccommodation,
      needs_feeding: input.needsFeeding,
      needs_ride_home: false,
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

  const mealsById = await listMealScans(rows.map((row) => row.registration_id))
  return attachMeals(rows, mealsById)
}

async function listMealScans(registrationIds: string[]): Promise<Map<string, MealScanRecord[]>> {
  const grouped = new Map<string, MealScanRecord[]>()
  if (registrationIds.length === 0) return grouped

  const config = getSupabaseConfig()
  if (!config) return grouped

  const pageSize = 200
  for (let i = 0; i < registrationIds.length; i += pageSize) {
    const batch = registrationIds.slice(i, i + pageSize)
    const quoted = batch.map((id) => `"${id.replace(/"/g, '')}"`).join(',')
    const params = new URLSearchParams({
      registration_id: `in.(${quoted})`,
      select: 'registration_id,meal_type,meal_date,scanned_at',
    })

    const response = await fetch(`${config.url}/rest/v1/conference_meal_scans?${params}`, {
      headers: supabaseHeaders(config),
      cache: 'no-store',
    })

    if (!response.ok) {
      return grouped
    }

    const rows = (await response.json()) as SupabaseMealScanRow[]
    for (const row of rows) {
      const current = grouped.get(row.registration_id) ?? []
      current.push(mapMealScanRow(row))
      grouped.set(row.registration_id, current)
    }
  }

  return grouped
}

function attachMeals(
  rows: SupabaseRegistrationRow[],
  mealsById: Map<string, MealScanRecord[]>
): ConferenceRegistrationRecord[] {
  return rows.map((row) => mapSupabaseRow(row, mealsById.get(row.registration_id) ?? []))
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
  if (!rows[0]) return null
  const mealsById = await listMealScans([registrationId])
  return mapSupabaseRow(rows[0], mealsById.get(registrationId) ?? [])
}

export async function applyConferenceScan(
  registrationId: string,
  action: ScanAction,
  mealDate = todayInLagos()
): Promise<ConferenceRegistrationRecord> {
  if (useLocalStore()) {
    return applyLocalScan(registrationId, action, mealDate)
  }

  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('DATABASE_NOT_CONFIGURED')
  }

  const existing = await getConferenceRegistrationById(registrationId)
  if (!existing) {
    throw new Error('NOT_FOUND')
  }

  if (action === 'check_in') {
    if (existing.checkedIn) throw new Error('ALREADY_CHECKED_IN')

    const params = new URLSearchParams({
      registration_id: `eq.${registrationId}`,
    })
    const response = await fetch(`${config.url}/rest/v1/conference_registrations?${params}`, {
      method: 'PATCH',
      headers: supabaseHeaders(config, 'return=representation'),
      body: JSON.stringify({
        checked_in: true,
        checked_in_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`Database error: ${response.status}`)
    }
  } else {
    const mealType = action as MealType
    const response = await fetch(`${config.url}/rest/v1/conference_meal_scans`, {
      method: 'POST',
      headers: supabaseHeaders(config, 'return=representation'),
      body: JSON.stringify({
        registration_id: registrationId,
        meal_type: mealType,
        meal_date: mealDate,
      }),
    })

    if (response.status === 409) {
      throw new Error('MEAL_ALREADY_RECORDED')
    }
    if (!response.ok) {
      const errorText = await response.text()
      if (errorText.toLowerCase().includes('duplicate') || errorText.includes('23505')) {
        throw new Error('MEAL_ALREADY_RECORDED')
      }
      throw new Error(`Database error: ${response.status}`)
    }
  }

  const updated = await getConferenceRegistrationById(registrationId)
  if (!updated) throw new Error('NOT_FOUND')
  return updated
}
