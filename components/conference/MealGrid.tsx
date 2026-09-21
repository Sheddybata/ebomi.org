import { NATIONAL_CONGRESS_2026 } from '@/lib/conference/config'
import { formatCongressDay, hasMeal, MEAL_TYPES } from '@/lib/conference/mealDates'
import type { MealScanRecord } from '@/lib/conference/types'

export default function MealGrid({ meals }: { meals: MealScanRecord[] | undefined }) {
  const days = NATIONAL_CONGRESS_2026.mealDates

  return (
    <div className="overflow-x-auto">
      <table className="text-xs border-collapse">
        <thead>
          <tr>
            <th className="py-1 pr-2 text-left font-semibold text-gray-500"> </th>
            {days.map((date) => (
              <th key={date} className="px-1.5 py-1 text-center font-semibold text-gray-500 whitespace-nowrap">
                {formatCongressDay(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MEAL_TYPES.map(({ value, short }) => (
            <tr key={value}>
              <td className="py-1 pr-2 font-semibold text-navy-dark">{short}</td>
              {days.map((date) => {
                const collected = hasMeal(meals, value, date)
                return (
                  <td key={date} className="px-1.5 py-1 text-center">
                    <span className={collected ? 'text-green-700 font-bold' : 'text-gray-300'}>
                      {collected ? '✓' : '–'}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
