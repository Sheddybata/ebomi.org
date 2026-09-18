import type { ConferenceRegistrationRecord, ConferenceStats } from './types'

export function buildConferenceStats(registrations: ConferenceRegistrationRecord[]): ConferenceStats {
  const stateMap = new Map<string, number>()
  const affiliationMap = new Map<string, number>()

  let checkedIn = 0
  let needsAccommodation = 0
  let needsFeeding = 0
  let needsRideHome = 0

  for (const reg of registrations) {
    if (reg.checkedIn) checkedIn++
    if (reg.needsAccommodation) needsAccommodation++
    if (reg.needsFeeding) needsFeeding++
    if (reg.needsRideHome) needsRideHome++

    stateMap.set(reg.state, (stateMap.get(reg.state) ?? 0) + 1)
    affiliationMap.set(reg.affiliation, (affiliationMap.get(reg.affiliation) ?? 0) + 1)
  }

  const sortByCount = (entries: [string, number][]) =>
    entries
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)

  return {
    total: registrations.length,
    checkedIn,
    needsAccommodation,
    needsFeeding,
    needsRideHome,
    byState: sortByCount([...stateMap.entries()]).map(({ key, count }) => ({
      state: key,
      count,
    })),
    byAffiliation: sortByCount([...affiliationMap.entries()]).map(({ key, count }) => ({
      affiliation: key,
      count,
    })),
  }
}
