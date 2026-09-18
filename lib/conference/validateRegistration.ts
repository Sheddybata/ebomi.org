import {
  AFFILIATION_OPTIONS,
  HEARD_ABOUT_OPTIONS,
  NATIONAL_CONGRESS_2026,
  OCCUPATION_OPTIONS,
} from './config'
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
  const phone = typeof input.phone === 'string' ? input.phone.trim() : ''
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const state = typeof input.state === 'string' ? input.state.trim() : ''
  const affiliation = typeof input.affiliation === 'string' ? input.affiliation.trim() : ''
  const occupation = typeof input.occupation === 'string' ? input.occupation.trim() : ''
  const heardAbout = typeof input.heardAbout === 'string' ? input.heardAbout.trim() : ''

  if (conferenceSlug !== NATIONAL_CONGRESS_2026.slug) {
    return { error: 'Unknown conference.' }
  }
  if (!name || name.length < 2) return { error: 'Please enter your full name.' }
  if (!phone || phone.length < 7) return { error: 'Please enter a valid phone number.' }
  if (!email || !EMAIL_PATTERN.test(email)) return { error: 'Please enter a valid email address.' }
  if (!state) return { error: 'Please enter your state.' }
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
  if (!isYesNo(input.needsRideHome)) {
    return { error: 'Please indicate if you need a ride back home during the summit.' }
  }

  return {
    data: {
      conferenceSlug,
      name,
      phone,
      email,
      state,
      affiliation: affiliation as ConferenceRegistrationInput['affiliation'],
      occupation: occupation as ConferenceRegistrationInput['occupation'],
      needsAccommodation: input.needsAccommodation,
      needsFeeding: input.needsFeeding,
      needsRideHome: input.needsRideHome,
      heardAbout: heardAbout as ConferenceRegistrationInput['heardAbout'],
    },
  }
}
