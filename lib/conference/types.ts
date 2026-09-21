import type { AFFILIATION_OPTIONS, HEARD_ABOUT_OPTIONS, OCCUPATION_OPTIONS } from './config'

export type ScanAction = 'check_in' | 'lunch' | 'dinner'
export type MealType = 'lunch' | 'dinner'

export interface ConferenceRegistrationInput {
  conferenceSlug: string
  name: string
  phone: string
  email: string
  state: string
  residentialAddress: string
  churchDenomination: string
  affiliation: (typeof AFFILIATION_OPTIONS)[number]
  occupation: (typeof OCCUPATION_OPTIONS)[number]
  needsAccommodation: boolean
  needsFeeding: boolean
  heardAbout: (typeof HEARD_ABOUT_OPTIONS)[number]
}

export interface MealScanRecord {
  mealType: MealType
  mealDate: string
  scannedAt: string
}

export interface ConferenceRegistrationRecord extends ConferenceRegistrationInput {
  registrationId: string
  checkedIn: boolean
  checkedInAt: string | null
  meals: MealScanRecord[]
  createdAt: string
}

export interface MealDayStats {
  date: string
  lunch: number
  dinner: number
}

export interface ConferenceStats {
  total: number
  checkedIn: number
  needsAccommodation: number
  needsFeeding: number
  byState: { state: string; count: number }[]
  byAffiliation: { affiliation: string; count: number }[]
  mealsToday: MealDayStats
  mealsByDay: MealDayStats[]
}

export interface ScanResult {
  registration: ConferenceRegistrationRecord
  action: ScanAction
  message: string
}
