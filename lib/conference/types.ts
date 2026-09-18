import type { AFFILIATION_OPTIONS, HEARD_ABOUT_OPTIONS, OCCUPATION_OPTIONS } from './config'

export type ScanAction = 'check_in' | 'breakfast' | 'lunch' | 'dinner'

export interface ConferenceRegistrationInput {
  conferenceSlug: string
  name: string
  phone: string
  email: string
  state: string
  affiliation: (typeof AFFILIATION_OPTIONS)[number]
  occupation: (typeof OCCUPATION_OPTIONS)[number]
  needsAccommodation: boolean
  needsFeeding: boolean
  needsRideHome: boolean
  heardAbout: (typeof HEARD_ABOUT_OPTIONS)[number]
}

export interface ConferenceRegistrationRecord extends ConferenceRegistrationInput {
  registrationId: string
  checkedIn: boolean
  checkedInAt: string | null
  breakfastAt: string | null
  lunchAt: string | null
  dinnerAt: string | null
  createdAt: string
}

export interface ConferenceStats {
  total: number
  checkedIn: number
  needsAccommodation: number
  needsFeeding: number
  needsRideHome: number
  byState: { state: string; count: number }[]
  byAffiliation: { affiliation: string; count: number }[]
}

export interface ScanResult {
  registration: ConferenceRegistrationRecord
  action: ScanAction
  message: string
}
