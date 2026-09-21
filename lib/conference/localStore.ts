import { promises as fs } from 'fs'
import path from 'path'
import type {
  ConferenceRegistrationInput,
  ConferenceRegistrationRecord,
  MealScanRecord,
  MealType,
  ScanAction,
} from './types'
import { generateRegistrationId } from './registrationId'
import { todayInLagos } from './mealDates'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'conference-registrations.json')

interface StoredRegistration extends ConferenceRegistrationInput {
  registrationId: string
  checkedIn: boolean
  checkedInAt: string | null
  meals?: MealScanRecord[]
  breakfastAt?: string | null
  lunchAt?: string | null
  dinnerAt?: string | null
  createdAt: string
}

function mealsFromLegacy(stored: StoredRegistration): MealScanRecord[] {
  if (stored.meals?.length) return stored.meals
  const meals: MealScanRecord[] = []
  const firstDay = '2026-11-23'
  if (stored.lunchAt) {
    meals.push({ mealType: 'lunch', mealDate: firstDay, scannedAt: stored.lunchAt })
  }
  if (stored.dinnerAt) {
    meals.push({ mealType: 'dinner', mealDate: firstDay, scannedAt: stored.dinnerAt })
  }
  return meals
}

function toRecord(stored: StoredRegistration): ConferenceRegistrationRecord {
  return {
    ...stored,
    email: stored.email ?? '',
    residentialAddress: stored.residentialAddress ?? '',
    churchDenomination: stored.churchDenomination ?? '',
    meals: mealsFromLegacy(stored),
  }
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

function isDuplicate(
  existing: StoredRegistration,
  input: ConferenceRegistrationInput
): boolean {
  if (existing.conferenceSlug !== input.conferenceSlug) return false
  if (normalizePhone(existing.phone) === normalizePhone(input.phone)) return true
  if (input.email && existing.email && existing.email.toLowerCase() === input.email.toLowerCase()) {
    return true
  }
  return false
}

async function readStore(): Promise<StoredRegistration[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw) as StoredRegistration[]
  } catch {
    return []
  }
}

async function writeStore(records: StoredRegistration[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf8')
}

export async function saveLocalConferenceRegistration(
  input: ConferenceRegistrationInput
): Promise<{ registrationId: string }> {
  const existing = await readStore()
  const duplicate = existing.find((item) => isDuplicate(item, input))
  if (duplicate) {
    throw new Error('DUPLICATE_REGISTRATION')
  }

  const registrationId = generateRegistrationId()
  const record: StoredRegistration = {
    ...input,
    registrationId,
    checkedIn: false,
    checkedInAt: null,
    meals: [],
    createdAt: new Date().toISOString(),
  }

  await writeStore([record, ...existing])
  return { registrationId }
}

export async function listLocalRegistrations(
  conferenceSlug: string
): Promise<ConferenceRegistrationRecord[]> {
  const records = await readStore()
  return records.filter((r) => r.conferenceSlug === conferenceSlug).map(toRecord)
}

export async function getLocalRegistrationById(
  registrationId: string
): Promise<ConferenceRegistrationRecord | null> {
  const records = await readStore()
  const found = records.find((r) => r.registrationId === registrationId)
  return found ? toRecord(found) : null
}

export async function applyLocalScan(
  registrationId: string,
  action: ScanAction,
  mealDate = todayInLagos()
): Promise<ConferenceRegistrationRecord> {
  const records = await readStore()
  const index = records.findIndex((r) => r.registrationId === registrationId)
  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  const now = new Date().toISOString()
  const record = records[index]
  record.meals = mealsFromLegacy(record)

  if (action === 'check_in') {
    if (record.checkedIn) throw new Error('ALREADY_CHECKED_IN')
    record.checkedIn = true
    record.checkedInAt = now
  } else {
    const mealType = action as MealType
    if (record.meals.some((meal) => meal.mealType === mealType && meal.mealDate === mealDate)) {
      throw new Error('MEAL_ALREADY_RECORDED')
    }
    record.meals.push({ mealType, mealDate, scannedAt: now })
  }

  records[index] = record
  await writeStore(records)
  return toRecord(record)
}
