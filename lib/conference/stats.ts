import { NATIONAL_CONGRESS_2026 } from './config'
import { MINISTRY_CLASS_COUNT, parseMinistryClass } from './ministryClasses'
import { todayInLagos } from './mealDates'
import {
  displayState,
  GEOPOLITICAL_ZONE_ORDER,
  geopoliticalZone,
} from './normalizeState'
import type { ConferenceRegistrationRecord, ConferenceStats, MealDayStats } from './types'

function emptyDayStats(date: string): MealDayStats {
  return { date, lunch: 0, dinner: 0 }
}

export function buildConferenceStats(registrations: ConferenceRegistrationRecord[]): ConferenceStats {
  const stateMap = new Map<string, number>()
  const affiliationMap = new Map<string, number>()
  const countryMap = new Map<string, number>()
  const zoneMap = new Map<string, number>()
  const ministryClassCounts = Array.from({ length: MINISTRY_CLASS_COUNT }, () => 0)
  const mealDays = new Map<string, MealDayStats>()

  for (const date of NATIONAL_CONGRESS_2026.mealDates) {
    mealDays.set(date, emptyDayStats(date))
  }
  for (const zone of GEOPOLITICAL_ZONE_ORDER) {
    zoneMap.set(zone, 0)
  }

  let checkedIn = 0
  let needsAccommodation = 0
  let needsFeeding = 0
  let tagsPrinted = 0

  for (const reg of registrations) {
    if (reg.checkedIn) checkedIn++
    if (reg.needsAccommodation) needsAccommodation++
    if (reg.needsFeeding) needsFeeding++
    if (reg.tagPrintedAt) tagsPrinted++

    const state = displayState(reg.state)
    stateMap.set(state, (stateMap.get(state) ?? 0) + 1)
    affiliationMap.set(reg.affiliation, (affiliationMap.get(reg.affiliation) ?? 0) + 1)
    const country = (reg.country || '').trim() || '—'
    countryMap.set(country, (countryMap.get(country) ?? 0) + 1)
    const zone = geopoliticalZone(reg.state, reg.country)
    zoneMap.set(zone, (zoneMap.get(zone) ?? 0) + 1)

    const ministryClass = parseMinistryClass(reg.ministryClass)
    if (ministryClass) ministryClassCounts[ministryClass - 1] += 1

    for (const meal of reg.meals ?? []) {
      if (meal.mealType !== 'lunch' && meal.mealType !== 'dinner') continue
      const day = mealDays.get(meal.mealDate) ?? emptyDayStats(meal.mealDate)
      day[meal.mealType] += 1
      mealDays.set(meal.mealDate, day)
    }
  }

  const sortByCount = (entries: [string, number][]) =>
    entries
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)

  const today = todayInLagos()
  const mealsByDay = [...mealDays.values()].sort((a, b) => a.date.localeCompare(b.date))

  return {
    total: registrations.length,
    checkedIn,
    needsAccommodation,
    needsFeeding,
    tagsPrinted,
    byState: sortByCount([...stateMap.entries()]).map(({ key, count }) => ({
      state: key,
      count,
    })),
    byAffiliation: sortByCount([...affiliationMap.entries()]).map(({ key, count }) => ({
      affiliation: key,
      count,
    })),
    byMinistryClass: ministryClassCounts.map((count, index) => ({
      ministryClass: index + 1,
      count,
    })),
    byZone: GEOPOLITICAL_ZONE_ORDER.map((zone) => ({
      zone,
      count: zoneMap.get(zone) ?? 0,
    })),
    byCountry: sortByCount([...countryMap.entries()]).map(({ key, count }) => ({
      country: key,
      count,
    })),
    mealsToday: mealDays.get(today) ?? emptyDayStats(today),
    mealsByDay,
  }
}
