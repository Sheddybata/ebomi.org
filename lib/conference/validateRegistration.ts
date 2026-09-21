import {
  AFFILIATION_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  NATIONAL_CONGRESS_2026,
  OCCUPATION_OPTIONS,
} from './config'
import { combinePhoneNumber } from './dialCodes'
import type { ConferenceRegistrationInput } from './types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isYesNo(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function validateRegistrationBody(body: unknown): {
  data?: ConferenceRegistrationInput
  error?: string
} {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' }
  }

  const input = body as Record<string, unknown>
  const conferenceSlug =
    typeof input.conferenceSlug === 'string' ? input.conferenceSlug.trim() : ''
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const countryDial = typeof input.countryDial === 'string' ? input.countryDial.trim() : ''
  const nationalNumber =
    typeof input.nationalNumber === 'string' ? input.nationalNumber.trim() : ''
  const rawPhone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const phone = countryDial
    ? combinePhoneNumber(countryDial, nationalNumber)
    : rawPhone.replace(/[^\d+]/g, '')
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const state = typeof input.state === 'string' ? input.state.trim() : ''
  const residentialAddress =
    typeof input.residentialAddress === 'string' ? input.residentialAddress.trim() : ''
  const churchDenomination =
    typeof input.churchDenomination === 'string' ? input.churchDenomination.trim() : ''
  const affiliation = typeof input.affiliation === 'string' ? input.affiliation.trim() : ''
  const occupation = typeof input.occupation === 'string' ? input.occupation.trim() : ''
  const heardAbout = typeof input.heardAbout === 'string' ? input.heardAbout.trim() : ''

  if (conferenceSlug !== NATIONAL_CONGRESS_2026.slug) {
    return { error: 'Unknown conference.' }
  }
  if (!name || name.length < 2) return { error: 'Please enter your full name.' }
  if (!/^\+\d{8,15}$/.test(phone)) {
    return { error: 'Please enter a valid phone number with country code.' }
  }
  if (email && !EMAIL_PATTERN.test(email)) return { error: 'Please enter a valid email address.' }
  if (!state) return { error: 'Please enter your state or region.' }
  if (!residentialAddress || residentialAddress.length < 8) {
    return { error: 'Please enter your residential address.' }
  }
  if (!churchDenomination) {
    return { error: 'Please enter the church or denomination you attend.' }
  }
  if (!(AFFILIATION_OPTIONS as readonly string[]).includes(affiliation)) {
    return { error: 'Please select your affiliation.' }
  }
  if (!(OCCUPATION_OPTIONS as readonly string[]).includes(occupation)) {
    return { error: 'Please select your primary occupation / industry.' }
  }
  if (!(HEARD_ABOUT_OPTIONS as readonly string[]).includes(heardAbout)) {
    return { error: 'Please tell us how you heard about this summit.' }
  }
  if (!isYesNo(input.needsAccommodation)) {
    return { error: 'Please indicate if you require accommodation.' }
  }
  if (!isYesNo(input.needsFeeding)) {
    return { error: 'Please indicate if you require feeding during the conference.' }
  }

  return {
    data: {
      conferenceSlug,
      name,
      phone,
      email,
      state,
      residentialAddress,
      churchDenomination,
      affiliation: affiliation as ConferenceRegistrationInput['affiliation'],
      occupation: occupation as ConferenceRegistrationInput['occupation'],
      needsAccommodation: input.needsAccommodation,
      needsFeeding: input.needsFeeding,
      heardAbout: heardAbout as ConferenceRegistrationInput['heardAbout'],
    },
  }
}
