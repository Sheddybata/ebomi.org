import { NATIONAL_CONGRESS_2026 } from './config'
import type { MealScanRecord, MealType } from './types'

export const MEAL_TYPES: { value: MealType; label: string; short: string }[] = [
  { value: 'lunch', label: 'Lunch', short: 'L' },
  { value: 'dinner', label: 'Dinner', short: 'D' },
]

export function todayInLagos(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function isValidMealDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function formatCongressDay(date: string): string {
  const parsed = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function scanDateOptions(): string[] {
  const today = todayInLagos()
  const congressDates: string[] = [...NATIONAL_CONGRESS_2026.mealDates]
  if (congressDates.includes(today)) return congressDates
  return [today, ...congressDates]
}

export function hasMeal(meals: MealScanRecord[] | undefined, type: MealType, date: string): boolean {
  return (meals ?? []).some((meal) => meal.mealType === type && meal.mealDate === date)
}
