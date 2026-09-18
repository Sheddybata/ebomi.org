import { promises as fs } from 'fs'
import path from 'path'
import type { ConferenceRegistrationInput, ConferenceRegistrationRecord, ScanAction } from './types'
import { generateRegistrationId } from './registrationId'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'conference-registrations.json')

interface StoredRegistration extends ConferenceRegistrationInput {
  registrationId: string
  checkedIn: boolean
  checkedInAt: string | null
  breakfastAt: string | null
  lunchAt: string | null
  dinnerAt: string | null
  createdAt: string
}

function toRecord(stored: StoredRegistration): ConferenceRegistrationRecord {
  return { ...stored }
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
  const duplicate = existing.find(
    (item) =>
      item.conferenceSlug === input.conferenceSlug &&
      item.email.toLowerCase() === input.email.toLowerCase()
  )
  if (duplicate) {
    throw new Error('DUPLICATE_REGISTRATION')
  }

  const registrationId = generateRegistrationId()
  const record: StoredRegistration = {
    ...input,
    registrationId,
    checkedIn: false,
    checkedInAt: null,
    breakfastAt: null,
    lunchAt: null,
    dinnerAt: null,
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
  action: ScanAction
): Promise<ConferenceRegistrationRecord> {
  const records = await readStore()
  const index = records.findIndex((r) => r.registrationId === registrationId)
  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  const now = new Date().toISOString()
  const record = records[index]

  if (action === 'check_in') {
    if (record.checkedIn) throw new Error('ALREADY_CHECKED_IN')
    record.checkedIn = true
    record.checkedInAt = now
  } else if (action === 'breakfast') {
    if (record.breakfastAt) throw new Error('MEAL_ALREADY_RECORDED')
    record.breakfastAt = now
  } else if (action === 'lunch') {
    if (record.lunchAt) throw new Error('MEAL_ALREADY_RECORDED')
    record.lunchAt = now
  } else if (action === 'dinner') {
    if (record.dinnerAt) throw new Error('MEAL_ALREADY_RECORDED')
    record.dinnerAt = now
  }

  records[index] = record
  await writeStore(records)
  return toRecord(record)
}
