import { NATIONAL_CONGRESS_2026 } from './config'
import { todayInLagos } from './mealDates'
import type { ConferenceRegistrationRecord, ConferenceStats, MealDayStats } from './types'

function emptyDayStats(date: string): MealDayStats {
  return { date, lunch: 0, dinner: 0 }
}

export function buildConferenceStats(registrations: ConferenceRegistrationRecord[]): ConferenceStats {
  const stateMap = new Map<string, number>()
  const affiliationMap = new Map<string, number>()
  const mealDays = new Map<string, MealDayStats>()

  for (const date of NATIONAL_CONGRESS_2026.mealDates) {
    mealDays.set(date, emptyDayStats(date))
  }

  let checkedIn = 0
  let needsAccommodation = 0
  let needsFeeding = 0

  for (const reg of registrations) {
    if (reg.checkedIn) checkedIn++
    if (reg.needsAccommodation) needsAccommodation++
    if (reg.needsFeeding) needsFeeding++

    stateMap.set(reg.state, (stateMap.get(reg.state) ?? 0) + 1)
    affiliationMap.set(reg.affiliation, (affiliationMap.get(reg.affiliation) ?? 0) + 1)

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
    byState: sortByCount([...stateMap.entries()]).map(({ key, count }) => ({
      state: key,
      count,
    })),
    byAffiliation: sortByCount([...affiliationMap.entries()]).map(({ key, count }) => ({
      affiliation: key,
      count,
    })),
    mealsToday: mealDays.get(today) ?? emptyDayStats(today),
    mealsByDay,
  }
}
